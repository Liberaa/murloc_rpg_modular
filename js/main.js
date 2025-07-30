/* main.js – exploration, battles, talents + NEW shop NPC */
import { scenes }         from './data/scenes.js';
import { Player }         from './core/player.js';
import { Enemy }          from './core/enemy.js';
import { NPC }            from './core/npc.js';             // ← NEW
import { Backpack }       from './core/backpack.js';
import { InventoryUI }    from './core/inventory.js';
import { setupMovement }  from './mechanics/movement.js';
import { checkCollision } from './mechanics/encounter.js';
import { Battle }         from './mechanics/battlescenes.js';
import { push, last }     from './mechanics/logs.js';
import { talentList }     from './mechanics/talent.js';
import { shopStock }      from './mechanics/shop.js';       // ← NEW

/* ---------- canvas ---------- */
const canvas = document.getElementById('gameCanvas');
const ctx    = canvas.getContext('2d');

/* ---------- sprite cache ---------- */
const SPRITES = [
  'murloc.png','crab.png','goblin.png','orc.png',
  'item.png','arena.png',
  'shopkeeper.png'                                           // ← NEW
];
const sprite = {};
Promise.all(SPRITES.map(n => new Promise(res => {
  const img = new Image();
  img.onload = () => res(sprite[n] = img);
  img.src = 'assets/' + n;
}))).then(startGame);

/* ---------- globals ---------- */
let player, inventoryUI;
let enemies = [];
let npcs    = [];                                           // ← NEW
let sceneIndex = 0;
let mode = 'explore';               // 'explore' | 'battle'
let battle = null;
let shopMessage = '';          // feedback text for the shop
let showTalents = false;
let showShop    = false;            // ← NEW

/* ---------- HUD ---------- */
function drawProfile () {
  ctx.fillStyle = 'rgba(0,0,0,0.6)';
  ctx.fillRect(8, 8, 170, 70);

  ctx.fillStyle = '#fff';
  ctx.font = '14px sans-serif';
  ctx.fillText(`Lvl:  ${player.xp.level}`,           16, 26);
  ctx.fillText(`HP :  ${player.hp}/${player.maxHp}`, 16, 45);
  ctx.fillText(`Gold: ${player.gold}`,               16, 64);  // ← NEW
}

/* ---------- talent overlay (unchanged) ---------- */
/* --------------------------------------------------
   drawTalents – multi-rank talent tree
   --------------------------------------------------*/
function drawTalents () {
  /* dark overlay */
  ctx.fillStyle = 'rgba(0,0,0,0.85)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  /* header */
  ctx.fillStyle = '#fff';
  ctx.textAlign = 'center';
  ctx.font = '24px sans-serif';
  ctx.fillText('Talent Tree', canvas.width / 2, 70);
  ctx.font = '16px sans-serif';
  ctx.fillText(`Points: ${player.talentPoints}`, canvas.width / 2, 96);

  /* three-column grid */
  const cols   = 3;
  const colW   = 220;
  const firstX = canvas.width / 2 - colW;   // left column x-pos
  const startY = 120;
  const rowH   = 24;

  ctx.textAlign = 'start';
  ctx.font = '15px sans-serif';

  talentList.forEach((t, i) => {
    const col  = i % cols;
    const row  = Math.floor(i / cols);
    const x    = firstX + col * colW;
    const y    = startY + row * rowH;

    const rank = player.talentsTaken.get(t.id) || 0;
    const full = rank >= t.maxRank;

    ctx.fillStyle = full ? '#777'
                 : rank > 0 ? '#4caf50'
                            : '#fff';
    ctx.fillText(`${t.name}  ${rank}/${t.maxRank}`, x, y);
  });

  /* footer hint */
  ctx.textAlign = 'center';
  ctx.font = '14px sans-serif';
  ctx.fillStyle = '#aaa';
  ctx.fillText('Click a talent to buy – press T to close',
               canvas.width / 2, canvas.height - 32);

  ctx.textAlign = 'start';
}

/* ---------- shop overlay ---------- */
function drawShop () {
  ctx.fillStyle = 'rgba(0,0,0,0.85)';
  ctx.fillRect(0,0,canvas.width,canvas.height);

  ctx.fillStyle = '#fff';
  ctx.textAlign = 'center';
  ctx.font = '24px sans-serif';
  ctx.fillText('Shop', canvas.width/2, 70);
  ctx.font = '16px sans-serif';
  ctx.fillText(`Gold: ${player.gold}`, canvas.width/2, 96);

  ctx.textAlign = 'start';
  ctx.font = '15px sans-serif';
  shopStock.forEach((it,i)=>{
    const y = 120 + i*26;
    ctx.fillStyle = player.gold>=it.price ? '#fff' : '#777';
    ctx.fillText(`${it.name} (${it.price}g)`, canvas.width/2-110, y);
  });

  ctx.textAlign='center';
  ctx.font='14px sans-serif';
  ctx.fillStyle='#aaa';
  ctx.fillText('Click to buy – press E to close',
               canvas.width/2, canvas.height-32);
  ctx.textAlign='start';
}

/* ---------- bootstrap ---------- */
function startGame () {
  player = new Player(50, canvas.height - 32, ctx, sprite['murloc.png']);
  inventoryUI = new InventoryUI(new Backpack(5));
  inventoryUI.render();

  loadScene(0);
  setupMovement(player, canvas);

  document.addEventListener('keydown', onKey);
  canvas.addEventListener('click',  onClick);

  requestAnimationFrame(loop);
}

/* ---------- scene loader ---------- */
function loadScene (idx) {
  sceneIndex = idx;

  enemies = scenes[idx].enemies.map(def =>
    new Enemy(def, canvas.height - 32, ctx, sprite[def.sprite])
  );

  npcs = (scenes[idx].npcs || []).map(def =>                   // ← NEW
    new NPC(def, canvas.height - 32, ctx, sprite[def.sprite])
  );
}

/* ---------- key handling ---------- */
function onKey (e) {
  if (e.key === 't' && mode === 'explore') { showTalents = !showTalents; return; }

  if (e.key === 'e' && mode === 'explore') {          // shop toggle
    const near = npcs.find(n => n.type === 'shop' && Math.abs(player.x - n.x) < 24);
    if (near) { showShop = !showShop; shopMessage = ''; }
    return;
  }

  if (showTalents || showShop) return;                // block movement in menus

  /* movement */
  if (mode === 'explore') {
    const speed = 5;
    if (e.key === 'ArrowLeft' || e.key === 'a') player.move(-speed);
    if (e.key === 'ArrowRight' || e.key === 'd') player.move(+speed);
    adjustAtEdges();                                  // check scene border
  }

  if (mode === 'battle' && e.key === 'Escape') mode = 'explore';
}




/* ---------- click handling ---------- */
/* --------------------------------------------------
   onClick – shop, talents, and battle menu
   --------------------------------------------------*/
function onClick (evt) {
  const rect = canvas.getBoundingClientRect();
  const x = evt.clientX - rect.left;
  const y = evt.clientY - rect.top;

  /* ---------- 1. Shop overlay clicks ---------- */
  if (showShop) {
    const startY = 120;      // first item row
    const rowH   = 26;       // height of each row
    const idx    = Math.floor((y - startY) / rowH);

    if (idx >= 0 && idx < shopStock.length) {
      const item = shopStock[idx];

      if (player.gold >= item.price) {
        player.gold -= item.price;      // pay gold
        item.buy(player);               // apply the buff
        shopMessage = `Bought ${item.name}!`;
      } else {
        shopMessage = 'Not enough gold!';
      }
    }
    return;                             // don’t fall through
  }

  /* ---------- 2. Talent overlay clicks ---------- */
  if (showTalents) {
    const cols   = 3;
    const colW   = 220;
    const firstX = canvas.width / 2 - colW;  // x of left column
    const startY = 120;
    const rowH   = 24;

    const col = Math.floor((x - firstX) / colW);
    if (col < 0 || col >= cols) return;

    const row = Math.floor((y - startY) / rowH);
    if (row < 0) return;

    const idx = row * cols + col;
    if (idx >= talentList.length) return;

    player.takeTalent(talentList[idx].id);   // will fail silently if no points
    return;
  }

  /* ---------- 3. Battle menu clicks ---------- */
  if (mode !== 'battle') return;

  const boxX = 20,
        boxY = canvas.height - 140,
        boxW = 120,
        rowH = 22;

  if (x < boxX || x > boxX + boxW) return;
  if (y < boxY || y > boxY + rowH * battle.menu.length) return;

  const idx = Math.floor((y - boxY) / rowH);
  battle.act(battle.menu[idx]);

  if (battle.finished) mode = 'explore';
}



/* ---------- explore helpers ---------- */
function adjustAtEdges () {
  /* walked off the right edge → next scene */
  if (player.x > canvas.width - player.width) {
    if (sceneIndex < scenes.length - 1) {
      loadScene(sceneIndex + 1);   // advance east
      player.x = 0;                // start at left edge
    } else {
      player.x = canvas.width - player.width;   // stay in bounds
    }
  }

  /* walked off the left edge → previous scene */
  if (player.x < 0) {
    if (sceneIndex > 0) {
      loadScene(sceneIndex - 1);   // go west
      player.x = canvas.width - player.width;   // start at right edge
    } else {
      player.x = 0;                // already in first scene
    }
  }
}

/* ---------- drawing ---------- */
function drawExplore () {
  const scn = scenes[sceneIndex];
  ctx.fillStyle = scn.bg;
  ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle = '#654321';
  ctx.fillRect(0,canvas.height-4,canvas.width,4);

  enemies.forEach(e=>e.draw());
  npcs.forEach(n=>n.draw());
  drawProfile();
  player.draw();

  /* ---------- NEW: edge check every frame ---------- */
  adjustAtEdges();          // ← add this line

  /* shop prompt */
  const shop = npcs.find(n=>n.type==='shop' && Math.abs(player.x-n.x)<24);
  if (shop) {
    ctx.fillStyle='#fff'; ctx.font='14px sans-serif';
    ctx.fillText('Press E to trade', shop.x-30, player.groundY-40);
  }

  /* enemy collision */
  const hit = checkCollision(player,enemies);
  if (hit) { battle=new Battle(player,hit); push('A wild enemy appears!'); mode='battle'; }
}


/* ---------- battle drawing + updateXPBar + loop ---------- */
/* (keep your existing versions – no changes needed) */


/* --------------------------------------------------
   drawBattle : big, readable, colour‑coded status
   --------------------------------------------------*/
/* --------------------------------------------------
   drawBattle – clear HP bars & clickable menu
   --------------------------------------------------*/
/* --------------------------------------------------
   drawBattle – clear HUD, HP bars, clickable menu,
   big result banner, and profile box on top‑left
   --------------------------------------------------*/
function drawBattle () {
  /* 1. Arena background */
  ctx.drawImage(sprite['arena.png'], 0, 0, canvas.width, canvas.height);

  /* 2. Fighters */
  ctx.save();
  ctx.scale(-1, 1);                                   // enemy faces player
  ctx.drawImage(
    battle.enemy.img,
    -canvas.width + 360,
    canvas.height - 80
  );
  ctx.restore();
  ctx.drawImage(player.img, 70, canvas.height - 80);

  /* 3. Your profile box (top‑left) */
  ctx.fillStyle = 'rgba(0,0,0,0.6)';
  ctx.fillRect(8, 8, 160, 54);
  ctx.fillStyle = '#fff';
  ctx.font = '14px sans-serif';
  ctx.fillText(`Lvl: ${player.xp.level}`,  16, 26);
  ctx.fillText(`HP : ${player.hp}/${player.maxHp}`, 16, 45);

  /* 4. HP bars (You on LEFT, Enemy on RIGHT) */
  const bar = (x, y, val, max, label, colour) => {
    ctx.fillStyle = 'black';  ctx.fillRect(x, y, 120, 14);
    ctx.fillStyle = colour;   ctx.fillRect(x, y, 120 * val / max, 14);
    ctx.fillStyle = '#fff';   ctx.font = '12px sans-serif';
    ctx.fillText(`${label}: ${val}/${max}`, x, y - 2);
  };
  bar(50,                    40, player.hp,       player.maxHp,       'You',   '#4caf50');
  bar(canvas.width - 170,    40, battle.enemy.hp, battle.enemy.maxHp, 'Enemy', '#f44336');

  /* 5. Menu (clickable) */
  const menuX = 20, menuY = canvas.height - 140;
  ctx.fillStyle = 'rgba(0,0,0,0.7)';
  ctx.fillRect(menuX, menuY, 120, 22 * battle.menu.length);
  ctx.font = '15px sans-serif';
  battle.menu.forEach((m, i) => {
    ctx.fillStyle = '#fff';
    ctx.fillText(m, menuX + 8, menuY + 17 + i * 22);
  });

  /* 6. Latest combat log */
  ctx.fillStyle = '#fffa';
  ctx.font = '16px sans-serif';
  ctx.fillText(last(), 170, canvas.height - 20);

  /* 7. End‑of‑battle banner */
  if (battle.finished) {
    ctx.fillStyle = 'rgba(0,0,0,0.65)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const msg =
      battle.result === 'won'  ? 'VICTORY!' :
      battle.result === 'lost' ? 'DEFEAT!'  : 'FLED!';
    ctx.fillStyle =
      battle.result === 'won'  ? '#4caf50' :
      battle.result === 'lost' ? '#f44336' : '#ff9800';
    ctx.font = '48px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(msg, canvas.width / 2, canvas.height / 2);
    ctx.font = '20px sans-serif';
    ctx.fillText(
      'Press ESC or click to continue',
      canvas.width / 2,
      canvas.height / 2 + 40
    );
    ctx.textAlign = 'start';
  }
}

/* ---------- XP bar ---------- */
function updateXPBar () {
  document.getElementById('xp-bar').style.width =
    player.xp.percent() + '%';
}


/* --------------------------------------------------
   loop – master frame handler
   --------------------------------------------------*/
let lastTime = performance.now();

function loop () {
  const now = performance.now();
  const dt  = (now - lastTime) / 1000;
  lastTime  = now;

  /* passive healing */
  if (mode === 'explore') player.regen(dt);

  /* ★ check for edge crossing each frame */
  if (mode === 'explore' && !showTalents && !showShop) {
    adjustAtEdges();
  }

  /* draw correct screen */
  if (showTalents) {
    drawTalents();
  } else if (showShop) {
    drawShop();
  } else if (mode === 'explore') {
    drawExplore();
  } else {
    drawBattle();
  }

  updateXPBar();
  requestAnimationFrame(loop);
}



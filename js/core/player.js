/* core/player.js
   --------------------------------------------------
   Player object with XP, multi‑rank talents, passive
   regeneration, and scalable move speed.
   --------------------------------------------------*/

import { XPManager }  from '../mechanics/xp.js';
import { getTalent }  from '../mechanics/talent.js';

export class Player {
  constructor (x, groundY, ctx, img) {
    Object.assign(this, { x, groundY, ctx, img });
    this.width  = 32;
    this.height = 32;

    /* ---------- base stats ---------- */
    this.maxHp      = 105;
    this.hp         = this.maxHp;
    this.attack     = 10;
    this.gold = 10;
    this.regenRate  = 5;    // %‑based regen (HP / sec)
    this.regenFlat  = 0;    // flat HP / sec from talents
    this.moveSpeed  = 5;    // px / keypress
    this.critChance = 0;    // future
    this.armor      = 0;
    /* any additional fields talents may mutate */

    /* ---------- progression ---------- */
    this.xp           = new XPManager();
    this.talentPoints = 0;
    this.talentsTaken = new Map();   // id → rank
    this.equipment = {}; // slot → item
    this.gearBonus = {};

  }

  /* ---------- leveling ---------- */
  levelUp () {
    this.maxHp      += 10;
    this.attack     += 2;
    this.hp          = this.maxHp;    // full heal
    this.talentPoints += 1;           // gain 1 point
  }

  /* ---------- regeneration (called each frame) ---------- */
  regen (dt) {
    if (this.hp >= this.maxHp) return;
    const total = this.regenRate + this.regenFlat;   // HP per sec
    this.hp = Math.min(this.maxHp, this.hp + total * dt);
  }

  /* ---------- spend point & apply talent ---------- */
  takeTalent (id) {
    const talent = getTalent(id);
    if (!talent) return false;

    const currentRank = this.talentsTaken.get(id) || 0;
    if (currentRank >= talent.maxRank) return false;
    if (this.talentPoints < (talent.cost || 1)) return false;

    // spend point(s)
    this.talentPoints -= (talent.cost || 1);

    // apply effect
    talent.apply(this);

    // store new rank
    this.talentsTaken.set(id, currentRank + 1);
    return true;
  }

equip(item) {
  this.equipped = this.equipped || {};
  this.equipped[item.slot] = item;
}


recalculateGearBonus() {
  const all = Object.values(this.equipment);
  const bonus = { attack: 0, maxHp: 0, regenFlat: 0, moveSpeed: 0 };
  all.forEach(item => {
    for (const key in item.bonus) bonus[key] += item.bonus[key];
  });

  this.attack = 100 + (bonus.attack || 0);
  this.maxHp = 100 + (bonus.maxHp || 0);
  this.regenFlat = bonus.regenFlat || 0;
  this.moveSpeed = 5 + (bonus.moveSpeed || 0);
  this.gearBonus = bonus;
}


    /* ---------- earn gold ---------- */
  gainGold (amount) {
    this.gold += amount;
  }

  /* ---------- render & movement ---------- */
  draw () {
    this.ctx.drawImage(this.img, this.x, this.groundY - this.height);
  }

  move (dx) {
    this.x += dx * (this.moveSpeed / 5);   // scale if speed talent taken
  }
}

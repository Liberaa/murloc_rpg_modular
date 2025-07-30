/* data/scenes.js
   --------------------------------------------------
   10 zones that get darker and harder as you travel
   east. Enemy stats scale roughly x1.35 per zone.
   --------------------------------------------------*/

export const scenes = [
  /* 0 – Beginner Meadow -------------------------------- */
{
  bg: '#6bbf59',                    // bright green
  enemies: [
    { x: 200, level: 1, hp: 40, atk: 6, xp: 25, sprite: 'crab.png' }
  ],
  npcs: [
    { x: 380, type: 'shop', sprite: 'shopkeeper.png' }   // friendly NPC
  ]
},


  /* 1 – Whispering Woods ------------------------------- */
  {
    bg: '#4e944f',
    enemies: [
      { x: 150, level: 2, hp:  55, atk:  8, xp:  35, sprite: 'crab.png' },
      { x: 330, level: 3, hp:  70, atk: 10, xp:  45, sprite: 'goblin.png' }
    ]
  },

  /* 2 – Murky Swamp ------------------------------------ */
  {
    bg: '#3d6f46',
    enemies: [
      { x: 120, level: 4, hp:  95, atk: 12, xp:  60, sprite: 'goblin.png' },
      { x: 370, level: 5, hp: 110, atk: 14, xp:  75, sprite: 'goblin.png' }
    ]
  },

  /* 3 – Broken Bridge ---------------------------------- */
  {
    bg: '#5c4c3b',
    enemies: [
      { x: 260, level: 6, hp: 135, atk: 17, xp:  95, sprite: 'orc.png' }
    ]
  },

  /* 4 – Ember Canyon ----------------------------------- */
  {
    bg: '#84441c',
    enemies: [
      { x: 140, level: 7, hp: 165, atk: 20, xp: 120, sprite: 'orc.png' },
      { x: 380, level: 8, hp: 190, atk: 22, xp: 140, sprite: 'orc.png' }
    ]
  },

  /* 5 – Sandy Expanse ---------------------------------- */
  {
    bg: '#c2a15c',
    enemies: [
      { x: 100, level: 9,  hp: 230, atk: 25, xp: 170, sprite: 'orc.png' },
      { x: 300, level: 10, hp: 260, atk: 28, xp: 195, sprite: 'orc.png' }
    ]
  },

  /* 6 – Frosted Tundra --------------------------------- */
  {
    bg: '#628ba3',
    enemies: [
      { x: 200, level: 11, hp: 300, atk: 32, xp: 230, sprite: 'orc.png' }
    ]
  },

  /* 7 – Crystal Caverns -------------------------------- */
  {
    bg: '#3d4b79',
    enemies: [
      { x: 150, level: 12, hp: 350, atk: 36, xp: 275, sprite: 'orc.png' },
      { x: 360, level: 13, hp: 390, atk: 40, xp: 310, sprite: 'orc.png' }
    ]
  },

  /* 8 – Void Pass -------------------------------------- */
  {
    bg: '#26224c',
    enemies: [
      { x: 240, level: 14, hp: 450, atk: 45, xp: 360, sprite: 'orc.png' }
    ]
  },

  /* 9 – Demon Citadel (final for now) ------------------ */
  {
    bg: '#1b1020',
    enemies: [
      { x: 180, level: 15, hp: 520, atk: 52, xp: 420, sprite: 'orc.png' },
      { x: 380, level: 16, hp: 600, atk: 60, xp: 480, sprite: 'orc.png' }
    ]
  }

  // ADD NEW !
  /* 10 – Ashen Delta ---------------------------------- */
  ,{
    bg: '#4a3940',
    enemies: [
      { x: 140, level: 17, hp: 780, atk: 75, xp: 620, sprite: 'orc.png' },
      { x: 340, level: 18, hp: 850, atk: 82, xp: 675, sprite: 'orc.png' }
    ],
    npcs: []                       // no shop here
  },

  /* 11 – Obsidian Gate -------------------------------- */
  {
    bg: '#332932',
    enemies: [
      { x: 200, level: 19, hp: 930, atk: 90, xp: 750, sprite: 'orc.png' }
    ],
    npcs: [
      { x: 380, type: 'shop', sprite: 'shopkeeper.png' }   // mid-tier shop
    ]
  },

  /* 12 – Infernal Core -------------------------------- */
  {
    bg: '#26171e',
    enemies: [
      { x: 110, level: 20, hp: 1020, atk: 98, xp: 830, sprite: 'orc.png' },
      { x: 360, level: 21, hp: 1100, atk:105, xp: 900, sprite: 'orc.png' }
    ]
  },

  /* 13 – Nether Rift ---------------------------------- */
  {
    bg: '#1b1426',
    enemies: [
      { x: 240, level: 22, hp: 1200, atk:115, xp: 990, sprite: 'orc.png' }
    ],
    npcs: [
      { x: 60, type: 'shop', sprite: 'shopkeeper.png' }    // high-tier shop
    ]
  },

  /* 14 – Eternal Throne (final) ----------------------- */
  {
    bg: '#0f0a13',
    enemies: [
      { x: 210, level: 23, hp: 13500, atk:130, xp:1120, sprite: 'orc.png' },
      { x: 380, level: 60, hp: 15000, atk:445, xp:12000050, sprite: 'orc.png' }
    ],
    npcs: []                       // no escape—no shop
  }



];

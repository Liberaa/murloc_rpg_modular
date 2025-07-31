export class Item {
  constructor(id, name, slot, bonus) {
    this.id = id;
    this.name = name;
    this.slot = slot; // 'weapon', 'shield', 'head', etc.
    this.bonus = bonus; // e.g. { attack: +5 }
  }
}

export const itemList = [
  new Item('dagger', 'Rusty Dagger', 'weapon', { attack: 3 }),
  new Item('sword1', 'Iron Sword', 'weapon', { attack: 6 }),
  new Item('sword2', 'Knight Sword', 'weapon', { attack: 10 }),
  new Item('axe', 'Heavy Axe', 'weapon', { attack: 14 }),
  new Item('shield1', 'Wooden Shield', 'shield', { maxHp: 20 }),
  new Item('shield2', 'Iron Shield', 'shield', { maxHp: 40 }),
  new Item('helmet1', 'Leather Cap', 'head', { maxHp: 10 }),
  new Item('helmet2', 'Steel Helm', 'head', { maxHp: 25 }),
  new Item('armor1', 'Cloth Armor', 'body', { maxHp: 15 }),
  new Item('armor2', 'Chainmail', 'body', { maxHp: 30 }),
  new Item('boots1', 'Soft Boots', 'feet', { moveSpeed: 1 }),
  new Item('boots2', 'War Boots', 'feet', { moveSpeed: 2 }),
  new Item('gloves1', 'Grip Gloves', 'hands', { attack: 2 }),
  new Item('ring1', 'Gold Ring', 'ring', { lifesteal: 0.01 }),
  new Item('ring2', 'Ruby Ring', 'ring', { attack: 2 }),
  new Item('cloak', 'Dark Cloak', 'back', { regenFlat: 2 }),
  new Item('amulet', 'Amulet of Health', 'neck', { maxHp: 50 }),
  new Item('potion1', 'HP Potion', 'consumable', { heal: 50 }),
  new Item('potion2', 'Regen Potion', 'consumable', { regenFlat: 10 }),
  new Item('potion3', 'Speed Potion', 'consumable', { moveSpeed: 3 }),
];


// Add to itemList
itemList.push(
  new Item('bow1',     'Short Bow',          'weapon',     { attack: 5 }),
  new Item('bow2',     'Elven Longbow',      'weapon',     { attack: 9 }),
  new Item('wand1',    'Wand of Sparks',     'weapon',     { attack: 4, regenFlat: 2 }),
  new Item('wand2',    'Arcane Staff',       'weapon',     { attack: 7, lifesteal: 0.02 }),
  new Item('shield3',  'Tower Shield',       'shield',     { maxHp: 60, regenFlat: 1 }),
  new Item('helmet3',  'Horned Helm',        'head',       { maxHp: 30, attack: 1 }),
  new Item('armor3',   'Dragon Armor',       'body',       { maxHp: 60, lifesteal: 0.03 }),
  new Item('boots3',   'Swift Shoes',        'feet',       { moveSpeed: 3 }),
  new Item('gloves2',  'Claw Gloves',        'hands',      { attack: 4 }),
  new Item('ring3',    'Emerald Ring',       'ring',       { regenFlat: 2 }),
  new Item('ring4',    'Obsidian Ring',      'ring',       { lifesteal: 0.04 }),
  new Item('cloak2',   'Invisibility Cloak', 'back',       { moveSpeed: 2, attack: 1 }),
  new Item('amulet2',  'Amulet of Power',    'neck',       { attack: 5 }),
  new Item('scroll1',  'Scroll of Fire',     'consumable', { attack: 20 }),
  new Item('scroll2',  'Scroll of Healing',  'consumable', { heal: 80 }),
  new Item('scroll3',  'Scroll of Haste',    'consumable', { moveSpeed: 5 }),
  new Item('belt1',    'Sturdy Belt',        'waist',      { maxHp: 20 }),
  new Item('belt2',    'Berserker Belt',     'waist',      { attack: 3 }),
  new Item('charm1',   'Tiny Charm',         'trinket',    { regenFlat: 1 }),
  new Item('charm2',   'Blood Charm',        'trinket',    { lifesteal: 0.05 })
);

itemList.forEach(item => {
  const img = new Image();
  
  img.src = 'assets/item.png';  // or custom if needed
  item.img = img;
});

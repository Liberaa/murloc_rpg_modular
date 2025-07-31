import { itemList } from '/js/data/items.js';

export const gearStock = itemList.filter(item =>
  ['weapon','head','body','feet','hands','shield','ring','back','neck','waist','trinket'].includes(item.slot)
).slice(0, 12); // Limit to 12 items

export const shopStock = [
  { id:'p_hp',  name:'+40 Max HP',  price:  50, buy:p=>{ p.maxHp+=40; p.hp+=40; } },
  { id:'p_atk', name:'+5 Attack',   price:  50, buy:p=>{ p.attack+=5; } },
  { id:'p_reg', name:'+5 Regen/s',  price:  40, buy:p=>{ p.regenFlat+=5; } },
  { id:'p_spd', name:'+2 Move Spd', price:  30, buy:p=>{ p.moveSpeed+=2; } },
  { id:'p_lif', name:'+2% Lifesteal',price:60,buy:p=>{ p.lifesteal=(p.lifesteal||0)+0.02; } }
];

/* mechanics/talent.js – 15 talents, Speed maxRank 20 */
export const talentList = [
  { id:'hp',    name:'+20 Max HP',        maxRank:5,
    apply:p=>{ p.maxHp+=20; p.hp+=20; } },

  { id:'atk',   name:'+3 Attack',         maxRank:5,
    apply:p=>{ p.attack+=3; } },

  { id:'regen', name:'+50% Regen',        maxRank:3,
    apply:p=>{ p.regenRate*=1.5; } },

  { id:'speed', name:'+1 Move Speed',     maxRank:20,   // ← 0 / 20
    apply:p=>{ p.moveSpeed+=1; } },

  { id:'crit',  name:'+2% Crit Chance',   maxRank:4,
    apply:p=>{ p.critChance=(p.critChance||0)+0.02; } },

  { id:'def',   name:'+5 Armor',          maxRank:3,
    apply:p=>{ p.armor=(p.armor||0)+5; } },

  { id:'lifesteal', name:'1% Lifesteal',  maxRank:5,
    apply:p=>{ p.lifesteal=(p.lifesteal||0)+0.01; } },

  { id:'fire',  name:'+1 Fire Damage',    maxRank:5,
    apply:p=>{ p.fireDmg=(p.fireDmg||0)+1; } },

  { id:'ice',   name:'+1 Ice Damage',     maxRank:5,
    apply:p=>{ p.iceDmg=(p.iceDmg||0)+1; } },

  { id:'shield',name:'5% Dmg Reduce',     maxRank:4,
    apply:p=>{ p.dmgReduce=(p.dmgReduce||0)+0.05; } },

  { id:'block', name:'+2% Block',         maxRank:4,
    apply:p=>{ p.blockChance=(p.blockChance||0)+0.02; } },

  { id:'heal',  name:'+3 Flat Regen',     maxRank:4,
    apply:p=>{ p.regenFlat=(p.regenFlat||0)+3; } },

  { id:'gold',  name:'+5% Gold Gain',     maxRank:4,
    apply:p=>{ p.goldMod=(p.goldMod||0)+0.05; } },

  { id:'xp',    name:'+5% XP Gain',       maxRank:4,
    apply:p=>{ p.xpMod=(p.xpMod||0)+0.05; } },

  { id:'luck',  name:'+1 Luck',           maxRank:5,
    apply:p=>{ p.luck=(p.luck||0)+1; } }
];

export function getTalent(id){ return talentList.find(t=>t.id===id); }

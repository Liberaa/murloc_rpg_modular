/* mechanics/battlescenes.js
   -------------------------------------------------------
   Turn-based battle:
   • XP gain & level-ups (+HP, +ATK, +Talent Point)
   • Gold gain (≈ XP ÷ 5)
   • Two menu options: Attack / Flee
   -----------------------------------------------------*/

import { push } from './logs.js';

export class Battle {
  constructor (player, enemy) {
    this.player   = player;
    this.enemy    = enemy;
    this.menu     = ['Attack', 'Flee'];
    this.finished = false;            // battle over?
    this.result   = null;             // 'won' | 'lost' | 'fled'
  }

  /* --------------------------------------------------
     Player action: choice = 'Attack' | 'Flee'
     --------------------------------------------------*/
  act (choice) {
    if (this.finished) return;

    /* ---------- Flee ---------- */
    if (choice === 'Flee') {
      push('You fled the battle.');
      this.finished = true;
      this.result   = 'fled';
      return;
    }

    /* ---------- Attack phase ---------- */
    this.enemy.hp -= this.player.attack;
    push(`You dealt ${this.player.attack} dmg!`);

    /* ---------- Enemy defeated? ---------- */
    if (this.enemy.hp <= 0) {
      this.enemy.alive = false;

      /* XP + potential level-up */
      const gainedXP  = this.enemy.xpReward;
      const leveled   = this.player.xp.gain(gainedXP);
      const needMore  = this.player.xp.xpNeeded() - this.player.xp.xp;

      push(`Victory! +${gainedXP} XP (need ${needMore} more)`);

      if (leveled) {
        this.player.levelUp();      // +10 HP, +2 ATK, +1 talent pt
        push(`Level up! You are now Lvl ${this.player.xp.level}`);
      }

      /* --- GOLD DROP -------------------------------- */
      const goldGet = Math.round(gainedXP / 5);    // 1 gold ≈ 5 XP
      this.player.gainGold(goldGet);
      push(`Loot: +${goldGet} gold`);

      this.result   = 'won';
      this.finished = true;
      return;
    }

    /* ---------- Enemy counter-attack ---------- */
    this.player.hp -= this.enemy.attack;
    push(`Enemy hit ${this.enemy.attack} dmg!`);

    if (this.player.hp <= 0) {
      this.result   = 'lost';
      this.finished = true;
      push('You were defeated!');
    }
  }
}

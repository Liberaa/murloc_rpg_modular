/* core/enemy.js
   --------------------------------------------------
   Single enemy on the map.  Now exposes `.attack`
   so Battle can read the damage value.
   --------------------------------------------------*/

export class Enemy {
  constructor (def, groundY, ctx, img) {
    /* map definition */
    this.x         = def.x;
    this.level     = def.level || 1;
    this.maxHp     = def.hp;
    this.hp        = def.hp;
    this.attack    = def.atk;         // <--  key line
    this.xpReward  = def.xp;

    /* rendering */
    this.groundY   = groundY;
    this.ctx       = ctx;
    this.img       = img;
    this.width     = 32;
    this.height    = 32;
    this.alive     = true;
  }

  draw () {
    if (this.alive)
      this.ctx.drawImage(this.img, this.x, this.groundY - this.height);
  }
}

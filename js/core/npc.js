export class NPC {
  constructor (def, groundY, ctx, img) {
    Object.assign(this, def);          // x, type, sprite
    this.ctx = ctx;
    this.img = img;                    // might be undefined!
    this.width = 32;
    this.height = 32;
    this.groundY = groundY;
  }

  draw () {
    if (!this.img) return;             // ← guard fixes the crash
    this.ctx.drawImage(this.img, this.x, this.groundY - this.height);
  }
}

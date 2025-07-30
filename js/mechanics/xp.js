export class XPManager {
  constructor() {
    this.level = 1;
    this.xp = 0;
  }
  xpNeeded() {
    return Math.floor(50 * Math.pow(1.11, this.level));
  }
  gain(amount) {
    this.xp += amount;
    let leveled = false;
    while (this.xp >= this.xpNeeded()) {
      this.xp -= this.xpNeeded();
      this.level++;
      leveled = true;
      if (this.level >= 110) {
        this.xp = 0;
        break;
      }
    }
    return leveled;
  }
  percent() {
    return (this.xp / this.xpNeeded()) * 100;
  }
}

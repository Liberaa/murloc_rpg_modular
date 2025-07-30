export class Backpack {
  constructor(size) {
    this.slots = new Array(size).fill(null);
  }
  add(item) {
    const i = this.slots.indexOf(null);
    if (i !== -1) this.slots[i] = item;
  }
}

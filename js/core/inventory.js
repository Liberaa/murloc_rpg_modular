export class InventoryUI {
  constructor(backpack) {
    this.backpack = backpack;
    this.div = document.getElementById('inventory');
  }
  render() {
    this.div.innerHTML = '';
    this.backpack.slots.forEach(slot => {
      const d = document.createElement('div');
      d.className = 'inv-slot';
      if (slot && slot.img) {
        const i = document.createElement('img');
        i.src = slot.img.src;
        d.appendChild(i);
      }
      this.div.appendChild(d);
    });
  }
}

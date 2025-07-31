export class InventoryUI {
  constructor(backpack, player) {
    this.backpack = backpack;
    this.player = player;
    this.div = document.getElementById('inventory');
    this.equippedDiv = document.getElementById('equipped'); // 🆕
  }

  render() {
    // Render inventory
    this.div.innerHTML = '';
    this.backpack.slots.forEach((slot, idx) => {
      const d = document.createElement('div');
      d.className = 'inv-slot';

      if (slot && slot.img) {
        const i = document.createElement('img');
        i.src = slot.img.src;
        d.appendChild(i);

        i.onclick = () => {
          this.player.equip(slot);
          this.render();
        };
      }

      this.div.appendChild(d);
    });

    // Render equipped gear
    this.equippedDiv.innerHTML = '';
    const eq = this.player.equipped || {};
    ['head', 'body', 'weapon'].forEach(slot => {
      const d = document.createElement('div');
      d.className = 'inv-slot';
      if (eq[slot]?.img) {
        const i = document.createElement('img');
        i.src = eq[slot].img.src;
        d.appendChild(i);
      }
      this.equippedDiv.appendChild(d);
    });
  }
}

export function checkCollision(player, enemies) {
  return enemies.find(e => e.alive && Math.abs(player.x - e.x) < 24);
}

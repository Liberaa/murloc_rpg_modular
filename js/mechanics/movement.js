export function setupMovement(player, canvas) {
  const speed = 5;
  function onKey(e) {
    if (e.key === 'ArrowLeft' || e.key === 'a') player.move(-speed);
    if (e.key === 'ArrowRight' || e.key === 'd') player.move(speed);
  }
  document.addEventListener('keydown', onKey);
}

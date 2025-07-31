const queue = [];

export function push(msg, color = '#fff', bold = false) {
  queue.push({ msg, color, bold });
  if (queue.length > 10) queue.shift(); // limit to last 10 logs
}

export function last() {
  const entry = queue[queue.length - 1];
  return entry ? entry : { msg: '', color: '#fff', bold: false };
}

export function allLogs() {
  return queue;
}

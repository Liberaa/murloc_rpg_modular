const queue = [];
export function push(msg) { queue.push(msg); }
export function last() { return queue[queue.length - 1] || ''; }

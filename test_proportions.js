const mechUpper = 40.8;
const mechMiddle = 30.2;
const mechLower = 28.8;

function clamp(v, min, max) { return Math.min(Math.max(v, min), max); }

let u = clamp(mechUpper * 0.955, 22, 45);
let m = clamp(mechMiddle * 1.059, 22, 45);
let l = clamp(mechLower * 1.006, 22, 45);

const sum = u + m + l;
u = (u / sum) * 100;
m = (m / sum) * 100;
l = (l / sum) * 100;

console.log(`U: ${u.toFixed(2)} M: ${m.toFixed(2)} L: ${l.toFixed(2)}`);

const fs = require("fs");
let input;
try {
  input = fs
    .readFileSync("./input.txt", "utf-8")
    .split("\n")
    .filter((i) => i);
} catch (err) {
  console.error("Error al leer el archivo:", err.message);
}

const pInput = input.filter((i) => i.includes("|"));
const rInput = input.filter((i) => i.includes(","));

const invalidArr = [];
const nArray = [];
for (const o of rInput) {
  const items = o.split(",");
  let valid = true;
  for (let i = 1; i < items.length; i++) {
    const idx = items[i - 1];
    const sub = items.slice(i);
    for (const s of sub) {
      if (!pInput.includes(`${idx}|${s}`)) {
        valid = false;
      }
    }
  }
  if (valid) {
    nArray.push(items);
  } else {
    invalidArr.push(items);
  }
}
let res1 = 0;
nArray.forEach((i) => {
  res1 += +i[parseInt(i.length / 2)];
});
console.log("RES1:", res1);

const newArr = [];
for (const inv of invalidArr) {
  const temp = [];
  for (let i = 0; i < inv.length; i++) {
    for (let j = 0; j < inv.length; j++) {
      const f = pInput.find((t) => t === `${inv[i]}|${inv[j]}`);
      if (f) {
        temp.push(f);
      }
    }
  }
  let nn = [];
  for (const t of temp) {
    const [a, b] = t.split("|");
    if (!nn.includes(a)) nn.push(a);
    if (!nn.includes(b)) nn.push(b);
  }
  let exit = false;
  while (!exit) {
    exit = true;
    for (const t of temp) {
      const [a, b] = t.split("|");
      const ia = nn.indexOf(a);
      const ib = nn.indexOf(b);
      if (ia > ib) {
        exit = false;
        const aux = nn[ia];
        nn[ia] = nn[ib];
        nn[ib] = aux;
      }
    }
  }
  newArr.push(nn);
}

let res2 = 0;
newArr.forEach((i) => {
  res2 += +i[parseInt(i.length / 2)];
});
console.log("RES2:", res2);

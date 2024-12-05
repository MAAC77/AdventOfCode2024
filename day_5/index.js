const fs = require("fs");
let input;
try {
  input = fs
    .readFileSync("./input1.txt", "utf-8")
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
  const nn = [];
  for (const t of temp) {
    const [a, b] = t.split("|");
    if (nn.indexOf(a) < 0) nn.push(a);
    const idxa = nn.indexOf(a);
    if (!nn.includes(b)) {
      nn.splice(idxa + 1, 0, b);
    }
    const idxb = nn.indexOf(b);
    if (idxa > idxb) {
      nn.splice(idxb, 1);
      nn.push(b);
    }
  }
  newArr.push(nn);
}

let res2 = 0;
newArr.forEach((i) => {
  res2 += +i[parseInt(i.length / 2)];
});
console.log("RES2:", res2);

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

const datosGeneral = input.map((i) => i.split(" ").map((i) => +i));

function valid(data) {
  const map = data
    .map((item, i, arr) => {
      return item - arr[i + 1];
    })
    .filter((i) => i);
  if (map.length !== data.length - 1) return false;
  const asc = map.every((i) => i < 0);
  const desc = map.every((i) => i > 0);

  return asc === false && desc === false ? false : true;
}

const datos1 = datosGeneral.filter(valid);

let res1 = 0;
for (let i = 0; i < datos1.length; i++) {
  const d = datos1[i]
    .map((item, id, arr) => {
      return item - arr[id + 1];
    })
    .filter((i) => i);
  if (d.every((i) => i > 0 && i < 4)) {
    res1++;
  }
  if (d.every((i) => i < 0 && i > -4)) {
    res1++;
  }
}
console.log("RES1: ", res1);

function asc(data) {
  for (let i = 1; i < data.length; i++) {
    const diff = data[i] - data[i - 1];
    if (diff > 3 || diff < 1) {
      return false;
    }
  }
  return true;
}

function desc(data) {
  for (let i = 1; i < data.length; i++) {
    const diff = data[i] - data[i - 1];
    if (diff > -1 || diff < -3) {
      return false;
    }
  }
  return true;
}

let res2 = 0;
for (let i = 0; i < datosGeneral.length; i++) {
  let rA = 0;
  let rD = 0;

  for (let j = 0; j < datosGeneral[i].length; j++) {
    let newA = [
      ...datosGeneral[i].slice(0, j),
      ...datosGeneral[i].slice(j + 1, datosGeneral[i].length),
    ];
    if (asc(newA)) {
      rA++;
    }
    if (desc(newA)) {
      rD++;
    }
  }
  if (rA > 0 || rD > 0) {
    res2++;
  }
}
console.log("RES2: ", res2);

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

const datos = input.map((i) => i.split(""));

function formatVertical(data) {
  return data[0].map((_, c) => data.map((_, r) => data[r][c]));
}

function formatDiagonal(data) {
  const newA = [];
  const rows = data.length;
  const cols = data[0].length;
  for (let n = 0; n < cols + rows - 1; n++) {
    const temp = [];
    let r = n;
    let c = 0;
    while (r >= 0 && c < cols) {
      if (r < rows) {
        temp.push(data[r][c]);
      }
      r -= 1;
      c += 1;
    }

    newA.push(temp);
  }
  return newA;
}

function formatDiagonalI(data) {
  const newA = [];
  const rows = data.length;
  const cols = data[0].length;
  for (let n = 0; n < cols + rows - 1; n++) {
    const temp = [];
    let r = n;
    let c = cols - 1;
    while (r >= 0 && c < cols) {
      if (r < rows && c >= 0) {
        temp.push(data[r][c]);
      }
      r--;
      c--;
    }
    newA.push(temp);
  }
  return newA;
}

const dH = datos.map((i) => i.join(""));
const dV = formatVertical(datos).map((i) => i.join(""));
const dD = formatDiagonal(datos).map((i) => i.join(""));
const dDI = formatDiagonalI(datos).map((i) => i.join(""));

let res1 = 0;

const rx = /XMAS/g;
const rxi = /SAMX/g;

dH.forEach((i) => {
  const n = i.match(rx);
  const ni = i.match(rxi);
  if (n) res1 += n.length;
  if (ni) res1 += ni.length;
});
dV.forEach((i) => {
  const n = i.match(rx);
  const ni = i.match(rxi);
  if (n) res1 += n.length;
  if (ni) res1 += ni.length;
});
dD.forEach((i) => {
  const n = i.match(rx);
  const ni = i.match(rxi);
  if (n) res1 += n.length;
  if (ni) res1 += ni.length;
});
dDI.forEach((i) => {
  const n = i.match(rx);
  const ni = i.match(rxi);
  if (n) res1 += n.length;
  if (ni) res1 += ni.length;
});
console.log("RES1:", res1);

let res2 = 0;
function checkX(i, j) {
  if (
    datos[i - 1][j - 1] === "M" &&
    datos[i + 1][j - 1] === "M" &&
    datos[i + 1][j + 1] === "S" &&
    datos[i - 1][j + 1] === "S"
  )
    return true;
  if (
    datos[i - 1][j - 1] === "S" &&
    datos[i + 1][j - 1] === "M" &&
    datos[i + 1][j + 1] === "M" &&
    datos[i - 1][j + 1] === "S"
  )
    return true;
  if (
    datos[i - 1][j - 1] === "S" &&
    datos[i + 1][j - 1] === "S" &&
    datos[i + 1][j + 1] === "M" &&
    datos[i - 1][j + 1] === "M"
  )
    return true;
  if (
    datos[i - 1][j - 1] === "M" &&
    datos[i + 1][j - 1] === "S" &&
    datos[i + 1][j + 1] === "S" &&
    datos[i - 1][j + 1] === "M"
  )
    return true;
  return false;
}

for (let i = 1; i < datos.length - 1; i++) {
  for (let j = 1; j < datos[i].length - 1; j++) {
    if (datos[i][j] === "A") {
      if (checkX(i, j)) {
        res2++;
      }
    }
  }
}
console.log("RES2:", res2);

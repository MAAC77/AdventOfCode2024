const fs = require("fs");
let input;
try {
  input = fs
    .readFileSync("./input.txt", "utf-8")
    .split("\n")
    .filter((i) => i)
    .join("");
} catch (err) {
  console.error("Error al leer el archivo:", err.message);
}

const dato = input;

const rx = /mul\([\d]*,[\d]*\)/g;
const matchs = dato.match(rx);

const res1 = matchs
  .map((i) => {
    return i.match(/\d+/g).reduce((acc, i) => acc * +i, 1);
  })
  .reduce((acc, i) => acc + i, 0);
console.log("RES1:", res1);

const data = dato.split("do()");
const vArr = [];
for (const d of data) {
  const [valid] = d.split("don't()");
  vArr.push(valid);
}
const matchs2 = vArr.join("").match(rx);
const res2 = matchs2
  .map((i) => {
    return i.match(/\d+/g).reduce((acc, i) => acc * +i, 1);
  })
  .reduce((acc, i) => acc + i, 0);
console.log("RES2:", res2);

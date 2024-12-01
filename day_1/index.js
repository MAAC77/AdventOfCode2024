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

const arr1 = input
  .map((i) => i.split("  ")[0])
  .map((i) => +i)
  .sort((a, b) => a - b);
const arr2 = input
  .map((i) => i.split("  ")[1])
  .map((i) => +i)
  .sort((a, b) => a - b);

let res1 = 0;

for (let i = 0; i < arr1.length; i++) {
  res1 += Math.abs(arr2[i] - arr1[i]);
}

console.log("RES 1: ", res1);

let res2 = 0;
for (let i = 0; i < arr1.length; i++) {
  const t = arr1[i];
  const len = arr2.filter((n) => n === t).length;
  res2 += t * len;
}
console.log("RES 2: ", res2);

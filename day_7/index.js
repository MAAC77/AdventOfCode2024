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

const sig = ["+", "*"];
const sig2 = ["+", "*", "||"];

function generateCombinations(items, size) {
  let results = [];

  function helper(current) {
    if (current.length === size) {
      results.push(current.slice());
      return;
    }

    for (let item of items) {
      current.push(item);
      helper(current);
      current.pop();
    }
  }

  helper([]);
  return results;
}

let res1 = 0;
for (const item of input) {
  const [r, n] = item.split(":");
  const res = +r;
  const data = n
    .split(" ")
    .filter((x) => x)
    .map((x) => +x);
  const combinations = generateCombinations(sig, data.length - 1);
  const rt = [];
  for (const c of combinations) {
    const op = [...data];
    let f = op.shift();
    for (const x of c) {
      if (x === "+") {
        f = f + op.shift();
      }
      if (x === "*") {
        f = f * op.shift();
      }
    }
    rt.push(f);
  }
  if (rt.some((x) => x === res)) res1 += res;
}
console.log("RES1: ", res1);

let res2 = 0;
for (const item of input) {
  const [r, n] = item.split(":");
  const res = +r;
  const data = n
    .split(" ")
    .filter((x) => x)
    .map((x) => +x);
  const combinations = generateCombinations(sig2, data.length - 1);
  const rt = [];
  for (const c of combinations) {
    const op = [...data];
    let f = op.shift();
    for (const x of c) {
      if (x === "+") {
        f = f + op.shift();
      }
      if (x === "*") {
        f = f * op.shift();
      }
      if (x === "||") {
        f = +(`${f}` + `${op.shift()}`);
      }
    }
    rt.push(f);
  }
  if (rt.some((x) => x === res)) res2 += res;
}
console.log("RES2: ", res2);

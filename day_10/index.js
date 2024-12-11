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

let data = input.map((i) => i.split(""));

const xy = [];

for (let i = 0; i < data.length; i++) {
  for (let j = 0; j < data[i].length; j++) {
    if (data[i][j] === "0") xy.push([i, j]);
  }
}

function check(x, y, i) {
  if (data[x - 1] !== undefined) {
    if (data[x - 1][y] === i) return [x - 1, y];
  }
  if (data[x][y + 1] !== undefined) {
    if (data[x][y + 1] === i) return [x, y + 1];
  }
  if (data[x + 1] !== undefined) {
    if (data[x + 1][y] === i) return [x + 1, y];
  }
  if (data[x][y - 1] !== undefined) {
    if (data[x][y - 1] === i) return [x, y - 1];
  }
  return false;
}

let cc = [];
for (let n = 0; n < xy.length; n++) {
  let exit = false;
  const [x, y] = xy[n];
  let xi = x;
  let yi = y;
  let i = 1;
  let arr = [];
  let c = 0;
  while (!exit) {
    let valid = check(xi, yi, `${i}`);
    if (valid) {
      arr.push([xi, yi]);
      xi = valid[0];
      yi = valid[1];
      i++;
      if (data[xi][yi] === `${9}`) {
        // console.log("FIND ->", xi, yi);
        data[xi][yi] = "#";
        i = 9;
        const last = arr.pop();
        xi = last[0];
        yi = last[1];
        c++;
      }
    } else {
      data[xi][yi] = "#";
      const last = arr.pop();
      xi = last[0];
      yi = last[1];
      i = arr.length + 1;
      if (arr.length === 0) {
        const nc = check(xi, yi, `${i}`);
        if (!nc) {
          exit = true;
        }
      }
    }
  }
  cc.push({ n, c });
  data = input.map((i) => i.split(""));
}
const res1 = cc.reduce((acc, i) => acc + i.c, 0);
// console.log(cc);
console.log("RES1:", res1);

const NEXT_DIRS = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

function safeGridGet(grid, rowIdx, colIdx) {
  return grid[rowIdx]?.[colIdx];
}

function getTrailRating(trailhead, grid) {
  let score = 0;
  const visited = new Set();

  function walk(path, level) {
    if (visited.has(path)) return;

    visited.add(path);

    if (level === 9) {
      score++;
      return;
    }

    const point = path.split("-").at(-1).split(",").map(Number);
    const [r, c] = point;

    for (const [y, x] of NEXT_DIRS) {
      const nextRow = r + y;
      const nextCol = c + x;

      const nextLevel = safeGridGet(grid, nextRow, nextCol);

      if (nextLevel === level + 1) {
        walk(path + `-${nextRow},${nextCol}`, nextLevel);
      }
    }
  }

  walk(trailhead.join(","), 0);

  return score;
}

let data2 = input.map((i) => i.split("").map((i) => +i));
const r = xy.map((i) => getTrailRating(i, data2));
const res2 = r.reduce((acc, i) => acc + i, 0);
console.log("RES2:", res2);

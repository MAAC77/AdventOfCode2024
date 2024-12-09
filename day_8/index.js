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

const data = input.map((x) => x.split(""));
const data2 = input.map((x) => x.split(""));

const objs = {};

for (let i = 0; i < data.length; i++) {
  for (let j = 0; j < data[i].length; j++) {
    if (data[i][j] !== ".") {
      if (!objs[data[i][j]]) objs[data[i][j]] = [];
      objs[data[i][j]].push([i, j]);
    }
  }
}

let c = 0;

function antenna(xy) {
  for (let i = 0; i < xy.length; i++) {
    for (let j = 0; j < xy.length; j++) {
      if (i !== j) {
        const [x1, y1] = xy[i];
        const [x2, y2] = xy[j];
        const dx = Math.abs(x2 - x1);
        const dy = Math.abs(y2 - y1);
        if (y2 > y1 && x2 > x1) {
          const tx1 = x2 + dx;
          const ty1 = y2 + dy;
          const tx2 = x1 - dx;
          const ty2 = y1 - dy;
          if (tx1 >= 0 && ty1 >= 0 && tx1 < data.length && ty1 < data.length) {
            if (data[tx1][ty1] === ".") {
              data[tx1][ty1] = "#";
            } else {
              if (data[tx1][ty1] !== "#") c++;
            }
          }
          if (tx2 >= 0 && ty2 >= 0 && tx2 < data.length && ty2 < data.length) {
            if (data[tx2][ty2] === ".") {
              data[tx2][ty2] = "#";
            } else {
              if (data[tx2][ty2] !== "#") c++;
            }
          }
        }
        if (y1 > y2 && x2 > x1) {
          const tx1 = x1 - dx;
          const ty1 = y1 + dy;
          const tx2 = x2 + dx;
          const ty2 = y2 - dy;
          if (tx1 >= 0 && ty1 >= 0 && tx1 < data.length && ty1 < data.length) {
            if (data[tx1][ty1] === ".") {
              data[tx1][ty1] = "#";
            } else {
              if (data[tx1][ty1] !== "#") c++;
            }
          }
          if (tx2 >= 0 && ty2 >= 0 && tx2 < data.length && ty2 < data.length) {
            if (data[tx2][ty2] === ".") {
              data[tx2][ty2] = "#";
            } else {
              if (data[tx2][ty2] !== "#") c++;
            }
          }
        }
      }
    }
  }
}
for (const data of Object.values(objs)) {
  antenna(data);
}

const res1 = data
  .map((x) => x.join(""))
  .join("\n")
  .match(/#/g).length;
console.log("RES1:", res1 + c);

function antenna2(xy) {
  for (let i = 0; i < xy.length; i++) {
    for (let j = 0; j < xy.length; j++) {
      if (i !== j) {
        let [x1, y1] = xy[i];
        let [x2, y2] = xy[j];
        const dx = Math.abs(x2 - x1);
        const dy = Math.abs(y2 - y1);
        if (y2 > y1 && x2 > x1) {
          let exit1 = false;
          let exit2 = false;
          while (!exit1) {
            const tx1 = x1 - dx;
            const ty1 = y1 - dy;
            if (
              tx1 >= 0 &&
              ty1 >= 0 &&
              tx1 < data2.length &&
              ty1 < data2.length
            ) {
              if (data2[tx1][ty1] === ".") {
                data2[tx1][ty1] = "#";
              }
              x1 = tx1;
              y1 = ty1;
            } else {
              exit1 = true;
            }
          }
          while (!exit2) {
            const tx2 = x2 + dx;
            const ty2 = y2 + dy;
            if (
              tx2 >= 0 &&
              ty2 >= 0 &&
              tx2 < data2.length &&
              ty2 < data2.length
            ) {
              if (data2[tx2][ty2] === ".") {
                data2[tx2][ty2] = "#";
              }
              x2 = tx2;
              y2 = ty2;
            } else {
              exit2 = true;
            }
          }
        }
        if (y1 > y2 && x2 > x1) {
          let exit1 = false;
          let exit2 = false;
          while (!exit1) {
            const tx1 = x1 - dx;
            const ty1 = y1 + dy;
            if (
              tx1 >= 0 &&
              ty1 >= 0 &&
              tx1 < data2.length &&
              ty1 < data2.length
            ) {
              if (data2[tx1][ty1] === ".") {
                data2[tx1][ty1] = "#";
              }
              x1 = tx1;
              y1 = ty1;
            } else {
              exit1 = true;
            }
          }
          while (!exit2) {
            const tx2 = x2 + dx;
            const ty2 = y2 - dy;
            if (
              tx2 >= 0 &&
              ty2 >= 0 &&
              tx2 < data2.length &&
              ty2 < data2.length
            ) {
              if (data2[tx2][ty2] === ".") {
                data2[tx2][ty2] = "#";
              }
              x2 = tx2;
              y2 = ty2;
            } else {
              exit2 = true;
            }
          }
        }
      }
    }
  }
}

for (const data of Object.values(objs)) {
  antenna2(data);
}

const total = data2.length * data2.length;
const cant = data2
  .map((x) => x.join(""))
  .join("\n")
  .match(/\./g).length;
const res2 = total - cant;
console.log("RES2:", res2);

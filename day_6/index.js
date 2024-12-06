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

const datosG = input.map((i) => i.split(""));
const dd = input.join("\n");

function p1() {
  const datos = [...datosG];
  function nextStep(i, j, d) {
    datos[i][j] = "X";
    switch (d) {
      case "up":
        if (datos[i - 1][j] === "#") return false;
        return [i - 1, j];
      case "down":
        if (datos[i + 1][j] === "#") return false;
        return [i + 1, j];
      case "left":
        if (datos[i][j - 1] === "#") return false;
        return [i, j - 1];
      case "right":
        if (datos[i][j + 1] === "#") return false;
        return [i, j + 1];
      default:
        break;
    }
  }

  function findP() {
    for (let i = 0; i < datos.length; i++) {
      for (let j = 0; j < datos[i].length; j++) {
        if (datos[i][j] === "^") {
          return [i, j, "up"];
        }
        if (datos[i][j] === "<") {
          return [i, j, "left"];
        }
        if (datos[i][j] === ">") {
          return [i, j, "right"];
        }
        if (datos[i][j] === "v") {
          return [i, j, "down"];
        }
      }
    }
    return false;
  }

  function spin(d) {
    switch (d) {
      case "up":
        return ">";
      case "down":
        return "<";
      case "left":
        return "^";
      case "right":
        return "v";
    }
  }

  function valid(i, j, d) {
    datos[i][j] = "X";
    try {
      switch (d) {
        case "up":
          return !!datos[i - 1][j];
        case "down":
          return !!datos[i + 1][j];
        case "left":
          return !!datos[i][j - 1];
        case "right":
          return !!datos[i][j + 1];
      }
    } catch (error) {
      return false;
    }
  }

  let exit = false;

  while (!exit) {
    const f = findP();

    const [i, j, s] = f;
    if (!valid(i, j, s)) {
      exit = true;
      break;
    }
    const ns = nextStep(i, j, s);
    if (!Array.isArray(ns)) {
      const way = spin(s);
      datos[i][j] = way;
      continue;
    }
    const [x, y] = ns;
    switch (s) {
      case "up":
        datos[x][y] = "^";
        break;
      case "down":
        datos[x][y] = "v";
        break;
      case "left":
        datos[x][y] = "<";
        break;
      case "right":
        datos[x][y] = ">";
        break;
      default:
        break;
    }
  }

  const nm = datos.map((i) => i.join("")).join("\n");
  const res1 = nm.match(/X/g).length;
  console.log("RES1:", res1);
}
// p1();

function p2() {
  console.log("p2");
}
p2();

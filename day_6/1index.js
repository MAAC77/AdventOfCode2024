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

function listArr() {
  class Node {
    constructor(value) {
      this.value = value;
      this.up = null;
      this.down = null;
      this.left = null;
      this.right = null;
    }
  }

  function createLinkedList2D(array2D) {
    if (!array2D || array2D.length === 0) return null;

    const rows = array2D.length;
    const cols = array2D[0].length;

    // Crear una matriz de nodos del mismo tamaño que array2D
    const nodes = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => null),
    );

    // Crear los nodos y guardarlos en la matriz
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        nodes[i][j] = new Node(array2D[i][j]);
      }
    }

    // Conectar los nodos en las cuatro direcciones
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (i > 0) nodes[i][j].up = nodes[i - 1][j]; // Conectar hacia arriba
        if (i < rows - 1) nodes[i][j].down = nodes[i + 1][j]; // Conectar hacia abajo
        if (j > 0) nodes[i][j].left = nodes[i][j - 1]; // Conectar hacia la izquierda
        if (j < cols - 1) nodes[i][j].right = nodes[i][j + 1]; // Conectar hacia la derecha
      }
    }

    // Devolver la matriz de nodos
    return nodes;
  }

  // Ejemplo de uso:
  // const array2D = [
  //   [1, 2, 3],
  //   [4, 5, 6],
  //   [7, 8, 9],
  // ];

  // const linkedList2D = createLinkedList2D(datosG);

  return createLinkedList2D(datosG);

  // // Acceso a un nodo y sus vecinos:
  // const node = linkedList2D[1][1]; // Nodo con valor 5
  // console.log(node.value); // Salida: 5
}

function p2() {
  const list = listArr();
  const datos = [...datosG];
  // console.log(list);
  function findP() {
    for (let i = 0; i < datos.length; i++) {
      for (let j = 0; j < datos[i].length; j++) {
        if (datos[i][j] === "^") {
          return [i, j];
        }
      }
    }
  }

  const [x, y] = findP();
  // console.log(x);
  // console.log(y);
  let exit = false;
  let nodeO = list[x][y];
  let nodeN;
  let dir = "up";
  while (!exit) {
    if (dir === "up") {
      nodeN = nodeO.up;
      if (!nodeN) {
        exit = true;
        continue;
      }
      if (nodeN.value === "#") {
        dir = "right";
      } else {
        nodeO = nodeN;
      }
    }
    if (dir === "right") {
      nodeN = nodeO.right;
      if (!nodeN) {
        exit = true;
        continue;
      }
      if (nodeN.value === "#") {
        dir = "down";
      } else {
        nodeO = nodeN;
      }
    }
    if (dir === "down") {
      if (!nodeN) {
        exit = true;
        continue;
      }
      if (nodeN.value === "#") {
        dir = "left";
      } else {
        nodeO = nodeN;
      }
    }
    if (dir === "left") {
      nodeN = nodeO.left;
      if (!nodeN) {
        exit = true;
        continue;
      }
      if (nodeN.value === "#") {
        dir = "up";
      } else {
        nodeO = nodeN;
      }
    }
  }
}

p2();

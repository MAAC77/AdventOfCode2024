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
function part1() {
  const datos = input[0].split("");
  // const datos = ["1", "2", "3", "4", "5"];
  let idx = 0;

  const temp = [];
  for (let i = 0; i < datos.length; i++) {
    if (i % 2 === 0) {
      for (let j = 0; j < +datos[i]; j++) {
        temp.push(`${idx}`);
      }
      idx++;
    } else {
      for (let j = 0; j < +datos[i]; j++) {
        temp.push(".");
      }
    }
  }
  function lastI(arr) {
    // console.log("arr", arr.join(""));
    for (let i = 1; i < arr.length; i++) {
      // console.log("val", arr[arr.length - i]);
      if (arr[arr.length - i] !== ".") return arr.length - i;
    }
  }

  // console.log(temp.join(""));
  // const reg = temp.join("").match(/\d+/g);
  // console.log(reg);
  let i = 0;
  while (temp.join("").match(/\d+/g).length > 1) {
    // console.log("=====");
    // console.log("i", i);
    // console.log(temp[i]);
    // console.log(temp.join(""));
    if (temp[i] === ".") {
      const idxLast = lastI(temp);
      // console.log("idx", idxLast);
      temp[i] = temp[idxLast];
      temp[idxLast] = ".";
    } else {
      i++;
    }
  }
  // console.log(temp.join(""));

  let res1 = temp.reduce((acc, item, i) => {
    if (item !== ".") {
      acc += +item * i;
    }
    return acc;
  }, 0);
  console.log("RES1", res1);
}
// part1();

function part2() {
  const datos = input[0].split("");
  let temp = [];
  let idx = 0;
  for (let i = 0; i < datos.length; i++) {
    if (i % 2 === 0) {
      for (let j = 0; j < +datos[i]; j++) {
        temp.push(`${idx}`);
      }
      idx++;
    } else {
      for (let j = 0; j < +datos[i]; j++) {
        temp.push(".");
      }
    }
  }
  // console.log("temp", temp);
  for (let i = idx - 1; i >= 0; i--) {
    // console.log("==========================");
    // console.log(i);
    const regn = new RegExp(`${i}+`, "g");
    const nn = temp.join("").match(regn)[0];
    const pp = temp.join("").match(/(\.)\1*/g);
    // console.log(pp);
    // console.log(nn);
    const len = nn.length;
    let data = temp.join("");
    // console.log(data);
    const ppf = pp.filter((x) => x.length >= len);
    // console.log("ppf", ppf);
    const idp = data.indexOf(ppf.shift());
    // console.log("idp", idp);
    const idn = data.indexOf(nn);
    // console.log("idn", idn);
    if (idp > -1 && idn > idp) {
      // console.log("yes");
      data = data.replaceAll(`${i}`, ".");
      let t = data.split("");
      t.splice(idp, len, `${i}`.repeat(len));
      // console.log(data);
      // console.log(t);
      temp = t.join("").split("");
    }
  }
  console.log(temp.join(""));
  let res2 = temp.reduce((acc, item, i) => {
    if (item !== ".") {
      acc += +item * i;
    }
    return acc;
  }, 0);
  console.log("RES2", res2);
}
part2();

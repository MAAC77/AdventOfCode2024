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
  console.log("temp", temp);
  for (let i = idx - 1; i >= 0; i--) {
    console.log("==========================");
    let exit = false;
    const regn = new RegExp(`${i}+`, "g");
    const nn = temp.join("").match(regn)[0];
    const limit = nn.length;
    console.log(limit);
    while (!exit) {
      let cc = 0;
      let tt = [...temp];
      let res = [...temp];
      console.log(tt);
      const li = tt.lastIndexOf(`${i}`);
      const ip = tt.indexOf(".");
      const pp = tt.join("").match(/(\.)\1*/g);
      console.log("pp", pp);
      if (pp.some((x) => x.length >= nn.length)) {
        // console.log("YES");
        console.log("nn", nn);
        console.log("li", li);
        console.log("ip", ip);
        tt[ip] = `${i}`;
        tt[li] = ".";
        console.log(tt);
        // const re = tt.join("").match(`/${i}/g`);
        const reg = new RegExp(`${i}+`, "g");
        const re = tt.join("").match(reg);
        console.log(re);
        // console.log("99.9".match(/9+/g));
        // console.log(tt.join("").match(/9+/g));
        if (re.length === 1) {
          // temp = tt;
          exit = true;
        } else {
          if (limit <= cc) {
            c++;
          } else {
            cc = 0;
            tt = [...res];
            tt[ip] = "#";
          }
        }
        temp = tt;
      } else {
        exit = true;
      }
      // exit = true;
      // if (i === 7) exit = true;
    }
    if (i === 7) break;
  }
  // const t = temp.join("").match(/(\d)\1*/g);
  // console.log(t);
  // const t1 = temp.join("").match(/(\.)\1*/g);
  // console.log(t1);

  // while (temp.join("").match(/\d+/g).length > 1) {
  //   const nn = temp.join("").match(/(\d)\1*/g);
  //   const pp = temp.join("").match(/(\.)\1*/g);
  //   console.log(nn);
  //   console.log(pp);
  // }
  // const nn = temp.join("").match(/(\d)\1*/g);
  // const pp = temp.join("").match(/(\.)\1*/g);
  // console.log(nn);
  // console.log(pp);
  // let te = [];
  // for (let i = 0; i < nn.length; i++) {
  //   te.push(nn[i]);
  //   te.push(pp[i]);
  // }
  // te = te.filter((x) => x);
  // console.log(te);
  // let aux = []
  // for (let i = 0; i < te.length; i++) {
  //   const ult = te.findLast((x) => !x.includes("."));
  //   const p1 = te.find((x) => x.includes(".") && x.length >= te[i]);
  //   console.log(p1);
  //   console.log(ult);
  //   if (p1) {
  //
  //   }
  // }
}
part2();

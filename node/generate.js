var fs = require("fs");

try {
  fs.unlinkSync("../src/logs/log.json");
} catch (e) {
  console.log("Oh well");
}
var logger = fs.createWriteStream("../src/logs/log.json", {
  flags: "a"
});

const writeLn = line => {
  logger.write(line.toString() + "\n");
};

function randomRange(start, stop) {
  const low = Math.ceil(start);
  const high = Math.floor(stop);
  return Math.floor(Math.random() * (high - low + 1)) + low;
}

let toggleDirection = 1;

const genSinWave = (numberOfPoints, rip) => {
  let range = randomRange(150, 360);
  let ripples = randomRange(2, rip + 2) * toggleDirection;
  toggleDirection = toggleDirection * -1;

  let foo = numberOfPoints / (4 * ripples);
  const ret = [];

  if (toggleDirection === -1) {
    for (let count = 0; count <= numberOfPoints; count++) {
      ripples = ripples + 0.001;
      let foo = numberOfPoints / (4 * ripples);
      ret.push(Math.sin(count / foo) * range);
    }
  } else {
    for (let count = numberOfPoints; count >= 0; count--) {
      ripples = ripples + 0.001;
      let foo = numberOfPoints / (4 * ripples);
      ret.push(Math.sin(count / foo) * range);
    }
  }

  return ret;
};

const averageOut = (arr, invert = false) => {
  const numberOfArrays = arr.length;
  const baseArray = arr[0];
  const curveLength = baseArray.length;

  let collect = [];

  for (let x = 0; x < curveLength; x++) {
    let additional = 0;
    arr.forEach((currentArray, key) => {
      additional = additional + currentArray[x];
    });

    collect.push(additional / numberOfArrays);
  }

  if (invert) {
    collect = collect.map(v => v * -1);
  }

  return collect;
};

const getArrayOfSineWaves = () => {
  return [...Array(20).keys()].map(n => genSinWave(1000, n / 1.5));
};

const genPlane = () => {
  const first = averageOut(getArrayOfSineWaves(), true);
  const second = averageOut(getArrayOfSineWaves(), false);
  const third = averageOut(getArrayOfSineWaves(), true);
  const fourth = averageOut(getArrayOfSineWaves(), false);
  return averageOut([first, second, third, fourth]);
};

const r = n => n.toFixed(4);

const go = () => {
  const xx = genPlane();
  const yy = genPlane();
  const zz = genPlane();

  const collection = [];
  xx.forEach((l, k) => {
    collection.push({ x: r(xx[k]), y: r(yy[k]), z: r(zz[k]) });
  });

  console.log(collection);

  writeLn(JSON.stringify(collection));
};

go();

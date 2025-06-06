const serialize = (arr) => {
  return arr.map((i) => String.fromCodePoint(i));
};
const deSerialize = (str) => {
  let arr = [];
  for (let c of str) {
    arr.push(c.codePointAt(0));
  }
  return arr;
};
function randomInteger(min, max) {
  // случайное число от min до (max+1)
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}
function generateArr(count, min, max) {
  let arr = new Array(count).fill().map(() => randomInteger(min, max));
  return arr;
}
function compressArr(arr) {
  let arrCompressed = serialize(arr);
  return arrCompressed;
}

let arrGenerated = generateArr(1000, 100, 999);
let arrCompressed = compressArr(arrGenerated);

let strFromGeneratedArr = arrGenerated.join('');
let strFromCompressedArr = arrCompressed.join('');

console.log(strFromGeneratedArr.length);
console.log(strFromCompressedArr.length);

console.log(arrGenerated);
console.log(arrCompressed);
console.log(deSerialize(strFromCompressedArr));

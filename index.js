const deserialize = (str) => {
  let arr = [];
  for (let c of str) {
    arr.push(c.codePointAt(0));
  }
  return arr;
};

const randomInteger = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));
const generateArr = (count, min, max) => new Array(count).fill().map(() => randomInteger(min, max));
const compressArr = (arr) => arr.map((i) => String.fromCodePoint(i));

// -------------------------------------------------------- TEST --------------------------------------------------------
/**
  В консоль выводится: исходная строка(+ длинна), сжатая строка(+ длинна), коэффициент сжатия, сравнение(строгое ===) с исходной после манипуляций.

  Примеры тестов:
  1. простейшие короткие,
  2. случайные
    - 50 чисел,
    - 100 чисел,
    - 500 чисел,
    - 1000 чисел,
  3. граничные
    - все числа 1 знака,
    - все числа из 2х знаков,
    - все числа из 3х знаков,
    - каждого числа по 3 - всего чисел 900.
*/

function test(count, min, max) {
  let arrGenerated = generateArr(count, min, max);
  let arrCompressed = compressArr(arrGenerated);

  let strFromGeneratedArr = arrGenerated.join('');
  let strFromCompressedArr = arrCompressed.join('');

  console.log('initArrString length = ', strFromGeneratedArr.length, '; string = ', strFromGeneratedArr);
  console.log('compressedArrString length = ', strFromCompressedArr.length, '; string = ', strFromCompressedArr);

  console.log('compress = ', 100 - Math.round((strFromCompressedArr.length / strFromGeneratedArr.length) * 100) + ' %');

  console.log('IS EQUAL = ', deserialize(strFromCompressedArr).join('') === strFromGeneratedArr);
  console.log('------------------------------------------------------');
};

// 1
// test(9, 1, 9);

// 2
test(50, 1, 999);
test(100, 1, 999);
test(500, 1, 999);
test(1000, 1, 999);

// 3
test(300, 1, 9);
test(300, 10, 99);
test(300, 100, 999);

const deserialize = (str) => {
  let arr = [];
  for (let c of str) {
    arr.push(c.codePointAt(0));
  }
  return arr;
};

const randomInteger = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));
const generateArr = (count, min, max, repeat = 1) => new Array(count).fill().map(() => {
  const digit = randomInteger(min, max);
  const arr = [];
  for (let i = 1; i<= repeat; i++) {
    arr.push(digit);
  };
  return arr;
}).flat();
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

function test(count, min, max, repeat = 1) {
  let arrGenerated = generateArr(count, min, max, repeat);
  let arrCompressed = compressArr(arrGenerated);

  let strFromGeneratedArr = arrGenerated.join('');
  let strFromCompressedArr = arrCompressed.join('');

  console.log('INIT string length = ', strFromGeneratedArr.length, '\n', strFromGeneratedArr);
  console.log('COMPRESSED string length = ', strFromCompressedArr.length, '\n', strFromCompressedArr);

  console.log('compress = ', 100 - Math.round((strFromCompressedArr.length / strFromGeneratedArr.length) * 100) + ' %');

  console.log('IS EQUAL = ', deserialize(strFromCompressedArr).join('') === strFromGeneratedArr);
  console.log('------------------------------------------------------');
};

// 1
test(1000, 1, 99);

// 2
test(50, 1, 999);
test(100, 1, 999);
test(500, 1, 999);
test(1000, 1, 999);

// 3
test(300, 1, 9);
test(300, 10, 99);
test(300, 100, 999);
test(300, 100, 999, 3);

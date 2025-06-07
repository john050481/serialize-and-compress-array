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
const serialize = (arr) => compressArr(arr).join('');
const deserialize = (str) => str.split('').map(c => c.codePointAt(0));
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

function test(title, count, min, max, repeat = 1) {
  let arrGenerated = generateArr(count, min, max, repeat);

  let serializedInitArr = arrGenerated.join('');
  let serializedCompressedArr = serialize(arrGenerated);

  const compress = 100 - Math.round((serializedCompressedArr.length / serializedInitArr.length) * 10000)/100;
  const isEqual = deserialize(serializedCompressedArr).join('') === serializedInitArr;

  console.log(`%c ${title}`, 'color: red');
  console.log(`%c COMPRESS = ${compress}` + `%c (inLength: ${serializedInitArr.length}, outLength: ${serializedCompressedArr.length})`, 'color: blue', 'color: black');
  console.log(`%c IS EQUAL = ${isEqual}` + '%c (обратное преобразование и проверка на равенство)', 'color: blue', 'color: black');

  console.log('%c INIT string = ' + `%c ${serializedInitArr}`, 'color: blue', 'color: green');
  console.log('%c COMPRESSED string = ' + `%c ${serializedCompressedArr}`, 'color: blue', 'color: green');

  console.log('=========================================================================================');
};

// 1
test('Простые от 1 до 99', 1000, 1, 99);

// 2
test('Случайные 50шт', 50, 1, 300);
test('Случайные 100шт', 100, 1, 300);
test('Случайные 500шт', 500, 1, 300);
test('Случайные 1000шт', 1000, 1, 300);

// 3
test('Граничные 900шт, цифры: от 1 до 9', 900, 1, 9);
test('Граничные 900шт, цифры: от 10 до 99', 900, 10, 99);
test('Граничные 900шт, цифры: от 100 до 300', 900, 100, 300);
test('Граничные 900шт, цифры: от 1 до 300, каждая цифра повторяется 3 раза', 300, 1, 300, 3);

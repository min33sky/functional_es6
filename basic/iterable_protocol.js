/**
 * 기존과 달라진 ES6에서의 리스트 순회
 * - for i++
 * - for of
 */

const list = [1, 2, 3];

// es5에서의 리스트 순회

for (let i = 0; i < list.length; i++) {
  const element = list[i];
  console.log(element);
}

const str = 'abc';
for (let i = 0; i < str.length; i++) {
  const element = str[i];
  console.log(element);
}

// es6에서의 리스트 순회

for (const value of list) {
  console.log(value);
}

for (const value of str) {
  console.log(value);
}

// ? Array를 통해 알아보기
console.log('Arr --------------------');
const arr = [1, 2, 3];
let iter1 = arr[Symbol.iterator](); // 이터레이터 리턴
iter1.next();
for (const a of iter1) {
  console.log(a);
}

// ? Set을 통해 알아보기
console.log('Set --------------------');
const set = new Set([1, 2, 3]);

for (const a of set) {
  console.log(a);
}

// ? Map을 통해 알아보기
console.log('Map --------------------');
const map = new Map([
  ['a', 1],
  ['b', 2],
  ['c', 3],
]);

for (const a of map) {
  console.log(a);
}

for (const a of map.keys()) {
  console.log(a);
}

for (const a of map.values()) {
  console.log(a);
}

for (const a of map.entries()) {
  console.log(a);
}

/**
 * ? 이터러블/이터레이터 프로토콜
 * - 이터러블: 이터레이터를 리턴하는 [Symbol.iterator()]를 가진 값
 * - 이터레이터: {value, done} 객체를 리턴하는 next() 가진 값
 * - 이터러블/이터레이터 프로토콜: 이터러블을 for...of, 전개 연산자 등과 함께 동작하도록 한 규약
 */

// 사용자 정의 이터러블을 구현해보기
console.log('사용자 정의 이터러블 --------------------------');

const iterable = {
  [Symbol.iterator]() {
    let i = 3;
    return {
      next() {
        return i === 0 ? { done: true } : { value: i--, done: false };
      },
      // ! well-formed iterable을 구현해야 이터레이터가 언제 어디서나 순회가 가능하다
      [Symbol.iterator]() {
        return this;
      },
    };
  },
};

// well-formed iterable을 구현했기 때문에 이터레이터로 만들어도 순회가 가능하다.
const iter = iterable[Symbol.iterator]();
iter.next();

for (const a of iter) {
  console.log(a);
}

// ? 전개 연산자도 이터레이터/이터러블 프로토콜을 따른다.

const arr1 = [11, 22, 33];
// arr1[Symbol.iterator] = null;
console.log([...arr1, ...set, ...map]);

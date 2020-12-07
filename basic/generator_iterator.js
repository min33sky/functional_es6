/**
 * 제너레이터 / 이터레이터
 * - 제너레이터: 이터레이터이자 이터러블을 생성하는 함수
 */

function* gen() {
  yield 1;
  if (false) yield 2;
  yield 3;
  // return 10;
}

let iter11 = gen(); // 제너레이터 함수를 호출해서 이터레이터를 생성

console.log(iter11[Symbol.iterator]); // 이터레이터이면서 이터러블이다. (well-formed iterable)
console.log(iter11.next());
console.log(iter11.next());
console.log(iter11.next());
console.log(iter11.next());

for (const a of gen()) {
  console.log(a);
}

// odds

function* infinity(s = 0) {
  while (true) yield s++;
}

function* limit(l, iter) {
  for (const a of iter) {
    if (a === l) return;
    yield a;
  }
}

function* odds(l) {
  for (const a of limit(l, infinity())) {
    if (a % 2) yield a;
  }
}

for (const i of odds(40)) {
  console.log(i);
}

// for of, 전개 연산자, 구조 분해, 나머지 연산자
console.log(...odds(5));
console.log([...odds(10), ...odds(20)]);

const [head, ...tail] = odds(10);
console.log(head);
console.log(tail);

const [c, d, ...rest] = odds(10);

console.log(c);
console.log(d);
console.log(rest);

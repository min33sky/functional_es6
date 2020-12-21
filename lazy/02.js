const { go, map, reduce, pipe, curry } = require('../lib/fx_node');

/**
 * 이터러블 중심 프로그래밍에서의 지연 평가 (Lazy Evaluation)
 * - 제때 계산법
 * - 느긋한 계산법
 * - 제네레이터/이터레이터 프로토콜을 기반으로 구현
 */

const L = {};

//  L.map

L.map = function* (f, iter) {
  iter = iter[Symbol.iterator]();
  let cur;
  while (!(cur = iter.next()).done) {
    yield f(cur.value);
  }
};

const it = L.map(a => a + 10, [1, 2, 3, 4, 5]);
console.log(it.next());
console.log(it.next());
console.log(it.next());

L.filter = function* (f, iter) {
  iter = iter[Symbol.iterator]();
  let cur;
  while (!(cur = iter.next()).done) {
    if (f(cur.value)) yield cur.value;
  }
};

const it2 = L.filter(a => a % 2, [1, 2, 3, 4, 5]);
console.log(it2.next());
console.log(it2.next());
console.log(it2.next());
console.log(it2.next());

/**
 * map, filter 계열 함수들이 가지는 결합 법칙
 *
 * - 사용하는 데이터가 무엇이든지
 * - 사용하는 보조 함수가 순수 함수라면 무엇이든지
 * - 아래와 같이 결합한다면 둘 다 결과가 같다.
 *
 * [[mapping, mapping], [filtering, filtering], [mapping, mapping]]
 *  =
 * [[mapping, filtering, mapping], [mapping, filtering, mapping]]
 */

//  결과를 만드는 함수 reduce, take

//* reduce

// 객체를 쿼리스트링으로 리턴하는 함수
// const queryStr = obj =>
//   go(
//     obj,
//     Object.entries,
//     map(([k, v]) => `${k}=${v}`),
//     reduce((a, b) => `${a}&${b}`),
//   );

L.entries = function* (obj) {
  for (const k in obj) {
    yield [k, obj[k]];
  }
};

const join = curry((sep = ',', iter) => reduce((a, b) => `${a}${sep}${b}`, iter));

const queryStr = pipe(
  L.entries,
  map(([k, v]) => `${k}=${v}`),
  join('&'),
);

console.log(queryStr({ limit: 30, offset: 10, type: 'notice' }));

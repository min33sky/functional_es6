const { reduce, go, curry, filter } = require('../lib/fx_node');

const add = (a, b) => a + b;

// range

const range = l => {
  let i = -1;
  let res = [];

  while (++i < l) {
    res.push(i);
  }

  return res;
};

let range5 = range(5); // 이미 함수가 평가되어 배열을 리턴하였다.
console.log(range5);

console.log(reduce(add, range5));

// 느긋한 L.range

const L = {};

L.range = function* (l) {
  let i = -1;

  while (++i < l) {
    yield i;
  }
};

const lazyRange5 = L.range(5);

console.log(lazyRange5); // 이터레이터가 리턴되었고 아직 평가되지 않았다.

console.log(reduce(add, lazyRange5));

function test(name, time, f) {
  console.time(name);
  while (time--) f();
  console.timeEnd(name);
}

test('range', 10, () => reduce(add, range(1000000)));
test('L.range', 10, () => reduce(add, L.range(1000000)));

// ***** take ****** //

const take = curry((l, iter) => {
  let res = [];

  iter = iter[Symbol.iterator]();
  let cur;

  while (!(cur = iter.next()).done) {
    res.push(cur.value);
    if (res.length === l) return res;
  }

  return res;
});

// 즉시 평가하는 것이 지연 평가하는 것보다 오래 걸린다.
console.time('');
console.log(take(5, range(100000)));
console.timeEnd('');

console.time('');
console.log(take(5, L.range(100000)));
console.timeEnd('');

go(range(10000), take(5), reduce(add), console.log);

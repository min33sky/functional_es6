// curry
// 함수를 인자로 받아 함수를 리턴하는데 인자의 수가 2개 이상이면 함수를 즉시 호출하고
// 인자가 1개일 때는 다시 인자를 받는 함수를 리턴한다.
const curry = f => (a, ..._) => (_.length ? f(a, ..._) : (..._) => f(a, ..._));

const map = curry((func, iter) => {
  let res = [];

  iter = iter[Symbol.iterator]();
  let cur;
  while (!(cur = iter.next()).done) {
    res.push(func(cur.value));
  }

  // for (const a of iter) {
  //   res.push(func(a));
  // }

  return res;
});

const filter = curry((func, iter) => {
  let res = [];

  iter = iter[Symbol.iterator]();
  let cur;
  while (!(cur = iter.next()).done) {
    if (func(cur.value)) res.push(cur.value);
  }

  // for (const i of iter) {
  //   if (func(i)) res.push(i);
  // }
  return res;
});

const reduce = curry((func, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    // console.log(iter);
    acc = iter.next().value;
  } else {
    iter = iter[Symbol.iterator]();
  }

  let cur;
  while (!(cur = iter.next()).done) {
    acc = func(acc, cur.value);
  }

  // for (const a of iter) {
  //   acc = func(acc, a);
  // }
  return acc;
});

const go = (...args) => reduce((a, f) => f(a), args);
const pipe = (fn, ...args) => (...as) => go(fn(...as), ...args);

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

const range = l => {
  let i = -1;
  let res = [];

  while (++i < l) {
    res.push(i);
  }

  return res;
};

module.exports = {
  curry,
  map,
  filter,
  reduce,
  go,
  pipe,
  take,
  range,
};

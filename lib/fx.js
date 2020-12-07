// curry
// 함수를 인자로 받아 함수를 리턴하는데 인자의 수가 2개 이상이면 함수를 즉시 호출하고
// 인자가 1개일 때는 다시 인자를 받는 함수를 리턴한다.
export const curry = f => (a, ..._) => (_.length ? f(a, ..._) : (..._) => f(a, ..._));

export const map = curry((func, iter) => {
  let res = [];

  for (const a of iter) {
    res.push(func(a));
  }

  return res;
});

export const filter = curry((func, iter) => {
  let res = [];

  for (const i of iter) {
    if (func(i)) res.push(i);
  }
  return res;
});

export const reduce = curry((func, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }

  for (const a of iter) {
    acc = func(acc, a);
  }
  return acc;
});

export const go = (...args) => reduce((a, f) => f(a), args);
export const pipe = (fn, ...args) => (...as) => go(fn(...as), ...args);

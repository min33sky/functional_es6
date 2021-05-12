const L = {};

L.range = function* (l) {
  let i = -1;

  while (++i < l) {
    yield i;
  }
};

L.map = function* (f, iter) {
  iter = iter[Symbol.iterator]();
  let cur;
  while (!(cur = iter.next()).done) {
    yield f(cur.value);
  }
};

L.filter = function* (f, iter) {
  iter = iter[Symbol.iterator]();
  let cur;
  while (!(cur = iter.next()).done) {
    if (f(cur.value)) yield cur.value;
  }
};

L.entries = function* (obj) {
  for (const k in obj) {
    yield [k, obj[k]];
  }
};

module.exports = L;

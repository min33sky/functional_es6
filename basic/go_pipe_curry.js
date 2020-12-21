const { reduce, map, filter } = require('../lib/fx_node');

const products = [
  { name: '반팔티', price: 15000 },
  { name: '긴팔티', price: 20000 },
  { name: '핸드폰케이스', price: 15000 },
  { name: '후드티', price: 30000 },
  { name: '바지', price: 25000 },
];

const add = (a, b) => a + b;

// go & pipe
const go = (...args) => reduce((a, f) => f(a), args);
const pipe = (fn, ...args) => (...as) => go(fn(...as), ...args);

go(
  add(0, 1),
  a => a + 1,
  a => a + 10,
  a => a + 100,
  console.log,
);

const f = pipe(
  a => a + 1,
  a => a + 10,
  a => a + 100,
);

console.log(f(add(0, 1)));

go(
  products,
  products => map(product => product.price, products),
  prices => filter(price => price < 20000, prices),
  under20000 => reduce(add, under20000),
  console.log,
);

// curry를 적용

go(
  products,
  products => map(product => product.price)(products),
  prices => filter(price => price < 20000)(prices),
  under20000 => reduce(add)(under20000),
  console.log,
);

go(
  products,
  map(product => product.price),
  filter(price => price < 20000),
  reduce(add),
  console.log,
);

const total_price = pipe(
  filter(price => price < 20000),
  reduce(add),
);

const base_total_price = predi => pipe(filter(predi), reduce(add));

go(
  products,
  map(product => product.price),
  total_price,
  console.log,
);

go(
  products,
  map(product => product.price),
  base_total_price(price => price < 20000),
  console.log,
);

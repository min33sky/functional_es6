const { filter, map, reduce } = require('../lib/fx');

const products = [
  { name: '반팔티', price: 15000 },
  { name: '긴팔티', price: 20000 },
  { name: '핸드폰케이스', price: 15000 },
  { name: '후드티', price: 30000 },
  { name: '바지', price: 25000 },
];

// map
let names = [];
for (const p of products) {
  names.push(p.name);
}
console.log(names);

console.log(
  'map :',
  map(item => item.name, products),
);

let prices = [];
for (const p of products) {
  prices.push(p.price);
}
console.log(prices);

console.log(
  'map: ',
  map(item => item.price, products),
);

function* gen2() {
  yield 1;
  if (false) yield 3;
  yield 5;
}

// ? 프로토타입 기반이나 클래스 기반에만 적용 가능한 함수보다
// ? 이터러블 프로토콜을 따르는 모든 곳에 적용이 가능하므로 다형성이 높다
// console.log(_map(el => el.nodeName, document.querySelectorAll('*')));
console.log(map(item => item * item, gen2()));

let m = new Map();
m.set('a', 10);
m.set('b', 20);

console.log(map(([k, v]) => [k, v * 2], m));
console.log(new Map(map(([k, v]) => [k, v * 2], m)));

// filter
let under20000 = [];
for (const p of products) {
  if (p.price < 20000) under20000.push(p);
}
console.log(under20000);
console.log(
  'filter:',
  filter(item => item.price < 20000, products),
);

let over20000 = [];
for (const p of products) {
  if (p.price >= 20000) over20000.push(p);
}
console.log(over20000);
console.log(
  'filter:',
  filter(item => item.price >= 20000, products),
);

console.log(
  filter(
    n => n % 2,
    (function* () {
      yield 1;
      yield 2;
      yield 3;
      yield 4;
      yield 5;
    })(),
  ),
);

// reduce

const nums = [1, 2, 3, 4, 5];

let total = 0;
for (const n of nums) {
  total = total + n;
}
console.log(total);

console.log(
  'reduce :',
  reduce((a, b) => a + b, 1, nums),
);
console.log(
  'reduce :',
  reduce((a, b) => a + b, nums),
);

console.log(
  '총 합:',
  reduce((totalPrice, product) => totalPrice + product.price, 0, products),
);

//* 응용
const add = (a, b) => a + b;

console.log(
  '20000원 이하의 상품의 가격 합:',
  reduce(
    add,
    filter(
      price => price <= 20000,
      map(product => product.price, products),
    ),
  ),
);

console.log(
  '20000원 초과 상품 가격 합:',
  reduce(
    add,
    map(
      product => product.price,
      filter(product => product.price > 20000, products),
    ),
  ),
);

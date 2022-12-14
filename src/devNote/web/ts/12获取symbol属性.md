---
icon: edit
date: 2022-10-13
star: true
---

# symbol类型

---

symbol类型值通过Symbol构造函数创建的，可以传参作为唯一标识，只支持string和number类型的参数

```ts
let sym1 = Symbol();
let sym2 = Symbol("key"); // 可选的字符串key
```

这是该数据类型仅有的目的 也就是说每一个Symbol的值都是**不同**的 

```ts
const symbol1 = Symbol();
const symbol2 = Symbol('foo');
const symbol3 = Symbol('foo');
 
console.log(typeof symbol1);
// expected output: "symbol"
 
console.log(symbol2 === 42);
// expected output: false
 
console.log(symbol3.toString());
// expected output: "Symbol(foo)"
 
console.log(Symbol('foo') === Symbol('foo'));
// expected output: false
 
let copyValue1 = 2
let copyValue2 = 2 
console.log(copyValue1,copyValue2,Symbol('foo'),Symbol('foo'),copyValue1==copyValue2,symbol2==symbol3) // 此条件将始终返回 "false"，因为类型 "typeof symbol2" 和 "typeof symbol3" 没有重叠。
//2 2 Symbol(foo) Symbol(foo) true false
```



### 用作对象属性的键

```ts
let sym = Symbol();
let obj = {
  [sym]: "value"
};

console.log(obj[sym]);// value
```

### 使用symbol定义的属性，是不能通过如下方式遍历拿到的

```ts
const symbol1 = Symbol('666')
const symbol2 = Symbol('777')
const obj1= {
   [symbol1]: '小满',
   [symbol2]: '二蛋',
   age: 19,
   sex: '女'
}
// 1 for in 遍历
for (const key in obj1) {
   // 注意在console看key,是不是没有遍历到symbol1
   console.log(key)
}
// 2 Object.keys 遍历
Object.keys(obj1)
console.log(Object.keys(obj1))
// 3 getOwnPropertyNames
console.log(Object.getOwnPropertyNames(obj1))
// 4 JSON.stringfy
console.log(JSON.stringify(obj1))
```

### 获取symbol属性

```tsx
// 1 拿到具体的symbol 属性,对象中有几个就会拿到几个
Object.getOwnPropertySymbols(obj1)
console.log(Object.getOwnPropertySymbols(obj1))
// 2 es6 的 Reflect 拿到对象的所有属性
Reflect.ownKeys(obj1)
console.log(Reflect.ownKeys(obj1))
```


















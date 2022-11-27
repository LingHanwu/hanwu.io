---
icon: edit
date: 2022-10-13
star: true

---


# js-数据类型

---

### 字符串

使用 `string` 定义字符串类型:



```typescript
let myName: string = "Tom";
let myAge: number = 25;

// 模板字符串
let sentence: string = `Hello, my name is ${myName}.
I'll be ${myAge + 1} years old next month.`;
```

编译结果:

```javascript
var myName = 'Tom';
var myAge = 25;
// 模板字符串
var sentence = "Hello, my name is ".concat(myName, ".\nI'll be ").concat(myAge + 1, " years old next month.");
```

### 数值

使用 `number` 定义数值类型:



```typescript
let decLiteral: number = 6;
let hexLiteral: number = 0xf00d;
// ES6 中的二进制表示法
let binaryLiteral: number = 0b1010;
// ES6 中的八进制表示法
let octalLiteral: number = 0o744;
let notANumber: number = NaN;
let infinityNumber: number = Infinity;
```

编译结果:



```javascript
var decLiteral = 6;
var hexLiteral = 0xf00d;
// ES6 中的二进制表示法
var binaryLiteral = 10;
// ES6 中的八进制表示法
var octalLiteral = 484;
var notANumber = NaN;
var infinityNumber = Infinity;
```

其中 `0b1010` 和 `0o744` 是 [ES6 中的二进制和八进制表示法](http://es6.ruanyifeng.com/#docs/number#二进制和八进制表示法)，它们会被编译为十进制数字



### 数组Array

确定一个事实: names是一个数组类型, 但是数组中存放的是什么类型的元素呢?
		  不好的习惯: 一个数组中在TypeScript开发中, 最好存放的数据类型是固定的(string)

```ts

// 类型注解: type annotation
const names1: Array<string> = [] // 不推荐(react jsx中是有冲突   <div></div>)
const names2: string[] = [] // 推荐

// 在数组中存放不同的类型是不好的习惯
// names.push("abc")
// // names.push(123)

```

### Object类型

```ts
const info = {
  name: "xiaoming",
  age: 18
}

console.log(info.name)

```



### NUll和Undefined

在 TypeScript 中，可以使用 `null` 和 `undefined` 来定义这两个原始数据类型:

```typescript
let u: undefined = undefined;
let n: null = null;
```

与 `void` 的区别是，`undefined` 和 `null` 是所有类型的子类型。也就是说 `undefined` 类型的变量，可以赋值给 `number` 类型的变量:



```typescript
// 这样不会报错
let num: number = undefined;
```

```typescript
// 这样也不会报错
let u: undefined;
let num: number = u;
```

而 `void` 类型的变量不能赋值给 `number` 类型的变量:

```typescript
let u: void;
let num: number = u;

// Type 'void' is not assignable to type 'number'.
```



### 布尔值

```typescript
let isDone: boolean = false;
```

注意，使用构造函数 `Boolean` 创造的对象**不是**布尔值:

```typescript
let createdByNewBoolean: boolean = new Boolean(1);
```

事实上 `new Boolean()` 返回的是一个 `Boolean` 对象:

```typescript
let createdByNewBoolean: Boolean = new Boolean(1);
```

直接调用 `Boolean` 也可以返回一个 `boolean` 类型:

```typescript
let createdByBoolean: boolean = Boolean(1);
```

在 TypeScript 中，`boolean` 是 JavaScript 中的基本类型，而 `Boolean` 是 JavaScript 中的构造函数。其他基本类型(除了 `null` 和 `undefined`)一样，不再赘述。



### 枚举类型

枚举类型用于定义数值集合，使用枚举我们可以定义一些带名字的常量。使用枚举可以清晰地表达意图或创建一组有区别的用例。，如周一到周日，方位上下左右等

- 普通枚举

  初始值默认为 0 其余的成员会会按顺序自动增长 可以理解为数组下标

```ts
enum Color {
  RED = 2,
  PINK,
  BLUE,
}
const pink: Color = Color.PINK;
console.log(pink)
```

字符串枚举

```ts
enum Color {
  RED = "红色",
  PINK = "粉色",
  BLUE = "蓝色",
}
 
const pink: Color = Color.PINK;
console.log(pink);
```

常量枚举

```ts
const enum Color {
  RED,
  PINK,
  BLUE,
}
 
const color: Color[] = [Color.RED, Color.PINK, Color.BLUE];
console.log(color); //[0, 1, 2]
 
//编译之后的js如下：
var color = [0 /* RED */, 1 /* PINK */, 2 /* BLUE */];
```



### Symbol类型

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



#### 用作对象属性的键

```ts
let sym = Symbol();
let obj = {
  [sym]: "value"
};

console.log(obj[sym]);// value
```

#### 使用symbol定义的属性，是不能通过如下方式遍历拿到的

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

#### 获取symbol属性

```ts
// 1 拿到具体的symbol 属性,对象中有几个就会拿到几个
Object.getOwnPropertySymbols(obj1)
console.log(Object.getOwnPropertySymbols(obj1))
// 2 es6 的 Reflect 拿到对象的所有属性
Reflect.ownKeys(obj1)
console.log(Reflect.ownKeys(obj1))
```







### 参考

[类型脚本：手册 - 基本类型 (typescriptlang.org)](https://www.typescriptlang.org/docs/handbook/basic-types.html)

[字符串的扩展 - ECMAScript 6入门 (ruanyifeng.com)](https://es6.ruanyifeng.com/#docs/string#模板字符串)


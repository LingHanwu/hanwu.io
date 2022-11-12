---
icon: edit
date: 2022-10-13
star: true
---

# Mixins混入

---



### 对象混入

可以使用es6的`Object.assign` 合并多个对象

此时 `people `会被推断成一个交叉类型 `Name & Age & sex;`

```ts
interface Name {
  name: string
}
interface Age {
  age: number
}
interface Sex {
  sex: number
}

let people1: Name = { name: "小满" }
let people2: Age = { age: 20 }
let people3: Sex = { sex: 1 }

const people = Object.assign(people1,people2,people3)

console.log(people);

```

### 


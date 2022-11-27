# TS-数据类型

### any

在某些情况下，我们确实无法确定一个变量的类型，并且可能它会发生一些变化，这个时候我们可以使用any类型

-  any类型有点像一种讨巧的TypeScript手段：
- 我们可以对any类型的变量进行任何的操作，包括获取不存在的属性、方法；
- 我们给一个any类型的变量赋值任何的值，比如数字、字符串的值

```ts
// 当进行一些类型断言 as any
// 在不想给某些JavaScript添加具体的数据类型时(原生的JavaScript代码是一样)
let message: any = "Hello World"

message = 123
message = true
message = {

}

// message()
// message.split(" ")

console.log(message)
const arr: any[] = []


```



### unknown

unknown是TypeScript中比较特殊的一种类型，它用于描述类型不确定的变量

```ts
function foo() {
  return "abc"
}

function bar() {
  return 123
}

// unknown类型只能赋值给any和unknown类型
// any类型可以赋值给任意类型

let flag = true
let result: unknown // 最好不要使用any
if (flag) {
  result = foo()
} else {
  result = bar()
}

let message: string = result
let num: number = result

console.log(result)

export {}


```





### void

void通常用来指定一个函数是没有返回值的，那么它的返回值就是void类型：

- 我们可以将null和undefined赋值给void类型，也就是函数可以返回null或者undefined
- 这个函数我们没有写任何类型，那么它默认返回值的类型就是void的，我们也可以显示的来指定返回值是void：

### never

 never 表示永远不会发生值的类型，比如一个函数：

- 如果一个函数中是一个死循环或者抛出一个异常，那么这个函数会返回东西吗？
- 不会，那么写void类型或者其他类型作为返回值类型都不合适，我们就可以使用never类型

#### never类型

使用 never 类型来表示不应该存在的状态

```ts
type bbb = string & number
```

```ts
// 返回never的函数必须存在无法达到的终点

// 因为必定抛出异常，所以 error 将不会有返回值
function error(message: string): never {
    throw new Error(message);
}

// 因为存在死循环，所以 loop 将不会有返回值
function loop(): never {
    while (true) {
    }
}
```

#### never 与 void 的差异

```ts
 //void类型只是没有返回值 但本身不会出错
    function Void():void {
        console.log();
    }
 
    //只会抛出异常没有返回值
    function Never():never {
    throw new Error('aaa')
    }
```

#### never 类型的一个应用场景

```ts
function handleMessage(message: string | number | boolean) {
  switch (typeof message) {
    case 'string':
      console.log("string处理方式处理message")
      break
    case 'number':
      console.log("number处理方式处理message")
      break
    case 'boolean':
      console.log("boolean处理方式处理message")
      break
    default:
      const check: never = message
  }
}
```

如果有添加其他类型时，ts会及时反馈

由于任何类型都不能赋值给 `never` 类型的变量，所以当存在进入 `default` 分支的可能性时，TS的类型检查会及时帮我们发现这个问题





### tuple 元组

上面数组类型的方式，只能定义出内部全为同种类型的数组。对于内部不同类型的数组可以使用元组类型来定义

元组（ Tuple ）表示一个已知数量和类型的数组,可以理解为他是一种特殊的数组

```ts
const info: [string, number, number] = ["why", 18, 1.88]
const name = info[0]
console.log(name.length)
```

- 那么tuple和数组有什么区别呢？
  首先，数组中通常建议存放相同类型的元素，不同类型的元素是不推荐放在数组中。（可以放在对象或者元组中）
- 其次，元组中每个元素都有自己特性的类型，根据索引值获取到的值可以确定对应的类型

#### 应用场景

tuple通常可以作为返回的值，在使用的时候会非常的方便

::: code-tabs#shell

@tab any

```ts
// hook: useState
// const [counter, setCounter] = {counter: , setCounter:}

function useState(state: any) {
  let currentState = state
  const changeState = (newState: any) => {
    currentState = newState
  }

  const tuple: [any, (newState: any) => void] = [currentState, changeState]
  return tuple
}

const [counter, setCounter] = useState(10);
setCounter(1000)

const [title, setTitle] = useState("abc")

export {}

```

@tab 优化

```ts
// hook: useState
// const [counter, setCounter] = {counter: , setCounter:}

function useState<T>(state: T) {
  let currentState = state
  const changeState = (newState: T) => {
    currentState = newState
  }
  const info: [string, number] = ["abc", 18]
  const tuple: [T, (newState: T) => void] = [currentState, changeState]
  return tuple
}

const [counter, setCounter] = useState(10);
setCounter(1000)
const [title, setTitle] = useState("abc")
const [flag, setFlag] = useState(true)


// type MyFunction = () => void
// const foo: MyFunction = () => {}


```

:::

### 空值

JavaScript 没有空值(Void)的概念，在 TypeScript 中，可以用 `void` 表示没有任何返回值的函数:



```typescript
function alertName(): void {
  alert("My name is Tom");
}
```

声明一个 `void` 类型的变量没有什么用，因为您只能将它赋值为 `undefined` 和 `null`:



```typescript
let unusable: void = undefined
```


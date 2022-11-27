# 迎接TS

类型带来的问题：

​	首先你需要知道，编程开发中我们有一个共识：**错误出现的越早越好**

 能在**写代码的时候**发现错误，就不要在**代码编译**时再发现（IDE的优势就是在代码编写过程中帮助我们发现错 误）。 

能在**代码编译期间**发现错误，就不要在**代码运行期间**再发现（类型检测就可以很好的帮助我们做到这一点）

 能在**开发阶段**发现错误，就不要在**测试期间**发现错误，能在测试期间发现错误，就不要在上线后发现错

```js
function getLength(str){
	return str.length;

}
getLength("abc")
getLength()  // 错误调用，IDE 不会报错
```



这是我们一个非常常见的错误： 这个错误很大的原因就是因为JavaScript没有对我们**传入的参数进行任何的限制**，只能等到**运行期间**才发现这个错误； 并且当这个错误产生时，会影响后续代码的继续执行，也就是整个项目都因为一个小小的错误而深入崩溃



为了弥补JavaScript类型约束上的缺陷，增加类型约束，很多公司推出了自己的方案

2014年，Facebook推出了flow来对JavaScript进行类型检查； 同年，Microsoft微软也推出了TypeScript1.0版本； 他们都致力于为JavaScript提供类型检查；

而现在，无疑TypeScript已经完全胜出： Vue2.x的时候采用的就是flow来做类型检查； Vue3.x已经全线转向TypeScript，98.3%使用TypeScript进行了重构； 而Angular在很早期就使用TypeScript进行了项目重构并且需要使用TypeScript来进行开发； 而甚至Facebook公司一些自己的产品也在使用TypeScript；



## 认识TS

我们来看一下TypeScript在GitHub和官方上对自己的定义： 

> GitHub说法：TypeScript is a superset of JavaScript that compiles to clean JavaScript output. 
>
> TypeScript官网：TypeScript is a typed superset of JavaScript that compiles to plain JavaScript. 

 翻译一下：TypeScript是拥有类型的JavaScript超集，它可以编译成普通、干净、完整的JavaScript代码。 

怎么理解上面的话呢？

  我们可以将TypeScript理解成加强版的JavaScript。

 JavaScript所拥有的特性，TypeScript全部都是支持的，并且它紧随ECMAScript的标准，所以ES6、ES7、ES8等新语法标准，它都是支持的； 

 并且在语言层面上，不仅仅增加了类型约束，而且包括一些语法的扩展，比如枚举类型（Enum）、元组类型（Tuple）等；TypeScript在实现新特性的同时，总是保持和ES标准的同步甚至是领先； 

 并且TypeScript最终会被编译成JavaScript代码，所以你并不需要担心它的兼容性问题，在编译时也不需要借助于Babel这样的工具； 

 所以，我们可以把TypeScript理解成更加强大的JavaScript，不仅让JavaScript更加安全，而且给它带来了诸多好用的好用特性

**始于JavaScript，归于JavaScript** 

 TypeScript从今天数以百万计的JavaScript开发者所熟悉的语法和语义开始。使用现有的JavaScript代码，包括流行的JavaScript库， 并从JavaScript代码中调用TypeScript代码

 TypeScript可以编译出纯净、 简洁的JavaScript代码，并且可以运行在任何浏览器上、Node.js环境中和任何支持ECMAScript 3（或 更高版本）的JavaScript引擎中； 

 **TypeScript是一个强大的工具，用于构建大型项目** 

 类型允许JavaScript开发者在开发JavaScript应用程序时使用高效的开发工具和常用操作比如静态检查和代码重构； 

 类型是可选的，类型推断让一些类型的注释使你的代码的静态验证有很大的不同。类型让你定义软件组件之间的接口和洞察现有 JavaScript库的行为； 

 **拥有先进的 JavaScript** 

 TypeScript提供最新的和不断发展的JavaScript特性，包括那些来自2015年的ECMAScript和未来的提案中的特性，比如异步功能和 Decorators，以帮助建立健壮的组件； 

 这些特性为高可信应用程序开发时是可用的，但是会被编译成简洁的ECMAScript3（或更新版本）的JavaScript

正是因为有这些特性，TypeScript目前已经在很多地方被应用：

- Angular源码在很早就使用TypeScript来进行了重写，并且开发Angular也需要掌握TypeScript；
- Vue3源码也采用了TypeScript进行重写，在前面阅读源码时我们看到大量TypeScript的语法；
- 包括目前已经变成最流行的编辑器VSCode也是使用TypeScript来完成的；
- 包括在React中已经使用的ant-design的UI库，也大量使用TypeScript来编写；
- 目前公司非常流行Vue3+TypeScript、React+TypeScript的开发模式；
- 包括小程序开发，也是支持TypeScript的



### TS的编译环境

安装命令

```shell
npm install typescript -g
```

查看版本

```shell
tsc --version
```

安装ts-node

```shell
npm install ts-node -g
```

另外ts-node需要依赖 tslib 和 @types/node 两个包：

```shell
npm install tslib @types/node -g
```

现在，我们可以直接通过 ts-node 来运行TypeScript的代码

```shell
ts-node math.ts
```





## 为什么选择 TypeScript

### 增加了代码的可读性和可维护性

TypeScript 增加了代码的可读性和可维护性

- 类型系统实际上是最好的文档，大部分的函数看看类型的定义就可以知道如何使用了
- 可以在编译阶段就发现大部分错误，这总比在运行时候出错好
- 增强了编辑器和 IDE 的功能，包括代码补全、接口提示、跳转到定义、重构等

### TypeScript 非常包容

- TypeScript 是 JavaScript 的超集，`.js` 文件可以直接重命名为 `.ts` 即可

- 即使不显式的定义类型，也能够自动做出[类型推论](https://mrhope.site/code/language/typescript/basics/type-inference.html)
- 可以定义从简单到复杂的几乎一切类型
- 即使 TypeScript 编译报错，也可以生成 JavaScript 文件
- 兼容第三方库，即使第三方库不是用 TypeScript 写的，也可以编写单独的类型文件供 TypeScript 读取

### TypeScript 拥有活跃的社区

- 大部分第三方库都有提供给 TypeScript 的类型定义文件

- Google 开发的 Angular2 就是使用 TypeScript 编写的
- TypeScript 拥抱了 ES6 规范，也支持部分 ESNext 草案的规范

### TypeScript 的缺点

任何事物都是有两面性的，我认为 TypeScript 的弊端在于:

- 有一定的学习成本，需要理解接口(Interfaces)、泛型(Generics)、类(Classes)、枚举类型(Enums)等前端工程师可能不是很熟悉的概念
- 短期可能会增加一些开发成本，毕竟要多写一些类型的定义，不过对于一个需要长期维护的项目，TypeScript 能够减少其维护成本
- 集成到构建流程需要一些工作量
- 可能和一些库结合的不是很完美










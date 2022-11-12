---

---



# Mixin

---

目前我们是使用组件化的方式在开发整个Vue的应用程序，但是组件和组件之间有时候会存在**相同的代码逻辑**，我们希望对相同的代码逻辑进行抽取。 

 在Vue2和Vue3中都支持的一种方式就是使用Mixin来完成： 

- Mixin提供了一种非常灵活的方式，来分发Vue组件中的可复用功能； 
- 一个Mixin对象可以包含任何组件选项； 
- 当组件使用Mixin对象时，所有Mixin对象的选项将被 混合 进入该组件本身的选项中；



### 基本使用

```js
// mixins/demoMixins.js
export const demoMixin = {
  data() {
    return {
      message: "Hello DemoMixin"
    }
  },
  methods: {
    foo() {
      console.log("demo mixin foo");
    }
  },
  created() {
    console.log("执行了demo mixin created");
  }
}
```

```vue
<!-- app.vue -->
<template>
  <div>
    <h2>{{message}}</h2>
    <button @click="foo">按钮</button>
  </div>
</template>

<script>
  import { demoMixin } from './mixins/demoMixin';

  export default {
    mixins: [demoMixin],
    data() {
      return {
        title: "Hello World"
      }
    },
    methods: {

    }
  }
</script>

<style scoped>

</style>
```

### 合并规则



>情况一：
>
>如果是data函数的返回值对象 
>
>返回值对象默认情况下会进行合并； 
>
>如果data返回值对象的属性发生了冲突，那么会保留组件自身的数据； 

> 情况二：
>
> 如何生命周期钩子函数 
>
> 生命周期的钩子函数会被合并到数组中，都会被调用；

>情况三：
>
>值为对象的选项，例如 methods、components 和 directives，将被合并为同一个对象。
>
>比如都有methods选项，并且都定义了方法，那么它们都会生效； 
>
>但是如果对象的key相同，那么会取组件对象的键值对；





### 全局混入

入口函数

```js
app.mixin()
```


























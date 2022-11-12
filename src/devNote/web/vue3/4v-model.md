---
icon: edit
date: 2022-10-20
---

# v-model

---



v-model  在vue3 是破坏性更新，它其实是一个语法糖，通过props和emit组合而成的

对比vue2的变化

默认值的改变

- prop：`value` -> `modelValue`；
- 事件：`input` -> `update:modelValue`；
- `v-bind` 的 `.sync` 修饰符和组件的 `model` 选项已移除
- 新增 支持多个v-model
- 新增 支持自定义 修饰符 Modifiers



v-model原理

​	v-bind绑定value属性的值； 

​	pv-on绑定input事件监听到函数中，函数会获取最新的值赋值到绑定的属性中

[组件事件](https://cn.vuejs.org/guide/components/events.html#usage-with-v-model)



---





父

```vue
<VModel v-model="isShow"></VModel>
```

子

```vue
<div>{{ propData.modelValue}} </div>
```

```ts
type Props = {
   modelValue:boolean
}
const propData = defineProps<Props>()
```

 

父组件控制弹框，子组件可单独关闭弹框并修改值传递给父组件

```vue
<template>
  <h1>我是App.vue的父组件</h1>
  <div>isShow: {{isShow}}</div>
  <div><button button @click="isShow = !isShow">开关</button></div>

  <hr>
  <VModel v-model="isShow"></VModel>

</template>
<script setup lang='ts'>
import VModel from "./components/vModel/index.vue";
const isShow = ref<boolean>(true)


</script>
<style lang='less' scoped>

</style>
```

```vue
<template>
  <div>vmodel组件</div>
  <div v-if="modelValue" class="model">
    <div>{{ modelValue}} </div>
    <div class="close">
      <button @click="close">关闭子组件</button>
      <h3>我是v-model子组件</h3>
      <div>内容: <input type="text"></div>
    </div>
  </div>
</template>
<script setup lang='ts'>




const propData = defineProps<{
  modelValue: boolean
}>()


const emit = defineEmits(['update:modelValue'])

const close = () => {
  emit('update:modelValue', false)
}


</script>
<style lang='less' scoped>

</style>
```



---

### 绑定多个v-model



发送

```ts
  <VModel v-model="isShow" v-model:textVal="text"></VModel>
```

接收

```ts
const propData = defineProps<{
  modelValue: boolean,
  textVal: string
}>()

```

### 输入框值传给父组件

```vue
<div>内容: <input type="text" @input="change" :value="textVal"></div>
```



```ts
const emit = defineEmits(['update:textVal'])
const change = (e: Event) => {
  const target = e.target as HTMLInputElement
  emit('update:textVal', target.value)
}

```

### v-model修饰符

#### lazy

默认情况下，v-model在进行双向绑定时，绑定的是input事件，那么会在每次内容输入后就将最新的值和绑定

的属性进行同步； 

如果我们在v-model后跟上lazy修饰符，那么会将绑定的事件切换为 change 事件，只有在提交时（比如回车） 

才会触发；

#### number

默认v-model 的值总是string，在进行逻辑判断时，如果是一个string类型，在可以转化的情况下会进行隐式转换的

#### trim

如果要自动过滤用户输入的首尾空白字符，可以给v-model添加 trim 修饰符







### 自定义v-model修饰符

我们来创建一个自定义的修饰符 `capitalize`，它会自动将 `v-model` 绑定输入的字符串值第一个字母转为大写：

```vue
<VModel v-model.capitalize="myText"></VModel>
```



组件的 `v-model` 上所添加的修饰符，可以通过 `modelModifiers` prop 在组件内访问到。在下面的组件中，我们声明了 `modelModifiers` 这个 prop，它的默认值是一个空对象：

```ts
const props = defineProps({
  modelValue: String,
  modelModifiers: {
    default: () => ({})
  }
})
```

注意这里组件的 `modelModifiers` prop 包含了 `capitalize` 且其值为 `true`，因为它在模板中的 `v-model` 绑定上被使用了。

有了 `modelModifiers` 这个 prop，我们就可以在原生事件侦听函数中检查它的值，然后决定触发的自定义事件中要向父组件传递什么值。在下面的代码里，我们就是在每次 `<input>` 元素触发 `input` 事件时将值的首字母大写：

```ts
const emit = defineEmits(['update:modelValue'])

const emitValue = (e: Event) => {
  const target = e.target as HTMLInputElement
  let value = target.value
  if (props.modelModifiers.capitalize) {
    value = value.charAt(0).toUpperCase() + value.slice(1)
  }
  emit('update:modelValue', value)
}
```



对于又有参数又有修饰符的 `v-model` 绑定，生成的 prop 名将是 `arg + "Modifiers"`

```vue
<MyComponent v-model:title.capitalize="myText">
```

```ts
const props = defineProps(['title', 'titleModifiers'])
defineEmits(['update:title'])

console.log(props.titleModifiers) // { capitalize: true }

```
















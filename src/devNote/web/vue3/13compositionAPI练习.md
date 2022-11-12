---
icon: edit
date: 2022-10-22
---



# compositionAPI

---

## 抽离模块

### 计数器案例

传统vue开发：代码分离，阅读性差，复用性低

```vue
<template>
  <div>
    <h2>当前计数：{{ counter}}</h2>
    <h2>计数*2: {{ doubleCounter}}</h2>

    <button @click="increment">+1</button>
    <button @click="decrement">-1</button>

  </div>
</template>
<script>
export default {
  data() {
    return {
      counter: 0
    }
  },
  computed:{
    doubleCounter(){
      return this.counter * 2
    }
  },
  methods:{
    increment(){
      this.counter++
    },
    decrement(){
      this.counter--
    }
  }
}


</script>
<style lang='less' scoped>

</style>
```



### compositionAPI改善

```vue
<template>
  <div>
    <h2>当前计数：{{ counter}}</h2>
    <h2>计数*2: {{ doubleCounter}}</h2>

    <button @click="increment">+1</button>
    <button @click="decrement">-1</button>

  </div>
</template>
<script>
import { ref, computed } from 'vue'
export default {
  setup() {
    const counter = ref(0);
    const doubleCounter = computed(() => counter.value * 2)

    const increment = () => counter.value++;
    const decrement = () => counter.value--;

    return {
      counter,
      doubleCounter,
      increment,
      decrement
    }
  }
}

</script>
<style lang='less' scoped>

</style>
```

社区约定将代码抽离出hook 使用 use 前缀命名

​			[hook](https://zhuanlan.zhihu.com/p/486496578)是react的写法



```js
// hooks/useCounter.js
import { ref, computed } from 'vue'
export default function () {
  const counter = ref(0);
  const doubleCounter = computed(() => counter.value * 2)

  const increment = () => counter.value++;
  const decrement = () => counter.value--;

  return {
    counter,
    doubleCounter,
    increment,
    decrement
  }
}
```



```ts
// App.vue
<script>
import useCounter from './hooks/useCounter.js'
export default {

  setup() {
    const { counter, doubleCounter, increment, decrement } = useCounter()
    return {
      counter,
      doubleCounter,
      increment,
      decrement
    }
  }
}
</script>
```



---

### useTitle

更改标题

```ts
// useTitle.js
import { ref, watch } from 'vue'
export default function (title = "默认的title") {
  const titleRef = ref(title)
  watch(titleRef, (newValue) => {
    document.title = newValue
  }, {
    immediate: true
  })
  return titleRef
}
```



```ts
//app.vue
const titleRef = useTitle("hanwu")

```

---

### useScrollpotision

获取滚动条位置

```js
import { ref } from 'vue';

export default function() {
  const scrollX = ref(0);
  const scrollY = ref(0);

  document.addEventListener("scroll", () => {
    scrollX.value = window.scrollX;
    scrollY.value = window.scrollY;
  });

  return {
    scrollX,
    scrollY
  }
}

```

### useMousePosition

获取鼠标位置

```js
import { ref } from 'vue';

export default function() {
  const mouseX = ref(0);
  const mouseY = ref(0);

  window.addEventListener("mousemove", (event) => {
    mouseX.value = event.pageX;
    mouseY.value = event.pageY;
  });

  return {
    mouseX,
    mouseY
  }
}

```

### useLocalStorage

缓存数据保存与修改

```js
import { ref, watch } from 'vue';

export default function(key, value) {
  const data = ref(value);
  // 是否有value，有做保存操作，没有做获取操作
  if (value) {
    window.localStorage.setItem(key, JSON.stringify(value));
  } else {
    data.value = JSON.parse(window.localStorage.getItem(key));
  }

  watch(data, (newValue) => {
    window.localStorage.setItem(key, JSON.stringify(newValue));
  })

  return data;
}

// 一个参数: 取值
// const data = useLocalStorage("name");

// // 二个参数: 保存值
// const data = useLocalStorage("name", "coderwhy");

// data.value = "kobe";

```

统一出口

hooks/index.js

```js
import useCounter from './useCounter';
import useTitle from './useTitle';
import useScrollPosition from './useScrollPosition';
import useMousePosition from './useMousePosition';
import useLocalStorage from './useLocalStorage';

export {
  useCounter,
  useTitle,
  useScrollPosition,
  useMousePosition,
  useLocalStorage
}
```





## setup顶层编写方式

```vue
<!-- app.vue -->
<template>
  <div>
    <h2>当前计数: {{counter}}</h2>
    <button @click="increment">+1</button>

    <hello-world message="呵呵呵" @increment="getCounter"></hello-world>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import HelloWorld from './HelloWorld.vue';

  const counter = ref(0);
  const increment = () => counter.value++;

  const getCounter = (payload) => {
    console.log(payload);
  }
</script>

<style scoped>

</style>
```

```vue
<!-- HelloWorld.vue -->
<template>
  <div>
    <h2>Hello World</h2>
    <h2>{{message}}</h2>
    <button @click="emitEvent">发射事件</button>
  </div>
</template>

<script setup>
const props = defineProps({
  message: {
    type: String,
    default: "哈哈哈"
  }
})

const emit = defineEmits(["increment", "decrement"]);

const emitEvent = () => {
  emit('increment', "100000")
}

</script>

<style scoped>

</style>
```




































































































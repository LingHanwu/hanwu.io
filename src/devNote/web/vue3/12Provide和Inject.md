---
icon: edit
date: 2022-10-22
---

---

# Provide和inject

---

**Composition API使用 Provide 和 Inject** 

使用provider方法来提供数据

​	可以通过 provide 方法来定义每个 Property

provide可以传入两个参数 

- name：提供的属性名称
- value：提供的属性值

```ts
const name = ref("hanwu");
provide("name", name);
```

在 后代组件中可以通过 inject 来注入需要的属性和对应的值：

 可以通过 inject 来注入需要的内容； 

pinject可以传入两个参数： 

-  inject 的 property 的 name
- 默认值

```ts
const name = inject("name");
```



### 修改响应式Property

尽可能开发时，符合单项数据流开发规范

如果我们需要修改可响应的数据，那么最好是在数据提供的位置来修改

我们可以将修改方法进行共享，在**后代组件**中进行调用



```ts
provide("name", readonly(name));
```


















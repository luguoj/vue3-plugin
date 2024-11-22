# VueNode Vue组件节点

:::preview
demo-preview=./VueNode.vue
:::


### 参数注入

- style.component 可使用函数实现组件渲染和data注入，此函数本身没有响应性重绘的能力，需要通过graph.setNodeData重新设置节点数据来触发重绘
- data不可使用响应式对象，但是其属性可接受响应式对象，组件通过监听注入的响应式对象的属性可实现响应式更新
- 如果在节点数据中通过style.component配置组件，没有data参数

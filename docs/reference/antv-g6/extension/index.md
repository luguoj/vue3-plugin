# 使用扩展
注意最好不要在VUE组件生命中周期中注册扩展，以避免重复注册

## 注册自定义扩展

```ts
import {PsrAntvG6} from "@psr-framework/vue3-plugin";
import {Line} from "@antv/g6";

// 自定义扩展类型
class MyLine extends Line {}

const edgeType = PsrAntvG6.register(
    // 扩展类型
    'edge',
    // 扩展类型构造函数
    MyLine
)
```

## 使用钩子扩展并注册元素类型

支持节点，边，组合类型的元素扩展


```ts
import {PsrAntvG6} from "@psr-framework/vue3-plugin";
const edgeType = PsrAntvG6.registerElement(
    // 元素类型
    'edge',
    // 基础类型构造函数
    Line,
    {
        // 应用元素钩子
        elHooksBuilders: [
            PsrAntvG6.ElementHooksBuilders.Edge.useAntLineAnimation()
        ]
    }
)
```
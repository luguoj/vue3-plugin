# Vue 3 插件 Antv G6

## 边类型

### 动画边

```ts
PsrAntvG6.useEdgeWithAnimation = (options: {
    edge: PsrAntvG6Types.EdgeType, // 基础边类型
    animations: {
        type: PsrAntvG6Types.EdgeAnimationType, // 动画类型
        cfg?: any // 动画配置项
    }[] // 边类型字符串
}) => string
```

- 定义配置项

1. 动画配置项animations.cfg

- ArrowRunning 跑动箭头

| 参数       | 描述   | 默认值     |
|:---------|:-----|:--------|
| stroke   | 线条样式 | #3370ff |
| fill     | 填充色  | #fff    |
| duration | 动画时长 | 3000    |
| repeat   | 是否重放 | true    |

- CircleRunning 跑动圆形

| 参数       | 描述   | 默认值     |
|:---------|:-----|:--------|
| radius   | 圆形半径 | 3       |
| stroke   | 线条样式 | #3370ff |
| fill     | 填充色  | #fff    |
| duration | 动画时长 | 3000    |
| repeat   | 是否重放 | true    |

- LineDash 虚线

| 参数       | 描述    | 默认值          |
|:---------|:------|:-------------|
| lineDash | 虚线段模式 | [4, 2, 1, 2] |
| duration | 动画时长  | 3000         |

- LineGrowth 画线

| 参数       | 描述   | 默认值  |
|:---------|:-----|:-----|
| duration | 动画时长 | 2000 |
| repeat   | 是否重放 | true |

## 节点类型

### vue组件节点

```ts
PsrAntvG6.useVueNode = (options: {
    component: ComponentOptions // vue组件定义
}) => string // 节点类型字符串
```

- 数据项目配置项

1. data:  UnwrapNestedRefs
   响应式数据对象，字段值会自动注入到配置的vue组件属性中，并响应式更新，只支持string | number | boolean类型
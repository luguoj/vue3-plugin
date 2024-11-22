# 内置边钩子

## FlyMarker 飞行标记

- 选项：

| 参数               | 描述                                                                 | 默认值                                                        |
|:-----------------|:-------------------------------------------------------------------|:-----------------------------------------------------------|
| stateKey         | 运行状态属性关键字, 在边样式中设置对应的属性值切换动画状态                                     |                                                            |
| markerKey        | 标记形状关键字, 用于在组成边元素的形状中索引                                            |                                                            |
| shape            | 标记形状选项                                                             | ```{type: Circle, attributes: {r: 10, fill: '#c3d5f9'}}``` |
| shape.type       | 标记形状类型, 注意此类型须使用 DisplayObject 子类型(可从@antv/g库中获取), 而不是@antv/g6元素类型 |                                                            |
| shape.attributes | 标记形状属性                                                             |                                                            |
| keyframes        | 动画关键帧                                                              | ```[{offsetDistance: 0}, {offsetDistance: 1},]```          |
| options          | 动画选项                                                               | ```{duration: 3000, iterations: Infinity}```               |

:::preview
demo-preview=./FlyMarkerEdge.vue
:::

## AntLine 蚂蚁线

- 选项：

| 参数        | 描述                             | 默认值                                                |
|:----------|:-------------------------------|:---------------------------------------------------|
| stateKey  | 运行状态属性关键字, 在边样式中设置对应的属性值切换动画状态 |                                                    |
| lineDash  | 虚线段模式                          | ```[10, 10]```                                     |
| keyframes | 动画关键帧                          | ```[{lineDashOffset: -20}, {lineDashOffset: 0}]``` |
| options   | 动画选项                           | ```{duration: 500, iterations: Infinity}```        |

:::preview
demo-preview=./AntLineEdge.vue
:::

## LineGrowth 画线动效

- 类型：line-growth
- 配置：

| 参数       | 描述   | 默认值  |
|:---------|:-----|:-----|
| duration | 动画时长 | 2000 |
| repeat   | 是否重放 | true |


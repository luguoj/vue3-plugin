# 图形扩展

## 使用元素扩展钩子扩展基础类型并注册新类型

注意最好不要在VUE组件生命中周期中注册类型，以免重复注册

```ts
const edgeType = PsrAntvG6.registerElementWithHooks(
    'edge',
    // 基础类型
    Line,
    // 元素扩展钩子
    [
        PsrAntvG6.Edges.Animations.FlyMarker.useHooks({...})
    ]
)
```
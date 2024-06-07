# 图形扩展

## 节点扩展

```ts
const nodeType = PsrAntvG6.useNodeWithExtensions({
    extendShape: 'rect', // 基础节点类型
    extensions: [
        {
            type: 'svg-overlay', // 扩展类型
            cfg: {} // 扩展配置项
        }
    ]
})
```

## 边扩展

```ts
const edgeType = PsrAntvG6.useEdgeWithExtensions({
    extendShape: 'line', // 基础边类型
    extensions: [
        {
            type: 'line-dash', // 扩展类型
            cfg: {} // 扩展配置项
        }
    ]
})
```
# 安装设置

## 1. 初始化高德地图上下文

```ts
// 构造全局AMap上下文插件，加载AMap JS API
const amapCtx = PsrAMapContext.create({
    key: "替换为你申请的 key", //申请好的 Web 端开发 Key，首次调用 load 时必填
    version: "2.0", //指定要加载的 JS API 的版本，缺省时默认为 1.4.15
    plugins: ["AMap.Scale"], //需要使用的的插件列表，如比例尺'AMap.Scale'，支持添加多个如：['AMap.Scale','...','...']
    AMapUI: {
        //是否加载 AMapUI，缺省不加载
        version: "1.1", //AMapUI 版本
        plugins: ["overlay/SimpleMarker"], //需要加载的 AMapUI ui 插件
    },
    Loca: {
        //是否加载 Loca， 缺省不加载
        version: "2.0", //Loca 版本
    },
});
// 在应用实例范围提供上下文插件
createApp(App).use(amapCtx).mount('#app')
```

## 2. 使用API渲染地图

:::preview
demo-preview=./RenderMapByApi.vue
:::

## 3. 使用组件渲染地图

:::preview
demo-preview=./RenderMapByComponent.vue
:::
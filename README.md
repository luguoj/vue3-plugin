# vue3-plugin-amap

高德地图AMap JSAPI vue3.x组件

## 安装

```shell
npm i @psr-framework/vue3-plugin-amap
```

## 全局注册

```ts
import "@psr-framework/vue3-plugin-amap/style.css"
import PsrVue3AMapPlugin from "@psr-framework/vue3-plugin-amap";

const app = createApp(App).use(PsrVue3AMapPlugin).mount('#app')
```

## 按需注册

```ts
import "@psr-framework/vue3-plugin-amap/style.css"
import {PsrVue3AMap} from "@psr-framework/vue3-plugin-amap";
```

## 属性

1. mapKey 高德地图API访问密钥 必填
2. mapLogo 是否显示高德地图logo 默认值true
3. mapCenter 视图中心经纬度 { lng: number, lat: number }
4. mapZoom 视图缩放级别 默认值5
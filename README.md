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

## 组件
### PsrVue3AMap 地图
#### 属性
1. mapKey 高德地图API访问密钥 必填
2. mapLogo 是否显示高德地图logo 默认值true
3. mapCenter 视图中心经纬度 { lng: number, lat: number }
4. mapZoom 视图缩放级别 默认值5
5. mapLayerBuildings 启用建筑图层 默认值false

#### 插槽
1. 默认 属性(map: AMap.Map 地图对象)

### PsrVue3AMapMarker 点标记
属性
1. map 地图对象
2. marker-position 位置经纬度
3. marker-title 标题文本
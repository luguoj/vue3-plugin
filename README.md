# vue3-plugin-amap

高德地图AMap JSAPI vue3.x组件

## 安装

```shell
npm i @psr-framework/vue3-plugin-amap
```

## 全局注册

```ts
import "@psr-framework/vue3-plugin-amap/style.css"
import {PsrVue3AMapPlugin} from "@psr-framework/vue3-plugin-amap";

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

#### 导出

1. map: AMap.Map 地图对象

### PsrVue3AMapMarker 点标记

#### 属性

1. markerMap 地图对象
2. markerPosition 位置经纬度
3. markerTitle 标题文本
4. markerVisible 可见性
5. markerDraggable 可拖拽
6. markerLabel 标签文本
7. markerLabelDirection 标签方向
8. markerLabelOffset 标签偏移
9. markerCustom 自定义内容 默认值false

#### 插槽

1. 默认 自定义内容

#### 导出

1. marker: AMap.Marker 标记对象

### PsrVue3AMapMarkerCluster 点聚合

#### 属性

1. markerMap 地图对象
2. clusterData 聚合数据
3. clusterGridSize 聚合网格大小 默认值60
4. clusterMaxZoom 聚合最大放大级别 默认值18
5. clusterAverageCenter 是否使用平均中心 默认值true
6. clusterStyles 聚合样式
7. clusterCustomMarker 自定义未聚合标记

#### 插槽

1. marker(data) 自定义未聚合标记内容，插槽属性data：标记对应的聚合数据元素

#### 导出

1. markerCluster: AMap.MarkerCluster 标记聚合对象

### PsrVue3AMapLayerBuildings 建筑图层

#### 属性

1. mapKey 高德地图API访问密钥 必填
2. buildingsWallColor 墙壁颜色
3. buildingsRoofColor 屋顶颜色
4. buildingsOpacity 透明度 默认值1
5. buildingsZoomMin 显示建筑的缩放级别下限 默认值2
6. buildingsZoomMax 显示建筑的缩放级别上限 默认值20
7. buildingsVisible 可见性

#### 导出

1. buildings: AMap.Buildings 建筑图层对象

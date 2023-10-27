# vue3-plugin-echarts
Apache Echarts vue3.x组件

## 安装

```shell
npm i @psr-framework/vue3-plugin-echarts
```

## 全局注册

```ts
import {PsrVue3EchartsPlugin} from "@psr-framework/vue3-plugin-echarts";

const app = createApp(App).use(PsrVue3EchartsPlugin).mount('#app')
```

## 按需注册

```ts
import {PsrVue3Echarts} from "@psr-framework/vue3-plugin-echarts";
```

## 组件

### PsrVue3Echarts 地图

#### 属性

1. chartDarkTheme 深色主题 默认值false
2. chartOptions 图标配置项

#### 导出

1. echarts: EChartsType echarts实例对象
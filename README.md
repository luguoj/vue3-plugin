# Vue 3 插件 Antv G6

## 图形扩展

### 节点扩展

```ts
// 返回新的节点类型
const edgeType = PsrAntvG6.useNodeWithExtensions({
    extendShape: 'rect', // 基础节点类型
    extensions: [
        {
            type: 'svg-overlay', // 扩展类型
            cfg: {} // 扩展配置项
        }
    ]
})
```

### 边扩展

```ts
// 返回新的边类型
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

### 扩展类型

#### 边

##### ArrowRunning 跑动箭头动效

类型
> arrow-running

| 参数       | 描述   | 默认值     |
|:---------|:-----|:--------|
| stroke   | 线条样式 | #3370ff |
| fill     | 填充色  | #fff    |
| duration | 动画时长 | 3000    |
| repeat   | 是否重放 | true    |

##### CircleRunning 跑动圆形动效

类型
> circle-running

| 参数       | 描述   | 默认值     |
|:---------|:-----|:--------|
| radius   | 圆形半径 | 3       |
| stroke   | 线条样式 | #3370ff |
| fill     | 填充色  | #fff    |
| duration | 动画时长 | 3000    |
| repeat   | 是否重放 | true    |

##### LineDash 虚线动效

类型
> line-dash

| 参数       | 描述    | 默认值          |
|:---------|:------|:-------------|
| lineDash | 虚线段模式 | [4, 2, 1, 2] |
| duration | 动画时长  | 3000         |

##### LineGrowth 画线动效

类型
> line-growth

| 参数       | 描述   | 默认值  |
|:---------|:-----|:-----|
| duration | 动画时长 | 2000 |
| repeat   | 是否重放 | true |

#### 节点

##### el覆盖层

用于在节点最上层覆盖el元素，可接受自定义元素标签，将vue组件注册为自定义元素标签则可实现覆盖vue组件。
为了实现节点默认鼠标事件，覆盖的el元素默认样式不接受鼠标指针事件

类型
> el-overlay

| 参数  | 描述      | 默认值 |
|:----|:--------|:----|
| tag | 覆盖的el标签 | div |

###### 参数注入

通过配置节点配置项的data属性可实现参数注入
data属性的字段将自动以驼峰转连字符的形式转换为覆盖层EL元素的属性
data可接受非包装的响应式对象（使用reactive创建的响应式对象），可实现响应式更新
data仅支持string|number|boolean类型的属性字段

##### svg覆盖层

用于在节点最上层覆盖svg元素

类型
> svg-overlay

| 参数         | 描述               | 默认值   |
|:-----------|:-----------------|:------|
| size       | 实际渲染大小           | 20    |
| position   | 渲染位置(相对于基础图形左上角) | [0,0] |
| designSize | svg图形的设计大小       | 20    |
| paths      | svg图形定义          | []    |

##### 圆形缩放动效

仅能支持有半径属性r的基础图形，通过缩放r值实现动效

类型
> circle-scale

| 参数       | 描述   | 默认值  |
|:---------|:-----|:-----|
| diffSize | 缩放尺寸 | 10   |
| duration | 动画时长 | 3000 |

##### 圆形阴影动效

为图形增加环形的背景阴影
环形内径为图形size或size向量的第一维度

类型
> circle-shadow

| 参数       | 描述       | 默认值  |
|:---------|:---------|:-----|
| diffSize | 阴影环内外径差值 | 10   |
| duration | 动画时长     | 3000 |
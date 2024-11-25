# 内置节点钩子

## 呼吸动效节点

:::preview
demo-preview=./BreathingNode.vue
:::

- 选项：

| 参数                 | 描述                             | 默认值                                                                  |
|:-------------------|:-------------------------------|:---------------------------------------------------------------------|
| stateKey           | 运行状态属性关键字, 在边样式中设置对应的属性值切换动画状态 |                                                                      |
| breathingHaloWidth | 呼吸光环宽度                         | 5                                                                    |
| options            | 动画选项                           | ```{duration: 1000, iterations: Infinity, direction: 'alternate'}``` |

## 涟漪节点

:::preview
demo-preview=./RippleNode.vue
:::

- 选项：

| 参数           | 描述                             | 默认值                                                                                                                                  |
|:-------------|:-------------------------------|:-------------------------------------------------------------------------------------------------------------------------------------|
| stateKey     | 运行状态属性关键字, 在边样式中设置对应的属性值切换动画状态 |                                                                                                                                      |
| rippleWidth  | 涟漪宽度                           | 5                                                                                                                                    |
| rippleLength | 涟漪层数                           | 5                                                                                                                                    |
| options      | 每一层涟漪的动画选项函数                   | ```({rippleLength, index}) => ({duration: 1000 * rippleLength, iterations: Infinity, delay: 1000 * index, easing: 'ease-cubic'})}``` |




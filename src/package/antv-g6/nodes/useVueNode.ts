import {mix} from '@antv/util';
import {IShapeBase, NodeConfig, registerNode} from "@antv/g6";
import {ShapeAttrs} from "@antv/g-base/lib/types";
import {ComponentOptions, defineCustomElement, watch} from "vue";

export function useVueNode(options: {
    id: number
    component: ComponentOptions
}) {
    const shapeType = 'vue-node-' + options.id
    customElements.define(shapeType, defineCustomElement(options.component))
    registerNode(
        shapeType,
        {
            afterDraw(cfg, group, rest) {
                const me: IShapeBase | any = this
                const style = me.getVueShapeStyle(cfg!);
                group!.addShape('dom', {
                    attrs: style,
                    className: `${me.type}-keyShape`,
                    name: `${me.type}-keyShape`,
                    draggable: true,
                });
                if (cfg?.data) {
                    watch(cfg.data, (data: any) => {
                        for (const dataKey in data) {
                            group?.getChildren()[2].get('el').children[0].setAttribute(dataKey.replace(/([a-z])([A-Z])/, '$1-$2').toLowerCase(), data[dataKey])
                        }
                    }, {immediate: true, deep: true})
                }
            },
            getVueShapeStyle(cfg: NodeConfig): ShapeAttrs {
                const me: IShapeBase | any = this
                const {style: defaultStyle} = me.mergeStyle || me.getOptions(cfg) as NodeConfig;
                // 如果设置了color，则覆盖默认的stroke属性
                const style = mix({}, defaultStyle);
                const size = me.getSize!(cfg);
                const width = style.width || size[0];
                const height = style.height || size[1];
                console.log('create shape')
                return {
                    x: -width / 2,
                    y: -height / 2,
                    width,
                    height,
                    style: 'pointer-events:none;',
                    ...style,
                    html: (attr: { data: any }) => {
                        const el: HTMLElement = document.createElement(shapeType)
                        const data = cfg.data as any
                        for (const dataKey in data) {
                            el.setAttribute('style', 'pointer-events:none;')
                            el.setAttribute(dataKey.replace(/([a-z])([A-Z])/, '$1-$2').toLowerCase(), data[dataKey])
                        }
                        return el
                    }
                };
            }
        },
        'rect',
    );
    return shapeType
}
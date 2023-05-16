import {ShapeExtensionHandler, ShapeExtensionHandlerBuilder} from "../utils/ShapeExtensionHandler.ts";
import {IShape} from "@antv/g-base";
import {IGroup, IShapeBase, ModelConfig, NodeConfig} from "@antv/g6";
import {watch} from "vue";
import {ShapeAttrs} from "@antv/g-base/lib/types";
import {mix} from "@antv/util";

export const ElOverlayBuilder: ShapeExtensionHandlerBuilder<ElOverlayCfg> = {
    type() {
        return 'el-overlay'
    },
    build(cfg?: Partial<ElOverlayCfg>): ShapeExtensionHandler<ElOverlayCfg> {
        return new ElOverlayHandler(this.type(), cfg)
    }
}
export type ElOverlayCfg = {
    tag: string
}

export class ElOverlayHandler extends ShapeExtensionHandler<ElOverlayCfg> {

    defaultCfg(): ElOverlayCfg {
        return {
            tag: 'div',
        }
    }

    init(shape: any, cfg?: ModelConfig, group?: IGroup, rst?: IShape) {
        super.init(shape, cfg, group, rst);
        const me: IShapeBase | any = this.shape
        const style = this.getVueShapeStyle(cfg!);
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
    }

    getVueShapeStyle(cfg: ModelConfig): ShapeAttrs {
        const me: IShapeBase | any = this.shape
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
                const el: HTMLElement = document.createElement(this.extensionCfg.tag)
                const data = cfg.data as any
                for (const dataKey in data) {
                    el.setAttribute('style', 'pointer-events:none;')
                    el.setAttribute(dataKey.replace(/([a-z])([A-Z])/, '$1-$2').toLowerCase(), data[dataKey])
                }
                return el
            }
        };
    }

}
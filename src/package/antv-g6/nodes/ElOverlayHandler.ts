import {ShapeExtensionHandler, ShapeExtensionHandlerBuilder} from "../utils/ShapeExtensionHandler.ts";
import {IShape} from "@antv/g-base";
import {IGroup, ModelConfig, NodeConfig, ShapeOptions} from "@antv/g6";
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

    init(shape: ShapeOptions, cfg?: ModelConfig, group?: IGroup, rst?: IShape) {
        super.init(shape, cfg, group, rst);
        const style = this.getElStyle(shape, cfg!);
        group!.addShape('dom', {
            attrs: style,
            className: `${shape.type}-keyShape`,
            name: `${shape.type}-keyShape`,
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

    getElStyle(shape: ShapeOptions, cfg: ModelConfig): ShapeAttrs {
        const {style: defaultStyle} = shape.mergeStyle || shape.getOptions(cfg) as NodeConfig;
        // 如果设置了color，则覆盖默认的stroke属性
        const style = mix({}, defaultStyle);
        const size = shape.getSize!(cfg);
        const width = style.width || size[0];
        const height = style.height || size[1];
        return {
            width,
            height,
            style: `pointer-events:none;transform:translateX(${-width / 2}px) translateY(${-height / 2}px)`,
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
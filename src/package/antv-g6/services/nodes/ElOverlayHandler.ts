import {watch} from "vue";
import * as G6Ns from "@antv/g6";
import mix from "@antv/util/esm/mix";
import {ShapeAttrs} from "@antv/g-base/esm";
import {ShapeExtensionHandler, ShapeExtensionHandlerBuilder} from "../utils/ShapeExtensionHandler";

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

    init(
        G6: typeof G6Ns,
        shape: G6Ns.ShapeOptions | any,
        cfg: G6Ns.ModelConfig,
        group: G6Ns.IGroup,
        rst: G6Ns.IShape,
        state: any
    ) {
        super.init(G6, shape, cfg, group, rst, state);
        // 添加DOM类型形状（以foreignObject标签挂载到svg-g标签下）
        const attrs = this.getElAttrs(shape, cfg!);
        const domShape = group!.addShape('dom', {
            attrs,
            className: `${shape.type}-keyShape`,
            name: `${shape.type}-keyShape`,
            draggable: true
        });
        const domShapeEl = domShape.get('el') as SVGForeignObjectElement
        if (cfg?.data) {
            // TODO 需在EL从文档卸载时，取消监听，附加时重新添加监听
            // 监听配置属性变化，更新标签元素属性值
            watch(cfg.data, (data: any) => {
                for (const dataKey in data) {
                    domShapeEl.children[0].setAttribute(dataKey.replace(/([a-z])([A-Z])/, '$1-$2').toLowerCase(), data[dataKey])
                }
            }, {immediate: true, deep: true})
        }
    }

    /**
     * 获取foreignObject元素样式
     */
    getElAttrs(shape: G6Ns.ShapeOptions, cfg: G6Ns.ModelConfig): ShapeAttrs {
        const {style: defaultStyle} = shape.mergeStyle || shape.getOptions(cfg) as G6Ns.NodeConfig;
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
            // 在foreignObject下挂载配置的标签元素
            html: () => {
                // 创建配置的标签元素
                const el: HTMLElement = document.createElement(this.extensionCfg.tag)
                // 属性初始值赋值
                const data = cfg.data as any
                for (const dataKey in data) {
                    el.setAttribute(dataKey.replace(/([a-z])([A-Z])/, '$1-$2').toLowerCase(), data[dataKey])
                }
                return el
            }
        };
    }

}
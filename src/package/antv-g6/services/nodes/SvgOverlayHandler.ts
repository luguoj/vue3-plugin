import * as G6Ns from "@antv/g6";
import {ShapeExtensionHandler, ShapeExtensionHandlerBuilder} from "../utils/ShapeExtensionHandler.ts";

export const SvgOverlayBuilder: ShapeExtensionHandlerBuilder<SvgOverlayCfg> = {
    type() {
        return 'svg-overlay'
    },
    build(cfg?: Partial<SvgOverlayCfg>): ShapeExtensionHandler<SvgOverlayCfg> {
        return new SvgOverlayHandler(this.type(), cfg)
    }
}
export type SvgOverlayCfg = {
    size?: [number, number] | number
    position?: [number, number]
    designSize: [number, number] | number
    paths: string[]
}

export class SvgOverlayHandler extends ShapeExtensionHandler<SvgOverlayCfg> {

    defaultCfg(): SvgOverlayCfg {
        return {
            size: 20,
            position: [0, 0],
            designSize: 20,
            paths: []
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
        const {style: defaultStyle} = shape.mergeStyle || shape.getOptions(shape.cfg) as G6Ns.NodeConfig;
        const {paths, designSize, size, position} = this.extensionCfg
        const shapeSize = shape.getSize()
        const _designSize = toVector(designSize)
        const _size = toVector(size || 20)
        const shapes: G6Ns.IShape[] = []
        const scale = Math.min(_size[0] / _designSize[0], _size[1] / _designSize[1])
        const svgGroup = group!.addGroup()
        svgGroup.moveTo((position![0] - shapeSize[0] / 2) / scale, (position![1] - shapeSize[1] / 2) / scale)
        svgGroup.scale(scale)
        for (let i = 0; i < paths.length; i++) {
            const path = paths[i];
            shapes[i] = svgGroup.addShape('path', {
                attrs: {
                    path: path,
                    stroke: defaultStyle.stroke,
                    fill: defaultStyle.fill
                },
                name: 'svg-path-' + i
            })
        }
    }
}

function toVector(value: number[] | number) {
    let vector: [number, number]
    if (value instanceof Array) {
        vector = [value[0], value[1]]
    } else {
        vector = [value, value]
    }
    return vector
}
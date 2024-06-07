import * as G6Ns from "@antv/g6";
import {AnimationHandler, AnimationState} from "../../utils/AnimationHandler.ts";
import {ShapeExtensionHandler, ShapeExtensionHandlerBuilder} from "../../utils/ShapeExtensionHandler.ts";

export const LineGrowthBuilder: ShapeExtensionHandlerBuilder<LineGrowthAniCfg> = {
    type() {
        return 'line-growth'
    },
    build(cfg?: Partial<LineGrowthAniCfg>): ShapeExtensionHandler<LineGrowthAniCfg> {
        return new LineGrowthHandler(this.type(), cfg)
    }
}

export type LineGrowthAniCfg = {
    duration: number
    repeat: boolean
}

export class LineGrowthHandler extends AnimationHandler<LineGrowthAniCfg> {

    defaultCfg(): LineGrowthAniCfg {
        return {
            duration: 2000,
            repeat: false,
        };
    }

    start(G6: typeof G6Ns, item: G6Ns.Item, state: AnimationState) {
        const {duration, repeat} = this.extensionCfg
        const shape = item.getKeyShape() as G6Ns.IShapeBase | any
        shape.animate(
            (ratio: number) => {
                const length = shape.getTotalLength();
                const startLen = ratio * length;
                // 计算 lineDash
                const cfg = {
                    lineDash: [startLen, length - startLen],
                };
                return cfg;
            },
            {
                repeat, // 是否重复执行
                duration, // 一次动画持续时长
            },
        );
    }

    stop(G6: typeof G6Ns, item: G6Ns.Item, state: AnimationState) {
        const shape = item.getKeyShape()
        shape.stopAnimate();
        shape.attr('lineDash', null);
    }
}
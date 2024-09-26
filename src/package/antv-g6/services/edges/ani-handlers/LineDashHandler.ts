import * as G6Ns from "@antv/g6";
import {AnimationHandler, AnimationState} from "../../utils/AnimationHandler";
import {ShapeExtensionHandler, ShapeExtensionHandlerBuilder} from "../../utils/ShapeExtensionHandler";

export const LineDashBuilder: ShapeExtensionHandlerBuilder<LineDashAniCfg> = {
    type() {
        return 'line-dash'
    },
    build(cfg?: Partial<LineDashAniCfg>): ShapeExtensionHandler<LineDashAniCfg> {
        return new LineDashHandler(this.type(), cfg)
    }
}

export type LineDashAniCfg = {
    lineDash: number[]
    duration: number
}

export class LineDashHandler extends AnimationHandler<LineDashAniCfg> {
    defaultCfg(): LineDashAniCfg {
        return {
            lineDash: [4, 2, 1, 2],
            duration: 500,
        }
    }

    start(G6: typeof G6Ns, item: G6Ns.Item, state: AnimationState) {
        const {lineDash, duration} = this.extensionCfg
        let maxOffset = 0
        for (const lineDashItem of lineDash) {
            maxOffset += lineDashItem
        }
        // 获得该边的第一个图形，这里是边的 path
        const shape = item.getKeyShape()
        let index = 0;
        // 边 path 图形的动画
        shape.animate(
            (radio: number) => {
                index++;
                if (index > maxOffset) {
                    index = 0;
                }
                const res = {
                    lineDash,
                    lineDashOffset: -radio*maxOffset,
                };
                // 返回需要修改的参数集，这里修改了 lineDash,lineDashOffset
                return res;
            },
            {
                repeat: true, // 动画重复
                duration, // 一次动画的时长
            },
        );
    }

    stop(G6: typeof G6Ns, item: G6Ns.Item, state: AnimationState) {
        const shape = item.getKeyShape()
        shape.stopAnimate();
        shape.attr('lineDash', null);
    }
}
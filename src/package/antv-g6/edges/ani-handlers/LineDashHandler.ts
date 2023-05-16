import {Item} from "@antv/g6-core/lib/types";
import {AnimationHandler} from "../../utils/AnimationHandler.ts";
import {ShapeExtensionHandler, ShapeExtensionHandlerBuilder} from "../../utils/ShapeExtensionHandler.ts";

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
            duration: 3000,
        }
    }

    start(item: Item) {
        const {lineDash, duration} = this.extensionCfg
        // 获得该边的第一个图形，这里是边的 path
        const shape = this.group!.get('children')[0];
        let index = 0;
        // 边 path 图形的动画
        shape.animate(
            () => {
                index++;
                if (index > 9) {
                    index = 0;
                }
                const res = {
                    lineDash,
                    lineDashOffset: -index,
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

    stop(item: Item) {
        const shape = this.group!.get('children')[0];
        shape.stopAnimate();
        shape.attr('lineDash', null);
    }
}
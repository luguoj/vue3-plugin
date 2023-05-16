import {Item} from "@antv/g6-core/lib/types";
import {AnimationHandler} from "../../utils/AnimationHandler.ts";

export type LineDashAniCfg = {
    lineDash: number[]
    duration: number
}

export class LineDashHandler extends AnimationHandler<LineDashAniCfg> {
    constructor(aniCfg?: Partial<LineDashAniCfg>) {
        super(
            'line-dash',
            () => ({
                lineDash: [4, 2, 1, 2],
                duration: 3000,
            }),
            aniCfg);
    }

    start(item: Item) {
        const {lineDash, duration} = this.aniCfg
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
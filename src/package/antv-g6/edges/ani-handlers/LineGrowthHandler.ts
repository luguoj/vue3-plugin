import {AnimationHandler} from "./AnimationHandler.ts";
import {Item} from "@antv/g6-core/lib/types";

export type LineGrowthAniCfg = {
    duration: number
    repeat: boolean
}

export class LineGrowthHandler extends AnimationHandler<LineGrowthAniCfg> {
    constructor(aniCfg?: Partial<LineGrowthAniCfg>) {
        super(
            'line-growth',
            () => ({
                duration: 2000,
                repeat: false,
            }),
            aniCfg);
    }

    start(item: Item) {
        const {duration, repeat} = this.aniCfg
        const shape = this.group!.get('children')[0];
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

    stop(item: Item) {
        const shape = this.group!.get('children')[0];
        shape.stopAnimate();
        shape.attr('lineDash', null);
    }
}
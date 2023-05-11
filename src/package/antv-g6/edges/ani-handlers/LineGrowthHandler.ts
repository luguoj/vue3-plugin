import {AnimationHandler} from "./AnimationHandler.ts";
import {ModelConfig} from "@antv/g6-core/lib/types";
import {IGroup, IShape} from "@antv/g-base";

export type LineGrowthAniCfg = {
    duration: number
    repeat: boolean
}

export class LineGrowthHandler implements AnimationHandler<LineGrowthAniCfg> {
    aniCfg: LineGrowthAniCfg

    constructor(aniCfg?: Partial<LineGrowthAniCfg>) {
        this.aniCfg = {
            duration: 2000,
            repeat: false,
            ...aniCfg
        }
    }

    handle(
        cfg?: ModelConfig,
        group?: IGroup,
        rst?: IShape
    ) {
        const {duration, repeat} = this.aniCfg
        const shape = group!.get('children')[0];
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
}
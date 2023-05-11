import {Util} from "@antv/g6"
import {ModelConfig} from "@antv/g6-core/lib/types";
import {IGroup, IShape} from "@antv/g-base";
import {AnimationHandler} from "./AnimationHandler.ts";


export type ArrowRunningAniCfg = {
    stroke: string
    fill: string
    duration: number
    repeat: boolean
}

export class ArrowRunningHandler implements AnimationHandler<ArrowRunningAniCfg> {
    aniCfg: ArrowRunningAniCfg

    constructor(aniCfg?: Partial<ArrowRunningAniCfg>) {
        this.aniCfg = {
            stroke: "#3370ff",
            fill: "#fff",
            duration: 3000,
            repeat: true,
            ...aniCfg
        }
    }

    handle(
        cfg?: ModelConfig,
        group?: IGroup,
        rst?: IShape
    ) {
        const {stroke,fill, duration, repeat} = this.aniCfg
        // 获得当前边的第一个图形，这里是边本身的 path
        const shape = group!.get('children')[0];
        // 添加箭头
        const arrow = group!.addShape("marker", {
            attrs: {
                x: 16,
                y: 0,
                r: 8,
                lineWidth: 2,
                stroke,
                fill,
                symbol: (x: number, y: number) => {
                    return [
                        ["M", x - 6, y - 4],
                        ["L", x - 2, y],
                        ["L", x - 6, y + 4]
                    ];
                }
            }
        });
        // 对箭头添加动画
        arrow.animate(
            (ratio: { x: any, y: any }) => {
                const tmpPoint = shape.getPoint(ratio);
                const pos = Util.getLabelPosition(shape, ratio);
                let matrix = [1, 0, 0, 0, 1, 0, 0, 0, 1];
                matrix = Util.transform(matrix, [
                    ["t", -tmpPoint.x, -tmpPoint.y],
                    ["r", pos.angle],
                    ["t", tmpPoint.x, tmpPoint.y]
                ]);

                // returns the modified configurations here, x and y here
                return {
                    x: tmpPoint.x,
                    y: tmpPoint.y,
                    matrix
                };
            },
            {
                repeat, // 动画重复
                duration, // 一次动画的时间长度
            },
        );
    }
}
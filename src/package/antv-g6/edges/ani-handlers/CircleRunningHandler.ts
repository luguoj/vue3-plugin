import {ModelConfig} from "@antv/g6-core/lib/types";
import {IGroup, IShape} from "@antv/g-base";
import {AnimationHandler} from "./AnimationHandler.ts";


export type CircleRunningAniCfg = {
    radius: number
    stroke: string
    fill: string
    duration: number
}

export class CircleRunningHandler implements AnimationHandler<CircleRunningAniCfg> {
    aniCfg: CircleRunningAniCfg

    constructor(aniCfg?: Partial<CircleRunningAniCfg>) {
        this.aniCfg = {
            radius: 3,
            stroke: 'yellow',
            fill: 'red',
            duration: 3000,
            ...aniCfg
        }
    }

    handle(
        cfg?: ModelConfig,
        group?: IGroup,
        rst?: IShape
    ) {
        const {radius, stroke, fill, duration} = this.aniCfg
        // 获得当前边的第一个图形，这里是边本身的 path
        const shape = group!.get('children')[0];
        // 边 path 的起点位置
        const startPoint = shape.getPoint(0);
        // 添加 circle 图形
        const circle = group!.addShape('circle', {
            attrs: {
                x: startPoint.x,
                y: startPoint.y,
                stroke: stroke || 'yellow',
                fill: fill || 'red',
                r: radius || 3,
            },
            // 在 G6 3.3 及之后的版本中，必须指定 name，可以是任意字符串，但需要在同一个自定义元素类型中保持唯一性
            name: 'circle-shape',
        });
        // 对圆点添加动画
        circle.animate(
            (ratio: { x: any, y: any }) => {
                // 每一帧的操作，入参 ratio：这一帧的比例值（Number）。返回值：这一帧需要变化的参数集（Object）。
                // 根据比例值，获得在边 path 上对应比例的位置。
                const tmpPoint = shape.getPoint(ratio);
                // 返回需要变化的参数集，这里返回了位置 x 和 y
                return {
                    x: tmpPoint.x,
                    y: tmpPoint.y,
                };
            },
            {
                repeat: true, // 动画重复
                duration, // 一次动画的时间长度
            },
        );
    }
}
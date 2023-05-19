import {Item} from "@antv/g6-core/lib/types";
import {AnimationHandler, AnimationState} from "../../utils/AnimationHandler.ts";
import {ShapeExtensionHandler, ShapeExtensionHandlerBuilder} from "../../utils/ShapeExtensionHandler.ts";

export const CircleRunningBuilder: ShapeExtensionHandlerBuilder<CircleRunningAniCfg> = {
    type() {
        return 'circle-running'
    },
    build(cfg?: Partial<CircleRunningAniCfg>): ShapeExtensionHandler<CircleRunningAniCfg> {
        return new CircleRunningHandler(this.type(), cfg)
    }
}

export type CircleRunningAniCfg = {
    radius: number
    stroke: string
    fill: string
    duration: number
    repeat: boolean
}

export class CircleRunningHandler extends AnimationHandler<CircleRunningAniCfg> {
    defaultCfg(): CircleRunningAniCfg {
        return {
            radius: 3,
            stroke: "#3370ff",
            fill: "#fff",
            duration: 3000,
            repeat: true
        }
    }

    start(item: Item, state: AnimationState) {
        const {radius, stroke, fill, duration, repeat} = this.extensionCfg
        const group = item.getContainer()
        // 获得当前边的第一个图形，这里是边本身的 path
        const shape = group.get('children')[0];
        // 边 path 的起点位置
        const startPoint = shape.getPoint(0);
        // 添加 circle 图形
        if (!state.circle) {
            state.circle = group.addShape('circle', {
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
        }
        // 对圆点添加动画
        state.circle.animate(
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
                repeat, // 动画重复
                duration, // 一次动画的时间长度
            },
        );
    }

    stop(item: Item, state: AnimationState) {
        if (state.circle) {
            state.circle.remove(true)
            state.circle = undefined
        }
    }
}
import {Util} from "@antv/g6"
import {Item} from "@antv/g6-core/lib/types";
import {IShape} from "@antv/g-base";
import {AnimationHandler} from "../../utils/AnimationHandler.ts";
import {ShapeExtensionHandler, ShapeExtensionHandlerBuilder} from "../../utils/ShapeExtensionHandler.ts";

export const ArrowRunningBuilder: ShapeExtensionHandlerBuilder<ArrowRunningAniCfg> = {
    type() {
        return 'arrow-running'
    },
    build(cfg?: Partial<ArrowRunningAniCfg>): ShapeExtensionHandler<ArrowRunningAniCfg> {
        return new ArrowRunningHandler(this.type(), cfg)
    }
}

export type ArrowRunningAniCfg = {
    stroke: string
    fill: string
    duration: number
    repeat: boolean
}

export class ArrowRunningHandler extends AnimationHandler<ArrowRunningAniCfg> {

    defaultCfg(): ArrowRunningAniCfg {
        return {
            stroke: "#3370ff",
            fill: "#fff",
            duration: 3000,
            repeat: true
        };
    }

    arrow?: IShape

    start(item: Item) {
        const {stroke, fill, duration, repeat} = this.extensionCfg
        const group = item.getContainer()
        // 获得当前边的第一个图形，这里是边本身的 path
        const shape = group.get('children')[0];
        // 添加箭头
        if (!this.arrow) {
            this.arrow = group.addShape("marker", {
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
        }
        // 对箭头添加动画
        this.arrow.animate(
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

    stop() {
        if (this.arrow) {
            this.arrow.remove(true)
            this.arrow = undefined
        }
    }

}
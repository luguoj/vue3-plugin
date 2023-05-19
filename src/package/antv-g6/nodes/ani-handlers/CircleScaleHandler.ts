import {AnimationHandler, AnimationState} from "../../utils/AnimationHandler.ts";
import {Item, ModelConfig} from "@antv/g6-core/lib/types";
import {ShapeExtensionHandler, ShapeExtensionHandlerBuilder} from "../../utils/ShapeExtensionHandler.ts";

export const CircleScaleBuilder: ShapeExtensionHandlerBuilder<CircleScaleAniCfg> = {
    type() {
        return 'circle-scale'
    },
    build(cfg?: Partial<CircleScaleAniCfg>): ShapeExtensionHandler<CircleScaleAniCfg> {
        return new CircleScaleHandler(this.type(), cfg)
    }
}
export type CircleScaleAniCfg = {
    diffSize: number
    duration: number
}

export class CircleScaleHandler extends AnimationHandler<CircleScaleAniCfg> {

    defaultCfg(): CircleScaleAniCfg {
        return {
            diffSize: 10,
            duration: 3000
        }
    }

    start(item: Item, state: AnimationState) {
        const {duration, diffSize} = this.extensionCfg
        const shapeBase = item.getKeyShape();
        shapeBase.animate(
            (ratio: number) => {
                const diff = ratio <= 0.5 ? ratio * diffSize : (1 - ratio) * diffSize;
                let size: number = 0
                if (item._cfg?.model?.size instanceof Array) {
                    size = item._cfg?.model?.size[0]
                } else {
                    size = item._cfg?.model?.size || 20
                }
                return {
                    r: size / 2 + diff,
                };
            },
            {
                repeat: true,
                duration,
                easing: 'easeCubic',
            },
        );
    }

    stop(item: Item, state: AnimationState) {
        const shape = item.getKeyShape();
        const model = item.getModel() as ModelConfig
        let size: number = 0
        if (model.size instanceof Array) {
            size = model.size[0]
        } else {
            size = model.size || 20
        }
        shape.stopAnimate();
        shape.attr('r', size);
    }
}
import {AnimationHandler} from "../../utils/AnimationHandler.ts";
import {Item} from "@antv/g6-core/lib/types";
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

    start(item: Item) {
        const {duration, diffSize} = this.extensionCfg
        const shapeBase = this.group!.get('children')[0];
        shapeBase.animate(
            (ratio: number) => {
                const diff = ratio <= 0.5 ? ratio * diffSize : (1 - ratio) * diffSize;
                let size: number = 0
                if (this.cfg?.size instanceof Array) {
                    size = this.cfg.size[0]
                } else {
                    size = this.cfg!.size || 20
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

    stop(item: Item) {
        const shape = this.group!.get('children')[0];
        let size: number = 0
        if (this.cfg?.size instanceof Array) {
            size = this.cfg.size[0]
        } else {
            size = this.cfg!.size || 20
        }
        shape.stopAnimate();
        shape.attr('r', size);
    }
}
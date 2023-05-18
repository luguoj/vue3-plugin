import {Item} from "@antv/g6-core/lib/types";
import {ShapeExtensionHandler} from "./ShapeExtensionHandler.ts";

export abstract class AnimationHandler<CFG> extends ShapeExtensionHandler<CFG> {
    onStateChanged(name?: string, value?: string | boolean, item?: Item | any) {
        super.onStateChanged(name, value, item)
        const psrShapeExtensionState = item.psrShapeExtensionState
        const stateKey = 'animation-' + name
        if (name === this.type) {
            if (value && !psrShapeExtensionState[stateKey]) {
                this.start(item!)
                psrShapeExtensionState[stateKey] = true
            } else if (!value && psrShapeExtensionState[stateKey]) {
                this.stop(item!)
                psrShapeExtensionState[stateKey] = false
            }
        }
    }

    start(item: Item): void {
    }

    stop(item: Item): void {
    }

}
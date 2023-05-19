import {Item} from "@antv/g6-core/lib/types";
import {ShapeExtensionHandler} from "./ShapeExtensionHandler.ts";


export type AnimationState = { running: boolean } | any

export abstract class AnimationHandler<CFG> extends ShapeExtensionHandler<CFG> {
    onStateChanged(name: string, value: string | boolean, item: Item | any, state: AnimationState) {
        super.onStateChanged(name, value, item, state)
        if (name === this.type) {
            if (value && !state.running) {
                this.start(item!, state)
                state.running = true
            } else if (!value && state.running) {
                this.stop(item!, state)
                state.running = false
            }
        }
    }

    start(item: Item, state: AnimationState): void {
    }

    stop(item: Item, state: AnimationState): void {
    }

}
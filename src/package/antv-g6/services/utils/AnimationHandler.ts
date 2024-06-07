import * as G6Ns from "@antv/g6";
import {ShapeExtensionHandler} from "./ShapeExtensionHandler.ts";


export type AnimationState = { running: boolean } | any

export abstract class AnimationHandler<CFG> extends ShapeExtensionHandler<CFG> {
    onStateChanged(G6: typeof G6Ns, name: string, value: string | boolean, item: G6Ns.Item | any, state: AnimationState) {
        super.onStateChanged(G6, name, value, item, state)
        if (name === this.type) {
            if (value && !state.running) {
                this.start(G6, item!, state)
                state.running = true
            } else if (!value && state.running) {
                this.stop(G6, item!, state)
                state.running = false
            }
        }
    }

    start(G6: typeof G6Ns, item: G6Ns.Item, state: AnimationState): void {
    }

    stop(G6: typeof G6Ns, item: G6Ns.Item, state: AnimationState): void {
    }

}
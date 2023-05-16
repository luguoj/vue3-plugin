import {Item} from "@antv/g6-core/lib/types";
import {ShapeExtensionHandler} from "./ShapeExtensionHandler.ts";

export abstract class AnimationHandler<CFG> extends ShapeExtensionHandler<CFG> {
    running: boolean = false

    onStateChanged(name?: string, value?: string | boolean, item?: Item) {
        if (name === this.type) {
            if (value && !this.running) {
                this.start(item!)
                this.running = true
            } else if (!value && this.running) {
                this.stop(item!)
                this.running = false
            }
        }
    }

    start(item: Item): void {
    }

    stop(item: Item): void {
    }

}
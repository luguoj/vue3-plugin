import {AnimationHandler, AnimationState} from "../../utils/AnimationHandler.ts";
import {Item, ModelConfig} from "@antv/g6-core/lib/types";
import {ShapeExtensionHandler, ShapeExtensionHandlerBuilder} from "../../utils/ShapeExtensionHandler.ts";

export const CircleShadowBuilder: ShapeExtensionHandlerBuilder<CircleShadowAniCfg> = {
    type() {
        return 'circle-shadow'
    },
    build(cfg?: Partial<CircleShadowAniCfg>): ShapeExtensionHandler<CircleShadowAniCfg> {
        return new CircleShadowHandler(this.type(), cfg)
    }
}
export type CircleShadowAniCfg = {
    duration: number
    diffSize: number
}

export class CircleShadowHandler extends AnimationHandler<CircleShadowAniCfg> {

    defaultCfg(): CircleShadowAniCfg {
        return {
            duration: 3000,
            diffSize: 10
        }
    }

    start(item: Item, state: AnimationState) {
        const {duration, diffSize} = this.extensionCfg
        const group = item.getContainer()
        const model = item.getModel() as ModelConfig
        const fill = model.style?.fill || 'rgb(95, 149, 255)'
        let size: number = 0
        if (model.size instanceof Array) {
            size = model.size[0]
        } else {
            size = model.size || 20
        }
        const r = size / 2;
        const back1 = state.back1 = group!.addShape('circle', {
            zIndex: -3,
            attrs: {
                x: 0,
                y: 0,
                r,
                fill,
                opacity: 0.6,
            },
            name: 'back1-shape',
        });
        const back2 = state.back2 = group!.addShape('circle', {
            zIndex: -2,
            attrs: {
                x: 0,
                y: 0,
                r,
                fill,
                opacity: 0.6,
            },
            name: 'back2-shape',
        });
        const back3 = state.back3 = group!.addShape('circle', {
            zIndex: -1,
            attrs: {
                x: 0,
                y: 0,
                r,
                fill,
                opacity: 0.6,
            },
            name: 'back3-shape',
        });
        const el = group!.get('el')
        const elChildren = new Array(...el.children)
        const children = [
            ...elChildren.slice(elChildren.length - 3),
            ...elChildren.slice(0, elChildren.length - 3),
        ]
        const fragment = document.createDocumentFragment()
        for (const child of children) {
            fragment.appendChild(child)
        }
        el.appendChild(fragment)
        back1.animate(
            {
                // Magnifying and disappearing
                r: r + diffSize,
                opacity: 0.1,
            },
            {
                duration,
                easing: 'easeCubic',
                delay: 0,
                repeat: true, // repeat
            },
        ); // no delay
        back2.animate(
            {
                // Magnifying and disappearing
                r: r + diffSize,
                opacity: 0.1,
            },
            {
                duration: 3000,
                easing: 'easeCubic',
                delay: 1000,
                repeat: true, // repeat
            },
        ); // 1s delay
        back3.animate(
            {
                // Magnifying and disappearing
                r: r + diffSize,
                opacity: 0.1,
            },
            {
                duration: 3000,
                easing: 'easeCubic',
                delay: 2000,
                repeat: true, // repeat
            },
        ); // 3s delay
    }

    stop(item: Item, state: AnimationState) {
        if (state.back1) {
            state.back1.remove(true)
            state.back1 = undefined
        }
        if (state.back2) {
            state.back2.remove(true)
            state.back2 = undefined
        }
        if (state.back3) {
            state.back3.remove(true)
            state.back3 = undefined
        }
    }
}
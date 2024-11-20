import {BaseNode, Diamond, ElementHooks, Hexagon, Star, Triangle} from "@antv/g6";
import {Circle,Ellipse, Rect} from '@antv/g';
import {DisplayObject, IAnimation} from "@antv/g-lite";

interface Ripple {
    shape: DisplayObject,
    animation: IAnimation
}

export interface RippleRectAnimationOptions {
    stateKey: string
    rippleWidth?: number
    rippleLength?: number
    keyframes?: Keyframe[] | PropertyIndexedKeyframes
    options?: number | KeyframeAnimationOptions
}

function buildCircleRipple(
    this: BaseNode,
    rippleWidth: number,
    rippleLength: number
): Ripple[] {
    const {fill} = this.attributes;
    const r = this.shapeMap.key.style.r;
    const fillOpacity = 0.5;
    return Array.from({length: rippleLength}).map((_, index) => {
        const shape = this.upsert(
            `ripple-${index}`,
            Circle,
            {
                r,
                fill,
                fillOpacity,
            },
            this,
        )!;
        shape.setAttribute('visibility', 'hidden')
        const animation = shape.animate(
            [
                {
                    r,
                    fillOpacity
                },
                {
                    r: r + rippleLength * rippleWidth,
                    fillOpacity: 0
                },
            ],
            {
                duration: 1000 * rippleLength,
                iterations: Infinity,
                delay: 1000 * index,
                easing: 'ease-cubic',
            },
        )!;
        animation.pause()
        return {shape, animation}
    });
}

function buildEllipseRipple(
    this: BaseNode,
    rippleWidth: number,
    rippleLength: number
): Ripple[] {
    const {fill} = this.attributes;
    const rx = this.shapeMap.key.style.rx;
    const ry = this.shapeMap.key.style.ry;
    const fillOpacity = 0.5;
    return Array.from({length: rippleLength}).map((_, index) => {
        const shape = this.upsert(
            `ripple-${index}`,
            Ellipse,
            {
                rx,
                ry,
                fill,
                fillOpacity,
            },
            this,
        )!;
        shape.setAttribute('visibility', 'hidden')
        const animation = shape.animate(
            [
                {
                    rx,
                    ry,
                    fillOpacity
                },
                {
                    rx: rx + rippleLength * rippleWidth,
                    ry: ry + rippleLength * rippleWidth,
                    fillOpacity: 0
                },
            ],
            {
                duration: 1000 * rippleLength,
                iterations: Infinity,
                delay: 1000 * index,
                easing: 'ease-cubic',
            },
        )!;
        animation.pause()
        return {shape, animation}
    });
}

function buildRectRipple(
    this: BaseNode,
    rippleWidth: number,
    rippleLength: number
): Ripple[] {
    const {fill} = this.attributes;
    const width = this.shapeMap.key.style.width;
    const height = this.shapeMap.key.style.height;
    const fillOpacity = 0.5;
    return Array.from({length: rippleLength}).map((_, index) => {
        const shape = this.upsert(
            `ripple-${index}`,
            Rect,
            {
                x: -(width) / 2,
                y: -height / 2,
                width: width,
                height: height,
                fill,
                fillOpacity,
            },
            this,
        )!;
        shape.setAttribute('visibility', 'hidden')
        const animation = shape.animate(
            [
                {
                    x: -width / 2,
                    y: -height / 2,
                    width: width,
                    height: height,
                    fillOpacity
                },
                {
                    x: -width / 2 - rippleLength * rippleWidth,
                    y: -height / 2 - rippleLength * rippleWidth,
                    width: width + rippleLength * rippleWidth * 2,
                    height: height + rippleLength * rippleWidth * 2,
                    fillOpacity: 0
                },
            ],
            {
                duration: 1000 * rippleLength,
                iterations: Infinity,
                delay: 1000 * index,
                easing: 'ease-cubic',
            },
        )!;
        animation.pause()
        return {shape, animation}
    });
}

function useHooks(
    aniOptions: RippleRectAnimationOptions
) {
    const {stateKey, rippleWidth, rippleLength, keyframes, options} = {
        rippleWidth: 5,
        rippleLength: 5,
        keyframes: [{lineWidth: 0}, {lineWidth: 20}],
        options: {
            duration: 1000,
            iterations: Infinity,
            direction: 'alternate'
        } as KeyframeAnimationOptions,
        ...aniOptions
    }
    let ripples: Ripple[] | null = null
    const hooks: ElementHooks = {
        onCreate(this: BaseNode) {
            const keyShapeType = this.shapeMap.key.config.type
            switch (keyShapeType) {
                case 'circle':
                    ripples = buildCircleRipple.apply(this, [rippleWidth, rippleLength])
                    break
                case 'rect':
                    ripples = buildRectRipple.apply(this, [rippleWidth, rippleLength])
                    break
                case 'ellipse':
                    ripples = buildEllipseRipple.apply(this, [rippleWidth, rippleLength])
                    break
                case 'polygon':
                    if (this instanceof Diamond) {
                    } else if (this instanceof Hexagon) {

                    } else if (this instanceof Triangle) {

                    } else if (this instanceof Star) {

                    }

                    break
                default:
                    return
            }
        },
        onUpdate(this: BaseNode) {
            const runningState = this.getAttribute(stateKey as any)
            if (runningState) {
                ripples?.forEach(({animation, shape}) => {
                    shape.setAttribute('visibility', 'visible')
                    animation.play()
                })
            } else {
                ripples?.forEach(({animation, shape}) => {
                    shape.setAttribute('visibility', 'hidden')
                    animation.cancel()
                })
            }
        },
        onDestroy() {
            ripples?.forEach(({animation, shape}) => {
                animation.cancel()
                shape.remove()
            })
        },
    }
    return hooks
}

export const RippleRectAnimation = {
    useHooks,
}
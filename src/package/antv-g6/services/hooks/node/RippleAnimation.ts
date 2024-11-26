import {BaseNode, ElementHooks} from "@antv/g6";
import {Circle, DisplayObject, Ellipse, Group, IAnimation, Polygon, Rect} from '@antv/g';
import {ElementHooksBuilder} from "../../wrapElementCtorWithHooks.ts";

interface Ripple {
    shape: DisplayObject,
    animation: IAnimation
}

export interface RippleRectAnimationOptions {
    stateKey: string
    rippleWidth?: number
    rippleLength?: number
    options?: EffectTiming
}

function buildCircleRipple(
    this: BaseNode,
    rippleGroup: Group,
    rippleWidth: number,
    rippleLength: number,
    options: EffectTiming //TODO
): Ripple[] {
    const {fill} = this.attributes;
    const r = this.shapeMap.key.style.r;
    const fillOpacity = 0.5;
    return Array.from({length: rippleLength}).map((_, index) => {
        const shape = new Circle({
            className: `ripple-${index}`,
            style: {
                r,
                fill,
                fillOpacity,
            }
        })
        rippleGroup.appendChild(shape)
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
        return {shape, animation}
    });
}

function buildEllipseRipple(
    this: BaseNode,
    rippleGroup: Group,
    rippleWidth: number,
    rippleLength: number
): Ripple[] {
    const {fill} = this.attributes;
    const rx = this.shapeMap.key.style.rx;
    const ry = this.shapeMap.key.style.ry;
    const fillOpacity = 0.5;
    return Array.from({length: rippleLength}).map((_, index) => {
        const shape = new Ellipse({
            className: `ripple-${index}`,
            style: {
                rx,
                ry,
                fill,
                fillOpacity,
                transform: `scale(1)`,
            }
        });
        rippleGroup.appendChild(shape)
        const animation = shape.animate(
            [
                {
                    rx,
                    ry,
                    fillOpacity,
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
        return {shape, animation}
    });
}

function buildRectRipple(
    this: BaseNode,
    rippleGroup: Group,
    rippleWidth: number,
    rippleLength: number
): Ripple[] {
    const {fill} = this.attributes;
    const width = this.shapeMap.key.style.width;
    const height = this.shapeMap.key.style.height;
    const x = this.shapeMap.key.style.x;
    const y = this.shapeMap.key.style.y;
    const fillOpacity = 0.5;
    return Array.from({length: rippleLength}).map((_, index) => {
        const shape = new Rect({
            className: `ripple-${index}`,
            style: {
                x,
                y,
                width: width,
                height: height,
                fill,
                fillOpacity,
            }
        });
        rippleGroup.appendChild(shape)
        const animation = shape.animate(
            [
                {
                    x,
                    y,
                    width: width,
                    height: height,
                    fillOpacity
                },
                {
                    x: x - rippleLength * rippleWidth,
                    y: y - rippleLength * rippleWidth,
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
        return {shape, animation}
    });
}

function buildPolygonRipple(
    this: BaseNode,
    rippleGroup: Group,
    rippleWidth: number,
    rippleLength: number
): Ripple[] {
    const [width, height] = this.getSize(this.attributes);
    const rippleAttributes = {
        ...this.attributes,
        size: [width, height]
    } as any
    const rippleStyle = (this as any).getKeyStyle(rippleAttributes);
    const fillOpacity = 0.5;
    return Array.from({length: rippleLength}).map((_, index) => {
        const shape = new Polygon({
            className: `ripple-${index}`,
            style: rippleStyle
        });
        rippleGroup.appendChild(shape)
        const scale = Math.max((width + rippleLength * rippleWidth * 2) / width, (height + rippleLength * rippleWidth * 2) / height)
        const animation = shape.animate(
            [
                {
                    fillOpacity,
                    transform: `scale(1)`
                },
                {
                    transform: `scale(${scale})`,
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
        return {shape, animation}
    });
}

export function useRippleAnimation(
    aniOptions: RippleRectAnimationOptions
): ElementHooksBuilder {
    const {stateKey, rippleWidth, rippleLength, options} = {
        rippleWidth: 5,
        rippleLength: 5,
        options: {
            duration: 1000,
            iterations: Infinity,
            direction: 'alternate'
        } as EffectTiming,
        ...aniOptions
    }
    return () => {
        const group: Group = new Group()
        const hooks: ElementHooks = {
            onCreate(this: BaseNode) {
                this.appendChild(group, 0)
                const keyShapeType = this.shapeMap.key.config.type
                switch (keyShapeType) {
                    case 'circle':
                        buildCircleRipple.apply(this, [group, rippleWidth, rippleLength])
                        break
                    case 'html':
                    case 'rect':
                        buildRectRipple.apply(this, [group, rippleWidth, rippleLength])
                        break
                    case 'ellipse':
                        buildEllipseRipple.apply(this, [group, rippleWidth, rippleLength])
                        break
                    case 'polygon':
                        buildPolygonRipple.apply(this, [group, rippleWidth, rippleLength])
                        break
                    default:
                        return
                }
            },
            onUpdate(this: BaseNode) {
                const runningState = this.getAttribute(stateKey as any)
                if (runningState) {
                    group.show()
                } else {
                    group.hide()
                }
            },
            onDestroy() {
                group?.remove()
            },
        }
        return hooks
    }
}
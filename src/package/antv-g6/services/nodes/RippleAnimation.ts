import {BaseNode, ElementHooks} from "@antv/g6";
import {Circle, DisplayObject, Ellipse, Group, IAnimation, Polygon, Rect} from '@antv/g';

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
    rippleGroup: Group,
    rippleWidth: number,
    rippleLength: number
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
    let rippleGroup: Group = new Group()
    let ripples: Ripple[] | null = null
    const hooks: ElementHooks = {
        onCreate(this: BaseNode) {
            this.appendChild(rippleGroup, 0)
            const keyShapeType = this.shapeMap.key.config.type
            switch (keyShapeType) {
                case 'circle':
                    ripples = buildCircleRipple.apply(this, [rippleGroup, rippleWidth, rippleLength])
                    break
                case 'html':
                case 'rect':
                    ripples = buildRectRipple.apply(this, [rippleGroup, rippleWidth, rippleLength])
                    break
                case 'ellipse':
                    ripples = buildEllipseRipple.apply(this, [rippleGroup, rippleWidth, rippleLength])
                    break
                case 'polygon':
                    ripples = buildPolygonRipple.apply(this, [rippleGroup, rippleWidth, rippleLength])
                    break
                default:
                    return
            }
        },
        onUpdate(this: BaseNode) {
            const runningState = this.getAttribute(stateKey as any)
            if (runningState) {
                rippleGroup?.show()
            } else {
                rippleGroup?.hide()
            }
        },
        onDestroy() {
            rippleGroup?.remove()
        },
    }
    return hooks
}

export const RippleAnimation = {
    useHooks,
}
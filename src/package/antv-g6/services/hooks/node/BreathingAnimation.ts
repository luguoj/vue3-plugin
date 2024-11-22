import {BaseNode, ElementHooks} from "@antv/g6";
import {Circle, DisplayObject, Ellipse, Group, IAnimation, Polygon, Rect} from '@antv/g';
import {ElementHooksBuilder} from "../../wrapElementCtorWithHooks.ts";

interface BreathingHalo {
    shape: DisplayObject,
    animation: IAnimation
}

export interface BreathingAnimationOptions {
    stateKey: string
    breathingHaloWidth?: number
    options?: EffectTiming
}

function buildCircleRipple(
    this: BaseNode,
    breathingHaloGroup: Group,
    breathingHaloWidth: number,
    options: EffectTiming
): BreathingHalo {
    const {fill} = this.attributes;
    const r = this.shapeMap.key.style.r;
    const fillOpacity = 0.5;
    const shape = new Circle({
        className: `breathingHalo`,
        style: {
            r,
            fill,
            fillOpacity,
        }
    })
    breathingHaloGroup.appendChild(shape)
    const animation = shape.animate(
        [
            {
                r,
            },
            {
                r: r + breathingHaloWidth,
            },
        ],
        options,
    )!;
    return {shape, animation}
}

function buildEllipseRipple(
    this: BaseNode,
    breathingHaloGroup: Group,
    breathingHaloWidth: number,
    options: EffectTiming
): BreathingHalo {
    const {fill} = this.attributes;
    const rx = this.shapeMap.key.style.rx;
    const ry = this.shapeMap.key.style.ry;
    const fillOpacity = 0.5;
    const shape = new Ellipse({
        className: `breathingHalo`,
        style: {
            rx,
            ry,
            fill,
            fillOpacity,
            transform: `scale(1)`,
        }
    });
    breathingHaloGroup.appendChild(shape)
    const animation = shape.animate(
        [
            {
                rx,
                ry,
            },
            {
                rx: rx + breathingHaloWidth,
                ry: ry + breathingHaloWidth,
            },
        ],
        options,
    )!;
    return {shape, animation}
}

function buildRectRipple(
    this: BaseNode,
    breathingHaloGroup: Group,
    breathingHaloWidth: number,
    options: EffectTiming
): BreathingHalo {
    const {fill} = this.attributes;
    const width = this.shapeMap.key.style.width;
    const height = this.shapeMap.key.style.height;
    const x = this.shapeMap.key.style.x;
    const y = this.shapeMap.key.style.y;
    const fillOpacity = 0.5;
    const shape = new Rect({
        className: `breathingHalo`,
        style: {
            x,
            y,
            width: width,
            height: height,
            fill,
            fillOpacity,
        }
    });
    breathingHaloGroup.appendChild(shape)
    const animation = shape.animate(
        [
            {
                x,
                y,
                width: width,
                height: height,
            },
            {
                x: x - breathingHaloWidth,
                y: y - breathingHaloWidth,
                width: width + breathingHaloWidth * 2,
                height: height + breathingHaloWidth * 2,
            },
        ],
        options,
    )!;
    return {shape, animation}
}

function buildPolygonRipple(
    this: BaseNode,
    breathingHaloGroup: Group,
    breathingHaloWidth: number,
    options: EffectTiming
): BreathingHalo {
    const [width, height] = this.getSize(this.attributes);
    const fillOpacity = 0.5;
    const breathingHaloAttributes = {
        ...this.attributes,
        size: [width, height],
        fillOpacity
    } as any
    const breathingHaloStyle = (this as any).getKeyStyle(breathingHaloAttributes);
    const shape = new Polygon({
        className: `breathingHalo`,
        style: breathingHaloStyle
    });
    breathingHaloGroup.appendChild(shape)
    const scale = Math.max((width + breathingHaloWidth * 2) / width, (height + breathingHaloWidth * 2) / height)
    const animation = shape.animate(
        [
            {
                transform: `scale(1)`
            },
            {
                transform: `scale(${scale})`
            },
        ],
        options,
    )!;
    return {shape, animation}
}

export function useBreathingAnimation(
    aniOptions: BreathingAnimationOptions
): ElementHooksBuilder {
    const {stateKey, breathingHaloWidth, options} = {
        breathingHaloWidth: 5,
        options: {
            duration: 1000,
            iterations: Infinity,
            direction: 'alternate'
        } as EffectTiming,
        ...aniOptions
    }
    return () => {
        let breathingHaloGroup: Group = new Group()
        const hooks: ElementHooks = {
            onCreate(this: BaseNode) {
                this.appendChild(breathingHaloGroup, 0)
                const keyShapeType = this.shapeMap.key.config.type
                switch (keyShapeType) {
                    case 'circle':
                        buildCircleRipple.apply(this, [breathingHaloGroup, breathingHaloWidth, options])
                        break
                    case 'html':
                    case 'rect':
                        buildRectRipple.apply(this, [breathingHaloGroup, breathingHaloWidth, options])
                        break
                    case 'ellipse':
                        buildEllipseRipple.apply(this, [breathingHaloGroup, breathingHaloWidth, options])
                        break
                    case 'polygon':
                        buildPolygonRipple.apply(this, [breathingHaloGroup, breathingHaloWidth, options])
                        break
                    default:
                        return
                }
            },
            onUpdate(this: BaseNode) {
                const runningState = this.getAttribute(stateKey as any)
                if (runningState) {
                    breathingHaloGroup?.setAttribute('visibility', 'visible')
                } else {
                    breathingHaloGroup?.setAttribute('visibility', 'hidden')
                }
            },
            onDestroy() {
                breathingHaloGroup?.remove()
            },
        }
        return hooks
    }
}
import {ref, Ref} from "vue";
import * as G6Ns from "@antv/g6";
import {ShapeExtensionHandler, ShapeExtensionHandlerBuilder} from "./ShapeExtensionHandler.ts";

export function useShape(
    promiseG6: Promise<typeof G6Ns>,
    id: number,
    shapeType: 'node' | 'edge',
    definition: (G6: typeof G6Ns, extendShape?: any) => G6Ns.ShapeOptions | G6Ns.ShapeDefine,
    extendShapeType?: string
): Ref<string | undefined> {
    const nameRef = ref<string>()
    promiseG6.then((G6) => {
        const {
            registerNode,
            registerEdge,
            Shape
        } = G6
        const name = 'psr-shape-' + shapeType + '-' + id
        const register = shapeType == 'node' ? registerNode : registerEdge
        const shapeFactory = shapeType == 'node' ? Shape.Node : Shape.Edge
        const _extendShape = extendShapeType && shapeFactory.getShape(extendShapeType)
        register(name, definition(G6, _extendShape), extendShapeType)
        nameRef.value = name
    })
    return nameRef
}

export function useShapeWithExtensions(
    promiseG6: Promise<typeof G6Ns>,
    options: {
        id: number
        shapeType: 'node' | 'edge'
        extendShape?: any,
        extensions: {
            type: any,
            cfg?: any
        }[],
        builders: Record<string, ShapeExtensionHandlerBuilder<any>>
    }
): Ref<string | undefined> {
    const {id, shapeType, extendShape, extensions} = options
    const handlers: ShapeExtensionHandler<any>[] = extensions.map(
        ({type, cfg}) => options.builders[type]?.build(cfg)
    ).filter(handler => !!handler)
    return useShape(
        promiseG6,
        id,
        shapeType,
        (G6, _extendShape) => ({
            afterDraw(cfg, group, rst) {
                if (_extendShape && _extendShape.afterDraw) {
                    _extendShape.afterDraw(cfg, group, rst)
                }
                const state: any = group!.cfg.item.psrShapeExtensionState = {}
                for (const handler of handlers) {
                    state[handler.type] = {}
                    handler.init(G6, this, cfg!, group!, rst!, state[handler.type])
                }
            },
            setState(name?: string, value?: string | boolean, item?: G6Ns.Item | any) {
                if (_extendShape && _extendShape.setState) {
                    _extendShape.setState(name, value, item)
                }
                for (const handler of handlers) {
                    handler.onStateChanged(G6, name, value, item, item!.psrShapeExtensionState[handler.type])
                }
            }
        }),
        extendShape
    );
}
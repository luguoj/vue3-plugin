import {registerEdge, registerNode, Shape} from "@antv/g6";
import {Item} from "@antv/g6-core/lib/types";
import {ShapeExtensionHandler, ShapeExtensionHandlerBuilder} from "./ShapeExtensionHandler.ts";
import {ShapeDefine, ShapeOptions} from "@antv/g6-core/lib/interface/shape";

export function useShape(
    id: number,
    shapeType: 'node' | 'edge',
    definition: (extendShape?: any) => ShapeOptions | ShapeDefine,
    extendShapeType?: string
) {
    const register = shapeType == 'node' ? registerNode : registerEdge
    const name = 'psr-shape-' + shapeType + '-' + id
    const shapeFactory = shapeType == 'node' ? Shape.Node : Shape.Edge
    const _extendShape = extendShapeType && shapeFactory.getShape(extendShapeType)
    register(name, definition(_extendShape), extendShapeType)
    return name
}

export function useShapeWithExtensions(options: {
    id: number
    shapeType: 'node' | 'edge'
    extendShape?: any,
    extensions: {
        type: any,
        cfg?: any
    }[],
    builders: Record<string, ShapeExtensionHandlerBuilder<any>>
}) {
    const {id, shapeType, extendShape, extensions} = options
    const handlers: ShapeExtensionHandler<any>[] = extensions.map(
        ({type, cfg}) => options.builders[type]?.build(cfg)
    ).filter(handler => !!handler)
    return useShape(id,
        shapeType,
        (_extendShape) => ({
            afterDraw(cfg, group, rst) {
                if (_extendShape && _extendShape.afterDraw) {
                    _extendShape.afterDraw(cfg, group, rst)
                }
                const state: any = group!.cfg.item.psrShapeExtensionState = {}
                for (const handler of handlers) {
                    state[handler.type] = {}
                    handler.init(this, cfg!, group!, rst!, state[handler.type])
                }
            },
            setState(name?: string, value?: string | boolean, item?: Item | any) {
                if (_extendShape && _extendShape.setState) {
                    _extendShape.setState(name, value, item)
                }
                for (const handler of handlers) {
                    handler.onStateChanged(name, value, item, item!.psrShapeExtensionState[handler.type])
                }
            }
        }),
        extendShape
    );
}
import {registerEdge, registerNode, Shape} from "@antv/g6";
import {Item} from "@antv/g6-core/lib/types";
import {ShapeExtensionHandler, ShapeExtensionHandlerBuilder} from "./ShapeExtensionHandler.ts";

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
    const {id, extensions} = options
    const name = 'psr-shape-' + id
    const handlers: ShapeExtensionHandler<any>[] = extensions.map(
        ({type, cfg}) => options.builders[type]?.build(cfg)
    ).filter(handler => !!handler)
    const register = options.shapeType == 'node' ? registerNode : registerEdge
    const shapeFactory = options.shapeType == 'node' ? Shape.Node : Shape.Edge
    const extendShape = shapeFactory.getShape(options.extendShape)
    register(name,
        {
            afterDraw(cfg, group, rst) {
                if (extendShape && extendShape.afterDraw) {
                    extendShape.afterDraw(cfg, group, rst)
                }
                const state: any = group!.cfg.item.psrShapeExtensionState = {}
                for (const handler of handlers) {
                    state[handler.type] = {}
                    handler.init(this, cfg!, group!, rst!, state[handler.type])
                }
            },
            setState(name?: string, value?: string | boolean, item?: Item | any) {
                if (extendShape && extendShape.setState) {
                    extendShape.setState(name, value, item)
                }
                for (const handler of handlers) {
                    handler.onStateChanged(name, value, item, item!.psrShapeExtensionState[handler.type])
                }
            }
        },
        options.extendShape
    );
    return name
}
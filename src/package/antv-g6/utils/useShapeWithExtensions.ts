import {registerEdge, registerNode} from "@antv/g6";
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
    register(name,
        {
            afterDraw(cfg, group, rst) {
                for (const handler of handlers) {
                    handler.init(this, cfg, group, rst)
                }
            },
            setState(name?: string, value?: string | boolean, item?: Item) {
                for (const handler of handlers) {
                    handler.onStateChanged(name, value, item)
                }
            }
        },
        options.extendShape
    );
    return name
}
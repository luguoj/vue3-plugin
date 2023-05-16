import {Item, ModelConfig} from "@antv/g6-core/lib/types";
import {IGroup, IShape} from "@antv/g-base";
import {IShapeBase} from "@antv/g6";

export interface ShapeExtensionHandlerBuilder<CFG> {
    type(): string

    build(cfg?: Partial<CFG>): ShapeExtensionHandler<CFG>
}

export abstract class ShapeExtensionHandler<CFG> {
    type: string
    shape: IShapeBase | any
    cfg?: ModelConfig
    group?: IGroup
    rst?: IShape
    extensionCfg: CFG

    constructor(type: string, cfg?: Partial<CFG>) {
        this.type = type
        this.extensionCfg = {
            ...this.defaultCfg(),
            ...cfg
        }
    }

    defaultCfg(): CFG {
        return {} as CFG
    }

    init(shape: IShapeBase | any, cfg?: ModelConfig, group?: IGroup, rst?: IShape): void {
        this.shape = shape
        this.cfg = cfg
        this.group = group
        this.rst = rst
    }

    onStateChanged(name?: string, value?: string | boolean, item?: Item) {
    }
}
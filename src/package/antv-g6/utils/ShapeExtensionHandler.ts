import {Item, ModelConfig} from "@antv/g6-core/lib/types";
import {IGroup, IShape} from "@antv/g-base";
import {ShapeOptions} from "@antv/g6";

export interface ShapeExtensionHandlerBuilder<CFG> {
    type(): string

    build(cfg?: Partial<CFG>): ShapeExtensionHandler<CFG>
}

export abstract class ShapeExtensionHandler<CFG> {
    type: string
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

    init(shape: ShapeOptions | any, cfg: ModelConfig, group: IGroup, rst: IShape, state: any): void {
    }

    onStateChanged(name: string | undefined, value: string | boolean | undefined, item: Item | any, state: any) {
    }
}
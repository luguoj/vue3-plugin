import * as G6Ns from "@antv/g6";

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

    init(
        G6: typeof G6Ns,
        shape: G6Ns.ShapeOptions | any,
        cfg: G6Ns.ModelConfig,
        group: G6Ns.IGroup,
        rst: G6Ns.IShape,
        state: any
    ): void {
    }

    onStateChanged(
        G6: typeof G6Ns,
        name: string | undefined,
        value: string | boolean | undefined,
        item: G6Ns.Item | any,
        state: any) {
    }
}
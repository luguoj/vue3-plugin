import {Item, ModelConfig} from "@antv/g6-core/lib/types";
import {IGroup, IShape} from "@antv/g-base";
import {PsrAntvG6Types} from "../../types";

export abstract class AnimationHandler<AniCfg = never> {
    type: PsrAntvG6Types.EdgeAnimationType
    aniCfg: AniCfg
    running: boolean = false
    cfg?: ModelConfig
    group?: IGroup
    rst?: IShape

    protected constructor(type: PsrAntvG6Types.EdgeAnimationType, defaultCfg: () => AniCfg, cfg?: Partial<AniCfg>) {
        this.type = type
        this.aniCfg = {
            ...defaultCfg(),
            ...cfg
        }
    }

    init(cfg?: ModelConfig, group?: IGroup, rst?: IShape): void {
        this.cfg = cfg
        this.group = group
        this.rst = rst
    }

    onStateChanged(item: Item, enabled: boolean) {
        if (enabled && !this.running) {
            this.start(item)
            this.running = true
        } else if (!enabled && this.running) {
            this.stop(item)
            this.running = false
        }
    }

    start(item: Item): void {
    }

    stop(item: Item): void {
    }

}
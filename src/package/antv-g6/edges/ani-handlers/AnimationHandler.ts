import {ModelConfig} from "@antv/g6-core/lib/types";
import {IGroup, IShape} from "@antv/g-base";

export interface AnimationHandler<AniCfg = never> {
    handle: (cfg?: ModelConfig, group?: IGroup, rst?: IShape) => void

    aniCfg?: AniCfg
}
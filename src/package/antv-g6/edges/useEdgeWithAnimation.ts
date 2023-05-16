import {registerEdge} from "@antv/g6";
import {buildAnimation} from "./buildAnimation.ts";
import {PsrAntvG6Types} from "../../types";
import {AnimationHandler} from "../utils/AnimationHandler.ts";
import {Item} from "@antv/g6-core/lib/types";

export function useEdgeWithAnimation(options: {
    id: number,
    edge: PsrAntvG6Types.EdgeType,
    animations: {
        type: PsrAntvG6Types.EdgeAnimationType,
        cfg?: any
    }[]
}) {
    const {id, edge, animations} = options
    const name = 'psr-edge-with-animation-' + id
    const hAnis: AnimationHandler<any>[] = animations.map(({type, cfg}) => buildAnimation<any>({type, cfg}))
    registerEdge(name,
        {
            afterDraw(cfg, group, rst) {
                for (const hAni of hAnis) {
                    hAni.init(cfg, group, rst)
                }
            },
            setState(name?: string, value?: string | boolean, item?: Item) {
                for (const hAni of hAnis) {
                    if (hAni.type === name && item) {
                        hAni.onStateChanged(item, !!value)
                    }
                }
            }
        },
        edge,
    );
    return name
}
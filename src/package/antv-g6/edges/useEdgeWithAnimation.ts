import {registerEdge} from "@antv/g6";
import {buildAnimation} from "./buildAnimation.ts";
import {PsrAntvG6Types} from "../../types";
import {AnimationHandler} from "./ani-handlers/AnimationHandler.ts";

let edgeWithAniId = 0

export function useEdgeWithAnimation(options: {
    edge: PsrAntvG6Types.EdgeType,
    animations: {
        type: PsrAntvG6Types.EdgeAnimationType,
        cfg?: any
    }[]
}) {
    const {edge, animations} = options
    const name = 'psr-edge-with-animation-' + edgeWithAniId++
    const hAnis: AnimationHandler<any>[] = animations.map(({type, cfg}) => buildAnimation<any>({type, cfg}))
    registerEdge(name,
        {
            afterDraw(cfg, group, rst) {
                for (const hAni of hAnis) {
                    hAni.handle(cfg, group, rst)
                }
            },
        },
        edge,
    );
    return name
}
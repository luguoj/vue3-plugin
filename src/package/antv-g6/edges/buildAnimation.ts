import {PsrAntvG6Types} from "../../types";
import {CircleRunningHandler} from "./ani-handlers/CircleRunningHandler.ts";
import {AnimationHandler} from "../utils/AnimationHandler.ts";
import {LineDashHandler} from "./ani-handlers/LineDashHandler.ts";
import {LineGrowthHandler} from "./ani-handlers/LineGrowthHandler.ts";
import {ArrowRunningHandler} from "./ani-handlers/ArrowRunningHandler.ts";


export function buildAnimation<AniCfg>(options: {
    type: PsrAntvG6Types.EdgeAnimationType,
    cfg?: AniCfg
}): AnimationHandler<any> {
    switch (options.type) {
        case "circle-running":
            return new CircleRunningHandler(options.cfg as any);
        case "arrow-running":
            return new ArrowRunningHandler(options.cfg as any);
        case "line-dash":
            return new LineDashHandler(options.cfg as any)
        case "line-growth":
            return new LineGrowthHandler(options.cfg as any)
        default:
            throw new Error("不支持的动画类型:" + options.type)
    }
}


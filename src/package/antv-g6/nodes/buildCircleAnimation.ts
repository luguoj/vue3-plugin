import {PsrAntvG6Types} from "../../types";
import {AnimationHandler} from "../utils/AnimationHandler.ts";
import {CircleShadowHandler} from "./ani-handlers/CircleShadowHandler.ts";
import {CircleScaleHandler} from "./ani-handlers/CircleScaleHandler.ts";


export function buildCircleAnimation<AniCfg>(options: {
    type: PsrAntvG6Types.CircleAnimationType,
    cfg?: AniCfg
}): AnimationHandler<any> {
    switch (options.type) {
        case "circle-scale":
            return new CircleScaleHandler(options.cfg as any);
        case "circle-shadow":
            return new CircleShadowHandler(options.cfg as any);
        default:
            throw new Error("不支持的动画类型:" + options.type)
    }
}


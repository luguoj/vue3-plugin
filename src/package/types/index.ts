import {IPluginBaseConfig} from "@antv/g6-plugin/lib/base";
import {ShapeStyle} from "@antv/g6-core";
import {GraphOptions as AntvGraphOptions} from "@antv/g6";
import {CircleRunningAniCfg} from "../antv-g6/edges/ani-handlers/CircleRunningHandler.ts";
import {LineDashAniCfg} from "../antv-g6/edges/ani-handlers/LineDashHandler.ts";

export namespace PsrAntvG6Types {
    export type GraphOptions = Omit<AntvGraphOptions, 'container'>

    export interface MiniMapConfig extends Omit<IPluginBaseConfig, 'container'> {
        viewportClassName?: string;
        type?: 'default' | 'keyShape' | 'delegate';
        size?: number[];
        delegateStyle?: ShapeStyle;
        refresh?: boolean;
        padding?: number;
        hideEdge?: boolean;
    }

    export type EdgeType =
        'line'
        | 'polyline'
        | 'arc'
        | 'quadratic'
        | 'cubic'
        | 'cubic-vertical'
        | 'cubic-horizontal'
        | 'loop'

    export type EdgeAnimationType = 'circle-running' | 'arrow-running' | 'line-dash' | 'line-growth'

    export type CircleAnimationType = 'circle-scale' | 'circle-shadow'

    export namespace AnimationConfig {
        export type CircleRunning = Partial<CircleRunningAniCfg>
        export type LineDash = Partial<LineDashAniCfg>
    }
}
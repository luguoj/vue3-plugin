import {GraphOptions as AntvGraphOptions, ShapeStyle} from "@antv/g6";
import {IPluginBaseConfig} from "@antv/g6-plugin/es/base";
import {CircleRunningAniCfg} from "../services/edges/ani-handlers/CircleRunningHandler.ts";
import {LineDashAniCfg} from "../services/edges/ani-handlers/LineDashHandler.ts";
import {ShallowRef} from "vue";

export namespace PsrAntvG6Types {
    export type GraphOptions = Omit<AntvGraphOptions, 'container'>

    export interface MiniMapConfig extends Omit<IPluginBaseConfig, 'container'> {
        container: ShallowRef<HTMLDivElement | undefined>,
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

    export type NodeType =
        'circle'
        | 'rect'
        | 'ellipse'
        | 'diamond'
        | 'triangle'
        | 'star'
        | 'image'
        | 'modelRect'
        | 'donut'

    type EdgeAnimationType = 'circle-running' | 'arrow-running' | 'line-dash' | 'line-growth'
    export type EdgeExtensionType = EdgeAnimationType
    type NodeAnimationType = 'circle-scale' | 'circle-shadow'
    type NodeOverlayType = 'svg-overlay' | 'el-overlay'
    export type NodeExtensionType = NodeAnimationType | NodeOverlayType

    export namespace AnimationConfig {
        export type CircleRunning = Partial<CircleRunningAniCfg>
        export type LineDash = Partial<LineDashAniCfg>
    }
}
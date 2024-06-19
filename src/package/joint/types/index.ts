import * as joint from "@joint/core";

export namespace PsrJointTypes {
    export type PaperOptions = Omit<joint.dia.Paper.Options, 'el' | 'model'>
}
import {App, getCurrentInstance, inject, onMounted, shallowRef, ShallowRef, watch} from "vue";
import * as JointNs from "@joint/core";
import {PsrJointTypes} from "../types";

const injectKey = 'psr-joint'

export class PsrJoint {
    private static _activeInstance: PsrJoint
    private _joint: Promise<typeof JointNs> | undefined

    joint(): Promise<typeof JointNs> {
        if (!this._joint) {
            this._joint = new Promise((resolve) => {
                // 必须要在onMounted 中调用，否则会导致SSR构建时抛出异常
                onMounted(() => {
                    import("@joint/core").then((joint) => {
                        resolve(joint)
                    })
                })
            })
        }
        return this._joint
    }

    static useJoint() {
        const jointRef = shallowRef<typeof JointNs>()
        PsrJoint.getInstance().joint().then((joint) => {
            jointRef.value = joint
        })
        return jointRef
    }

    static useGraph() {
        const graphRef = shallowRef<JointNs.dia.Graph>()
        PsrJoint.getInstance().joint().then((joint) => {
            graphRef.value = new joint.dia.Graph({}, {
                cellNamespace: {
                    ...joint.shapes
                }
            })
        })
        return graphRef
    }

    static usePaper(
        containerDivRef: ShallowRef<HTMLDivElement | undefined>,
        graphRef: ShallowRef<JointNs.dia.Graph | undefined>,
        options?: PsrJointTypes.PaperOptions
    ) {
        const paperRef = shallowRef<JointNs.dia.Paper>()
        PsrJoint.getInstance().joint().then((joint) => {
            watch(() => ({el: containerDivRef.value, model: graphRef.value}), ({el, model}) => {
                if (el && model) {
                    paperRef.value = new joint.dia.Paper({
                        ...options,
                        el,
                        model
                    })
                } else {
                    paperRef.value = undefined
                }
            }, {immediate: true})
        })
        return paperRef

    }

    private static getInstance(): PsrJoint {
        if (getCurrentInstance())
            return inject<PsrJoint>(injectKey) || PsrJoint._activeInstance
        else return PsrJoint._activeInstance
    }

    static create() {
        return PsrJoint._activeInstance = new PsrJoint()
    }

    install(app: App) {
        app.provide(injectKey, this)
    }
}
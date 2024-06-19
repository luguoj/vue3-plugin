import {defineAsyncComponent} from "vue";

const PsrJoint = defineAsyncComponent(() => import("./Joint.vue"))
export {
    PsrJoint
}

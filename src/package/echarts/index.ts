import {defineAsyncComponent} from "vue";

const PsrEcharts = defineAsyncComponent(() => import("./Echarts.vue"))
export {
    PsrEcharts
}
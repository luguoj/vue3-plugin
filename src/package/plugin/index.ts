import {PsrVue3Echarts} from "../components/echarts"
import {App} from "vue";


export const PsrVue3EchartsPlugin = {
    install: (app: App) => {
        app.component(PsrVue3Echarts.name, PsrVue3Echarts)
    }
}
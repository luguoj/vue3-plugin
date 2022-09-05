import PsrVue3AMap from "./a-map/index.vue"
import {App} from "vue";


export {
    PsrVue3AMap
}

export default {
    install: (app: App) => {
        app.component(PsrVue3AMap.name, PsrVue3AMap)
    }
}
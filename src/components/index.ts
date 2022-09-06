import "@pansy/amap-types";
import PsrVue3AMap from "./a-map/index.vue"
import PsrVue3AMapMarker from "./a-map/Marker.vue"
import {App} from "vue";


export {
    PsrVue3AMap,
    PsrVue3AMapMarker
}

export default {
    install: (app: App) => {
        app.component(PsrVue3AMap.name, PsrVue3AMap)
        app.component(PsrVue3AMapMarker.name, PsrVue3AMapMarker)
    }
}
import "@pansy/amap-types";
import {PsrVue3AMap} from "./components/map"
import {PsrVue3AMapMarker} from "./components/marker"
import {PsrVue3AMapMarkerCluster} from "./components/marker-cluster"
import {PsrVue3AMapLayerBuilding} from "./components/layer/building";
import {App} from "vue";

export * from "./components/map"
export * from "./components/marker"
export * from "./components/marker-cluster"
export * from "./components/layer/building"

export const PsrVue3AMapPlugin = {
    install: (app: App) => {
        app.component(PsrVue3AMap.name, PsrVue3AMap)
        app.component(PsrVue3AMapMarker.name, PsrVue3AMapMarker)
        app.component(PsrVue3AMapMarkerCluster.name, PsrVue3AMapMarkerCluster)
        app.component(PsrVue3AMapLayerBuilding.name, PsrVue3AMapLayerBuilding)
    }
}
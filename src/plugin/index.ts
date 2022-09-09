import {PsrVue3AMap} from "../components/map"
import {PsrVue3AMapMarker} from "../components/marker"
import {PsrVue3AMapMarkerCluster} from "../components/marker-cluster"
import {PsrVue3AMapLayerBuilding} from "../components/layer/building"
import {PsrVue3AMapInfoWindow} from "../components/info-window"
import {PsrVue3AMapLayerThreeJs} from "../components/layer/three-js"
import {App} from "vue";


export const PsrVue3AMapPlugin = {
    install: (app: App) => {
        app.component(PsrVue3AMap.name, PsrVue3AMap)
        app.component(PsrVue3AMapMarker.name, PsrVue3AMapMarker)
        app.component(PsrVue3AMapMarkerCluster.name, PsrVue3AMapMarkerCluster)
        app.component(PsrVue3AMapLayerBuilding.name, PsrVue3AMapLayerBuilding)
        app.component(PsrVue3AMapInfoWindow.name, PsrVue3AMapInfoWindow)
        app.component(PsrVue3AMapLayerThreeJs.name, PsrVue3AMapLayerThreeJs)
    }
}
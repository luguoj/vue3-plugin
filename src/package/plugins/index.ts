import {App} from "vue";
import {PsrVue3DragResize} from '../components/drag-resize'

export const PsrVue3DragResizePlugin = {
    install(app: App) {
        app.component('PsrVue3DragResize', PsrVue3DragResize)
    }
}
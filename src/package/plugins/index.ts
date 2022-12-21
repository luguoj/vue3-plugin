import {App} from "vue";
import {PsrDragResize} from '../components/drag-resize'

export const PsrDragResizePlugin = {
    install(app: App) {
        app.component('PsrDragResize', PsrDragResize)
    }
}
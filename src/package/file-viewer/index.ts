import {defineAsyncComponent} from "vue";
import FileViewer from "./components/FileViewer.vue";
const PsrFileViewer = defineAsyncComponent<typeof FileViewer>(() => import("./components/FileViewer.vue"))
export {
    PsrFileViewer
}
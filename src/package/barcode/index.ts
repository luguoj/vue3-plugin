import {defineAsyncComponent} from "vue";
import Barcode from "./Barcode.vue"
const PsrBarcode = defineAsyncComponent<typeof Barcode>(() => import("./Barcode.vue"))
export {
    PsrBarcode
}

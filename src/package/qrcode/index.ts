import {defineAsyncComponent} from "vue";
import Qrcode from "./Qrcode.vue"
const PsrQrcode = defineAsyncComponent<typeof Qrcode>(() => import("./Qrcode.vue"))
export {
    PsrQrcode
}

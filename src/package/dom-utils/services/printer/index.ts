import {directPrint} from "./directPrint"
import {previewPrint} from "./previewPrint";

export class PsrPrinter {
    static print = directPrint
    static preview = previewPrint
}
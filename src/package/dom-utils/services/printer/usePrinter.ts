import {Ref} from "vue";
import {PrintArea, PrintAreaSettingOptions} from "./PrintArea.ts";

export function usePsrPrinter(elRef: Ref<HTMLElement | undefined>) {
    function print(options: Omit<PrintAreaSettingOptions, 'element' | 'url'>) {
        if (elRef.value) {
            new PrintArea({
                ...options,
                element: elRef.value
            })
        }
    }
    return {print}
}
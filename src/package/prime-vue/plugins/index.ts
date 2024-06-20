import PrimeVue, {PrimeVueLocaleOptions, PrimeVueZIndexOptions} from 'primevue/config';
import {App} from "vue";
import {zhCN} from "../services/locales";
import {filterMatchModeOptions} from "../services/filterMatchModeOptions";

export function usePsrPrimeVue(options?: {
    ripple?: boolean
    inputStyle?: string
    locale?: PrimeVueLocaleOptions
    filterMatchModeOptions?: any
    zIndex?: PrimeVueZIndexOptions
}) {
    return {
        install(app: App) {
            import("./loadStyle").then(({loaded}) => loaded)
            app.use(PrimeVue, {
                locale: zhCN,
                filterMatchModeOptions,
                ...options
            })
        }
    }
}

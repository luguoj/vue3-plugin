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
            import("../styles/themes/index.scss")
            import("primeicons/primeicons.css")
            import("primeflex/primeflex.css")
            app.use(PrimeVue, {
                locale: zhCN,
                filterMatchModeOptions,
                ...options
            })
        }
    }
}

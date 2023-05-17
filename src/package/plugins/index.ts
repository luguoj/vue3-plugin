import PrimeVue from 'primevue/config';
import "primevue/resources/primevue.min.css"
import "primeicons/primeicons.css"
import "primeflex/primeflex.css"
import "../styles/theme_light_dark.scss"
import {App} from "vue";
import {zhCN} from "../services/locales";
import {filterMatchModeOptions} from "../services/filterMatchModeOptions";
import {PsrPrimeVueTypes} from "../types/PsrPrimeVueTypes";

export function usePsrPrimeVue(options?: {
    ripple?: boolean
    inputStyle?: string
    locale?: PsrPrimeVueTypes.LocaleOptions
    filterMatchModeOptions?: any
    zIndex?: PsrPrimeVueTypes.ZIndexOptions
}) {
    return {
        install(app: App) {
            app.use(PrimeVue, {
                locale: zhCN,
                filterMatchModeOptions,
                ...options
            })
        }
    }
}

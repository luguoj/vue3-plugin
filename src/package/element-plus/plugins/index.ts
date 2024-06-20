import {App} from "vue";

export function usePsrElementPlus() {
    return {
        install(app: App) {
            import("./loadStyle").then(({loaded}) => loaded)
        }
    }
}
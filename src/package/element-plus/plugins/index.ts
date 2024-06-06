import {App} from "vue";

export function usePsrElementPlus() {
    return {
        install(app: App) {
            import("element-plus/dist/index.css")
            import("element-plus/theme-chalk/dark/css-vars.css")
        }
    }
}
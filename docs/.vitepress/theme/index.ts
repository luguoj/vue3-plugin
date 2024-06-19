import {App} from "vue";
import DefaultTheme from 'vitepress/theme'
import {ElementPlusContainer} from '@vitepress-demo-preview/component'
import '@vitepress-demo-preview/component/dist/style.css'
import {PsrAMapContext, PsrAntvG6, PsrJoint, usePsrElementPlus, usePsrPrimeVue} from "@psr-framework/vue3-plugin";
import {logger} from "./LoggerService.ts";

export default {
    ...DefaultTheme,
    enhanceApp({app}: { app: App }) {
        app.component('demo-preview', ElementPlusContainer)
        app.use(PsrAMapContext.create({
            key: 'df81bfae67cdda88febe9dcd006a507d',
            version: '2.0'
        }))
        app.use(usePsrPrimeVue())
        app.use(usePsrElementPlus())
        app.use(logger)
        app.use(PsrAntvG6.create())
        app.use(PsrJoint.create())
    }
}
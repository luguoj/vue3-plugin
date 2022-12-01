import {createApp, inject} from 'vue'
import './style.css'
import App from './App.vue'
import {PsrPortalMessageTypes, PsrPortalMessage} from "../package";

const app = createApp(App)
app.use({
    install(app) {
        app.provide<PsrPortalMessageTypes.LogService>("logService", (message) => {
            return new Promise(resolve => {
                setTimeout(() => {
                    console.log('message saved:%o', message)
                    resolve(true)
                }, 1000)
            })
        })
    }
})
app.use(new PsrPortalMessage({
    debugging: true,
    logger: () => inject<PsrPortalMessageTypes.LogService>("logService")!
}))
app.mount('#app')

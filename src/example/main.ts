import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import {createPinia} from "pinia";
import {createPsrPiniaPersist} from "../package";
import {AsyncStorage} from "./asyncStorage";

const app = createApp(App)

const pinia = createPinia()
pinia.use(createPsrPiniaPersist({
    key: (storeKey) => {
        return `pinia-persist/${storeKey}`
    },
    beforeRestore: () => {
        console.log("beforeRestore")
    },
    afterRestore: () => {
        console.log("afterRestore")
    },
    storage: new AsyncStorage()
}))
app.use(pinia)

app.mount('#app')

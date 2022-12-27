import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import {createPinia} from "pinia";
import {createPsrPiniaPersist} from "../package";
import {asyncStorage} from "./asyncStorage";

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
    storage: asyncStorage
}))
app.use(pinia)

app.mount('#app')

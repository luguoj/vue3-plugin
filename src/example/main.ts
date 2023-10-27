import {createApp} from 'vue'
import {createPsrPiniaPersist} from "../package";
import App from './App.vue'
import './style.css'
import {createPinia} from "pinia";
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

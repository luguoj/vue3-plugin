import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import {createPinia} from "pinia";
import {createPsrPiniaPersist} from "../..";

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
    storage: {
        getItem: (key) => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(localStorage.getItem(key))
                }, 5000)
            })
        },
        setItem: (key, value) => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    localStorage.setItem(key, value)
                    resolve(true)
                }, 1000)
            })
        }
    }
}))
app.use(pinia)

app.mount('#app')

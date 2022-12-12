import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import "primevue/resources/primevue.min.css"
import "primeicons/primeicons.css"
import PrimeVue from 'primevue/config';
import {filterMatchModeOptions, zhCN} from "../package";

createApp(App).use(
    PrimeVue, {
        locale: zhCN,
        filterMatchModeOptions
    }
).mount('#app')

import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import {usePsrPrimeVue} from "../package";

createApp(App).use(usePsrPrimeVue()).mount('#app')

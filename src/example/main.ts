import {createApp} from 'vue'
import {usePsrPrimeVue} from "../package";
import App from './App.vue'
import './style.css'
createApp(App).use(usePsrPrimeVue()).mount('#app')

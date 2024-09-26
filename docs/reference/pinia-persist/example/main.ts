import {createApp} from 'vue'
import App from './App.vue'
import './style.css'
import {pinia} from "./pinia";

createApp(App).use(pinia).mount('#app')

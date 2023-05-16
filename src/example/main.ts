import {createApp} from 'vue'
import '../package'
import App from './App.vue'
import './style.css'
import {PsrAntvG6} from "../package";

createApp(App).use(PsrAntvG6.create()).mount('#app')

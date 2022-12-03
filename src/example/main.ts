import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import {logger} from "./SampleMessageService";

const app = createApp(App)
app.use(logger)
app.mount('#app')

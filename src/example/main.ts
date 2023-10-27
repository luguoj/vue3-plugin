import {createApp} from 'vue'
import '../package'
import App from './App.vue'
import './style.css'
import {logger} from "./SampleMessageService";

const app = createApp(App)
app.use(logger)
app.mount('#app')

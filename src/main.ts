import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VNetworkGraph from 'v-network-graph'
import 'v-network-graph/lib/style.css'
import App from './App.vue'
import { i18n } from './i18n'
import './assets/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(i18n)
app.use(VNetworkGraph)
app.mount('#app')

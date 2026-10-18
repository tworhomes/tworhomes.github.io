import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { vTilt, initGlobalCardTilt } from './composables/useCardTilt'

const app = createApp(App)

app.directive('tilt', vTilt)
app.use(router)

app.mount('#app')

initGlobalCardTilt()

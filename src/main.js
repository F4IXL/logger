import { createApp } from 'vue'
import router from './router/index'
import { store } from './store/index'
import App from './App.vue'

// Tailwind
import './index.css'

import { useRegisterSW } from 'virtual:pwa-register/vue'

createApp(App)
  .use(router)
  .use(store)
  .mount('#app')

const { offlineReady } = useRegisterSW()

console.log('offline ready: ', offlineReady)

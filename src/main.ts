import { createSSRApp } from 'vue'
import { createPinia } from 'pinia'
import i18n from '@/language'
import App from './App.vue'
import 'animate.css'

const pinia = createPinia()

export function createApp() {
  const app = createSSRApp(App)
  app.use(pinia)
  app.use(i18n)
  return {
    app
  }
}

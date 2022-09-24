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
  app.config.globalProperties.$onLaunched = new Promise(resolve => {
    app.config.globalProperties.$isResolve = resolve
  })
  return {
    app
  }
}

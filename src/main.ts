import { createSSRApp } from "vue";
import App from "./App.vue";
//引入pinia
import { createPinia } from 'pinia'
//pinia持久化插件
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import '@/assets/font/font.scss'

export function createApp() {
  const app = createSSRApp(App);

  const pinia = createPinia()
  pinia.use(piniaPluginPersistedstate)
  app.use(pinia)
  
  return {
    app,
  };
}

import { createApp } from 'vue'
import 'normalize.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import piniaPluginPersist from 'pinia-plugin-persist';
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './routes'

const app =  createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

const store = createPinia();
store.use(piniaPluginPersist);
app
.use(router)
.use(store)
.use(ElementPlus)
.mount('#app')

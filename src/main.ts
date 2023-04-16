import { createApp } from 'vue'
import 'normalize.css'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import piniaPluginPersist from 'pinia-plugin-persist';
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './routes'

const app =  createApp(App)

const store = createPinia();
store.use(piniaPluginPersist);
app
.use(router)
.use(store)
.use(Antd)
.mount('#app')

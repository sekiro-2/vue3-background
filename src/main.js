import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import setupPlugins from "@/plugins";
import App from './App.vue'
import '@/styles/index.scss'
import 'element-plus/dist/index.css'
import 'animate.css';
const app = createApp(App)
// 注册插件
app.use(setupPlugins);
app.use(ElementPlus)
app.mount('#app')

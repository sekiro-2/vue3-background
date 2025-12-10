import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import setupPlugins from "@/plugins";
import App from './App.vue'
import '@/styles/index.scss'
import 'element-plus/dist/index.css'
import 'animate.css';
import 'uno.css'
import('./mock/employTable');


const app = createApp(App)
// 自动注册 Icon 组件
const modules = import.meta.glob('@/components/Icon/*.vue', { eager: true })
Object.entries(modules).forEach(([path, module]) => {
  // 获取组件名：DeleteIcon.vue -> DeleteIcon
  const name = path.split('/').pop()?.replace('.vue', '')
  if (name && module?.default) {
    app.component(name, module.default)
  }
})


// 注册插件
app.use(setupPlugins);
app.use(ElementPlus)
app.mount('#app')

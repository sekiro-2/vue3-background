
import { createPinia } from "pinia";
import piniaPluginPersist from "pinia-plugin-persistedstate";
const store = createPinia();
// 持久化挂载
store.use(piniaPluginPersist);

// 全局注册 store
export function setupStore(app) {
  app.use(store);
}

export * from "./modules/router.store";


export { store };

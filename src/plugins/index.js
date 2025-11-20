

import { setupRouter } from "@/router";
import { setupStore } from "@/store";
;

export default {
  install(app) {
    // 路由(router)
    setupRouter(app);
    // 状态管理(store)
    setupStore(app);
    

  },
};

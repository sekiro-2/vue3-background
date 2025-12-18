# 后台企业管理平台（Vue 3 + Vite）

一个基于 Vue 3、Vite、Element Plus、Pinia、UnoCSS、ECharts 的后台企业管理模板，内置 Mock 数据与基础路由/状态管理/UI 模块，适合学习与业务快速搭建。

## 技术栈
- 框架：Vue 3
- 构建：Vite 7
- UI：Element Plus
- 状态：Pinia + `pinia-plugin-persistedstate`
- 样式：SCSS + UnoCSS
- 图表：ECharts + `vue-echarts`
- 网络：Axios（统一封装于 `src/utils/http.js`）
- 模拟数据：Mock.js（仅开发环境加载）

## 功能模块
- 仪表盘：公告滚动、常用图表展示
- 组织人事：部门管理、员工管理、角色与权限
- 考勤管理：打卡记录、排班管理、请假管理
- 系统工具/设置：基础路由占位，便于扩展
- 错误页：401/404

## 目录结构
- `src/Layout`：通用布局（侧栏/顶部/标签栏）
- `src/router`：路由与导航守卫（进度条）
- `src/stores`：Pinia 模块（持久化）
- `src/apis`：API 封装（调用 `utils/http`）
- `src/mock`：Mock 数据与路由（仅开发环境）
- `src/utils`：工具方法（日期、导出、消息、树形等）
- `src/components`：通用组件（图标、ECharts、滚动卡片等）
- `src/views`：业务页面（仪表盘/组织人事/考勤等）

## 环境与运行
- Node：`^20.19.0 || >=22.12.0`
- 安装依赖：
```powershell
npm install
```
- 启动开发：
```powershell
npm run dev
```
- 构建生产：
```powershell
npm run build
```
- 预览生产：
```powershell
npm run preview
```
- 代码检查：
```powershell
npm run lint
```

## 接口与环境变量
- 开发环境默认走 Mock，生产环境不会加载 Mock：见 `src/main.js`
- 后端地址通过环境变量配置：`VITE_API_BASE_URL`
- 可选开发代理目标：`VITE_PROXY_TARGET`（自动代理 `/api`）

## 开发约定
- 组件命名：使用 `defineOptions({ name })`，保持多词组件名规范
- 路由：`meta.keepAlive` 控制页面缓存；进度条由 `NProgress` 管理
- 状态：Pinia 模块按功能拆分，必要状态持久化到 `localStorage`
- 网络：统一使用 `src/utils/http.js`，返回值为后端响应的 `data`
- 样式：全局样式位于 `src/styles/index.scss`，支持 UnoCSS 原子类

## 构建优化
- 生产构建对大依赖进行拆包（Vue/Element/ECharts），优化首屏加载
- 关闭 `sourcemap`，减小产物体积（如需排查上线问题可打开）

## 致谢
本项目基于 Vite 官方模板扩展，感谢社区生态提供的优秀工具。

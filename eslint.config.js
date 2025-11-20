import { defineConfig } from 'eslint/config'
import globals from 'globals'
import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

export default defineConfig([
  {
    name: 'app/files-to-lint',
    files: ['**/*.{js,mjs,jsx,vue}'],
  },

  // ✅ 忽略的文件要写成独立配置对象
  {
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
  },

  // ✅ Vue + JS 推荐配置
  js.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  skipFormatting,

  // ✅ 自定义规则和全局变量
  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      // 关闭单词名限制（允许 index.vue / menu.vue）
      'vue/multi-word-component-names': 'off',
    },
  },
])

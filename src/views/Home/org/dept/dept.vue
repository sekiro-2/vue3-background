<script setup>
import { ref } from 'vue'

// 模拟数据
const departments = ref([
  {
    id: '1001',
    name: '财务部',
    parent: '总公司',
    headcount: 25,
    status: '启用',
    created: '2023-01-01',
    manager: '王经理',
  },
  {
    id: '1002',
    name: '人事部',
    parent: '总公司',
    headcount: 15,
    status: '启用',
    created: '2023-01-01',
    manager: '李经理',
  },
])

const isModalOpen = ref(false)

const openModal = () => {
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}
</script>

<template>
  <div class="p-4 bg-gray-50 min-h-screen">
    <h1 class="text-2xl font-bold mb-4">部门管理</h1>

    <!-- 顶栏操作区 -->
    <div class="flex justify-between items-center mb-4 p-4 bg-white shadow-sm rounded-lg">
      <div class="flex items-center space-x-4">
        <!-- 搜索框 -->
        <input
          type="text"
          placeholder="搜索 [部门名称/编号/负责人]"
          class="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <!-- 筛选条件 -->
        <button class="p-2 border border-gray-300 rounded-md hover:bg-gray-100">筛选条件 ▼</button>
      </div>
      <div class="flex items-center space-x-4">
        <!-- 添加部门 -->
        <button
          @click="openModal"
          class="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          添加部门 +
        </button>
        <!-- 导入/导出 -->
        <button class="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition">
          导入部门
        </button>
        <button class="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition">
          导出部门
        </button>
      </div>
    </div>

    <!-- 主内容区：左右布局 -->
    <div class="flex gap-4">
      <!-- 左侧部门树 -->
      <div class="w-1/4 bg-white p-4 shadow-sm rounded-lg min-h-[60vh]">
        <h2 class="font-semibold mb-3">左侧部门树</h2>
        <ul class="space-y-1 text-sm">
          <li>
            <strong>- 总公司</strong>
            <ul class="pl-4 space-y-1">
              <li>- 财务部</li>
              <li>- 人事部</li>
              <li>
                - 技术部
                <ul class="pl-4 space-y-1">
                  <li>- 前端组</li>
                  <li>- 后端组</li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </div>

      <!-- 右侧部门列表表格 -->
      <div class="w-3/4 bg-white p-4 shadow-sm rounded-lg">
        <h2 class="font-semibold mb-3">右侧部门列表表格</h2>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  部门名称
                </th>
                <th
                  class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  编号
                </th>
                <th
                  class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  负责人
                </th>
                <th
                  class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  上级部门
                </th>
                <th
                  class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  人数
                </th>
                <th
                  class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  状态
                </th>
                <th
                  class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  创建时间
                </th>
                <th
                  class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  操作
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="dept in departments" :key="dept.id" class="hover:bg-gray-50">
                <td class="px-4 py-2 whitespace-nowrap">{{ dept.name }}</td>
                <td class="px-4 py-2 whitespace-nowrap">{{ dept.id }}</td>
                <td class="px-4 py-2 whitespace-nowrap">{{ dept.manager }}</td>
                <td class="px-4 py-2 whitespace-nowrap">{{ dept.parent }}</td>
                <td class="px-4 py-2 whitespace-nowrap">{{ dept.headcount }}</td>
                <td class="px-4 py-2 whitespace-nowrap">
                  <span
                    :class="{
                      'px-2 inline-flex text-xs leading-5 font-semibold rounded-full': true,
                      'bg-green-100 text-green-800': dept.status === '启用',
                      'bg-red-100 text-red-800': dept.status === '禁用',
                    }"
                  >
                    {{ dept.status }}
                  </span>
                </td>
                <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                  {{ dept.created }}
                </td>
                <td class="px-4 py-2 whitespace-nowrap text-sm font-medium">
                  <button @click="openModal" class="text-blue-600 hover:text-blue-900 mr-3">
                    编辑
                  </button>
                  <button class="text-red-600 hover:text-red-900 mr-3">删除</button>
                  <button class="text-indigo-600 hover:text-indigo-900">查看下级</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- 分页控件 -->
        <div class="mt-4 flex justify-between items-center">
          <span class="text-sm text-gray-700">显示 1 到 10 项，共 50 项</span>
          <div class="flex space-x-1">
            <button class="px-3 py-1 border rounded-md hover:bg-gray-100">上一页</button>
            <button class="px-3 py-1 border rounded-md bg-blue-600 text-white">1</button>
            <button class="px-3 py-1 border rounded-md hover:bg-gray-100">2</button>
            <button class="px-3 py-1 border rounded-md hover:bg-gray-100">下一页</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 弹窗/详情页（新增/编辑部门） -->
    <div
      v-if="isModalOpen"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <div class="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg">
        <h2 class="text-xl font-semibold mb-4">新增/编辑部门</h2>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">部门名称：</label>
            <input type="text" class="mt-1 block w-full border border-gray-300 rounded-md p-2" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">上级部门：</label>
            <!-- 模拟树状下拉选框 -->
            <select class="mt-1 block w-full border border-gray-300 rounded-md p-2">
              <option>--请选择--</option>
              <option>总公司</option>
              <option>-- 财务部</option>
              <option>-- 人事部</option>
              <option>-- 技术部</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">部门编号：</label>
            <input type="text" class="mt-1 block w-full border border-gray-300 rounded-md p-2" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">部门负责人：</label>
            <input type="text" class="mt-1 block w-full border border-gray-300 rounded-md p-2" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">描述/备注：</label>
            <textarea
              class="mt-1 block w-full border border-gray-300 rounded-md p-2"
              rows="3"
            ></textarea>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">状态：</label>
            <div class="mt-1 flex items-center space-x-4">
              <label class="flex items-center">
                <input type="radio" name="status" value="启用" checked class="form-radio" />
                <span class="ml-2">启用</span>
              </label>
              <label class="flex items-center">
                <input type="radio" name="status" value="禁用" class="form-radio" />
                <span class="ml-2">禁用</span>
              </label>
            </div>
          </div>
        </div>
        <div class="mt-6 flex justify-end space-x-3">
          <button
            @click="closeModal"
            class="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
          >
            取消
          </button>
          <button class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            保存
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

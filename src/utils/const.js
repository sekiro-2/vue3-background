import { ref } from "vue"

// 图表数据
export const lineOption = {
  title: {
    text: '员工入职/离职趋势',
    left: '20px',
    top: '20px',
    textStyle: {
      color: '#235894',
      fontSize: 24,
    },
  },
  tooltip: {
    trigger: 'axis',
  },
  legend: {
    data: ['入职人数', '离职人数'],
    top: '60px',
    textStyle: {
      fontSize: 14,
    },
  },
  grid: {
    show: true,
    top: '16%',
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true,
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
  },
  yAxis: {
    type: 'value',
    name: '人数',
  },
  color: ['#3b82f6', '#ef4444'], // 入职/离职颜色
  series: [
    {
      name: '入职人数',
      type: 'line',
      smooth: true,
      data: [50, 60, 80, 70, 90, 100, 120, 110, 130, 150, 140, 160],
      areaStyle: {},
    },
    {
      name: '离职人数',
      type: 'line',
      smooth: true,
      data: [20, 25, 30, 28, 35, 40, 38, 42, 45, 50, 48, 55],
      areaStyle: {},
    },
  ],
}


export const pieOption = {
  title: {
    top: '20px',
    left: '20px',
    text: '公司人员分布',
    textStyle: {
      color: '#235894',
      fontSize: 24,
    },
  },
  tooltip: {
    trigger: 'item',
  },
  legend: {
    orient: 'vertical',
    left: '5%',
  },
  series: [
    {
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      label: {
        show: false,
        position: 'center',
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 20,
          fontWeight: 'bold',
        },
      },
      labelLine: {
        show: false,
      },
      data: [
        { value: 5222, name: '企业总人数' },
        { value: 4164, name: '正式员工' },
        { value: 2323, name: '合同待签署' },
        { value: 252, name: '待入职' },
        { value: 112, name: '本月待转正' },
        { value: 137, name: '本月待离职' },
      ],
    },
  ],
}
export const treeOption = {
  title: {
    text: '公司组织架构',
    left: '20px',
    top: '20px',
    textStyle: {
      color: '#235894',
      fontSize: 24,
    },
  },
  tooltip: {
    trigger: 'item',
    triggerOn: 'mousemove',
    formatter: '{b}', // 鼠标悬停显示节点名称
  },
  series: [
    {
      type: 'tree',
      data: [
        {
          name: '公司',
          children: [
            {
              name: '技术部',
              children: [{ name: '前端组' }, { name: '后端组' }],
            },
            {
              name: '产品部',
              children: [{ name: '产品经理组' }, { name: '设计组' }],
            },
            {
              name: '运营部',
              children: [{ name: '市场组' }, { name: '客服组' }],
            },
          ],
        },
      ],
      top: '10%',
      left: '10%',
      bottom: '10%',
      right: '10%',
      symbol: 'circle',
      symbolSize: 10,
      label: {
        position: 'left',
        verticalAlign: 'middle',
        align: 'right',
        fontSize: 14,
        color: '#333',
      },
      leaves: {
        label: {
          position: 'right',
          verticalAlign: 'middle',
          align: 'left',
        },
      },
      expandAndCollapse: true, // 可折叠
      animationDuration: 550,
      animationDurationUpdate: 750,
    },
  ],
}

export const radarOption = {
  title: {
    text: '公司核心能力雷达图',
    left: '20px',
    top: '20px',
    textStyle: {
      color: '#235894',
      fontSize: 24,
    }
  },
  tooltip: {
    trigger: 'item'
  },
  radar: {
    shape: 'polygon',
    radius: '65%',
    indicator: [
      { name: '组织管理能力', max: 100 },
      { name: '人力资源能力', max: 100 },
      { name: '运营管理能力', max: 100 },
      { name: '财务管控能力', max: 100 },
      { name: '创新发展能力', max: 100 },
      { name: '风险控制能力', max: 100 }
    ],
    axisName: {
      color: '#333',
      fontSize: 12
    },
    splitLine: {
      lineStyle: {
        color: 'rgba(0,0,0,0.2)'
      }
    },
    splitArea: {
      areaStyle: {
        color: ['#f8f8f8', '#ffffff']
      }
    },
    axisLine: {
      lineStyle: {
        color: '#ccc'
      }
    }
  },
  series: [
    {
      name: '企业能力评分',
      type: 'radar',
      areaStyle: {
        opacity: 0.25
      },
      lineStyle: {
        width: 2
      },
      symbol: 'circle',
      symbolSize: 6,
      data: [
        {
          value: [85, 78, 92, 88, 74, 69],
          name: '公司能力得分'
        }
      ]
    }
  ]
}

// 员工筛选数据

export const deptStaffOptions = [
  { label: '全部部门', value: 'all' },
  { label: '人力资源部', value: 'hr' },
  { label: '行政部', value: 'admin' },
  { label: '财务部', value: 'finance' },
  { label: '市场部', value: 'marketing' },
  { label: '销售部', value: 'sales' },
  { label: '研发部', value: 'rd' },
  { label: '产品部', value: 'product' },
  { label: '技术支持部', value: 'support' },
  { label: '运营部', value: 'operation' },

]
export const statusStaffOptions = [
  { label: '所有状态', value: 'all' },
  { label: '在职', value: 'active' },
  { label: '试用期', value: 'probation' },
  { label: '休假', value: 'leave' },
  { label: '离职', value: 'resigned' }
];
// 员工数据
export const deptTableData = ref([
  {
    id: '1',
    name: '张明',
    email: 'zhangming@example.com',
    phone: '13800138001',
    department: '技术部',
    position: '前端开发工程师',
    hireDate: '2022-06-15',
    status: '在职',
  },
  {
    id: '2',
    name: '李丽',
    email: 'lili@example.com',
    phone: '13800138002',
    department: '技术部',
    position: '后端开发工程师',
    hireDate: '2021-08-10',
    status: '在职',
  },
  {
    id: '3',
    name: '王强',
    email: 'wangqiang@example.com',
    phone: '13800138003',
    department: '人力资源部',
    position: 'HR专员',
    hireDate: '2023-01-05',
    status: '试用期',
  },
  {
    id: '4',
    name: '赵敏',
    email: 'zhaomin@example.com',
    phone: '13800138004',
    department: '市场部',
    position: '市场专员',
    hireDate: '2020-12-20',
    status: '在职',
  },
  {
    id: '5',
    name: '孙浩',
    email: 'sunhao@example.com',
    phone: '13800138005',
    department: '技术部',
    position: '测试工程师',
    hireDate: '2022-03-18',
    status: '休假',
  },
  {
    id: '6',
    name: '周婷',
    email: 'zhouting@example.com',
    phone: '13800138006',
    department: '产品部',
    position: '产品经理',
    hireDate: '2021-07-25',
    status: '在职',
  },
  {
    id: '7',
    name: '吴磊',
    email: 'wulei@example.com',
    phone: '13800138007',
    department: '运营部',
    position: '运营专员',
    hireDate: '2023-02-15',
    status: '在职',
  },
  {
    id: '8',
    name: '陈晨',
    email: 'chenchen@example.com',
    phone: '13800138008',
    department: '财务部',
    position: '财务专员',
    hireDate: '2022-11-01',
    status: '在职',
  },
  {
    id: '9',
    name: '刘洋',
    email: 'liuyang@example.com',
    phone: '13800138009',
    department: '技术部',
    position: '运维工程师',
    hireDate: '2020-09-30',
    status: '离职',
  },
  {
    id: '10',
    name: '何静',
    email: 'hejing@example.com',
    phone: '13800138010',
    department: '行政部',
    position: '行政助理',
    hireDate: '2021-04-12',
    status: '在职',
  }
]
)

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
    textStyle: { color: '#235894', fontSize: 24, fontWeight: 'bold' },
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
              name: '人力资源部',
              children: [
                { name: 'HR专员' },
              ],
            },
            {
              name: '行政部',
              children: [
                { name: '行政助理' },
              ],
            },
            {
              name: '财务部',
              children: [
                { name: '财务专员' },
              ],
            },
            {
              name: '市场部',
              children: [
                { name: '市场专员' },
              ],
            },
            {
              name: '销售部',
              children: [
                { name: '销售代表' },
              ],
            },
            {
              name: '研发部',
              children: [
                { name: '前端开发工程师' },
                { name: '后端开发工程师' },
                { name: '测试工程师' },
              ],
            },
            {
              name: '产品部',
              children: [
                { name: '产品经理' },
                { name: 'UI/UX 设计师' },
              ],
            },
            {
              name: '技术支持部',
              children: [
                { name: '技术支持工程师' },
                { name: '运维工程师' },
              ],
            },
            {
              name: '运营部',
              children: [
                { name: '运营专员' },
              ],
            },
          ],
        },
      ],

      left: '10%',
      bottom: '10%',
      right: '20%',
      symbol: 'circle',
      symbolSize: 12,
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
          fontSize: 12,
          color: '#555',
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
  { label: '人力资源部', value: '人力资源部', children: [] },
  { label: '行政人事部', value: '行政人事部' },
  { label: '财务部', value: '财务部' },
  { label: '市场部', value: '市场部' },
  { label: '销售部', value: '销售部' },
  { label: '研发部', value: '研发部' },
  { label: '产品部', value: '产品部' },
  { label: '技术支持部', value: '技术支持部' },
  { label: '运营部', value: '运营部' },
]


export const positionOptions = [
  { label: '前端开发工程师', value: '前端开发工程师' },
  { label: '后端开发工程师', value: '后端开发工程师' },
  { label: '测试工程师', value: '测试工程师' },
  { label: '产品经理', value: '产品经理' },
  { label: 'UI/UX 设计师', value: 'UI/UX 设计师' },
  { label: '运维工程师', value: '运维工程师' },
  { label: 'HR专员', value: 'HR专员' },
  { label: '行政助理', value: '行政助理' },
  { label: '财务专员', value: '财务专员' },
  { label: '销售代表', value: '销售代表' },
  { label: '市场专员', value: '市场专员' },
  { label: '技术支持工程师', value: '技术支持工程师' },
  { label: '运营专员', value: '运营专员' },
]


export const statusStaffOptions = [
  { label: '在职', value: '在职' },
  { label: '试用期', value: '试用期' },
  { label: '休假', value: '休假' },
  { label: '离职', value: '离职' },
]

export const statusDeptOptions = [
  { label: '启用', value: '启用' },
  { label: '停用', value: '停用' },

]


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
      fontSize: '30',
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

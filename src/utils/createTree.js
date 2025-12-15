
export function listToTree(list) {
  const map = new Map()
  const tree = []

  // 1️ 创建“公司”根节点
  map.set('公司', {
    label: '公司',
    children: [],
  })
  tree.push(map.get('公司'))

  // 2️ 先收集所有 dept / parentDept 作为节点
  list.forEach((item) => {
    if (item.status === '启用') {
      if (!map.has(item.dept)) {
        map.set(item.dept, {
          label: item.dept,
          children: [],
          value: item.dept
        })
      }
      if (!map.has(item.parentDept)) {
        map.set(item.parentDept, {
          label: item.parentDept,
          children: [],
          value: item.parentDept
        })
      }
    }

  })
  // 3️ 建立父子关系
  list.forEach((item) => {
    const parent = map.get(item.parentDept)
    const child = map.get(item.dept)
    if (parent && child && parent !== child) {
      // 防止重复添加
      if (!parent.children.includes(child)) {
        parent.children.push(child)
      }
    }
  })
  return tree
}

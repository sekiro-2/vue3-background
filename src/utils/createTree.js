

export function createDeptTree(list) {
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
export const createRoleTree = (constantRoutes) => {
  const map = new Map()
  const tree = []
  constantRoutes.forEach((item) => {
    if (item.meta?.hidden !== true) {
      if (!map.has(item.meta.title)) {
        if (item?.children?.length > 0) {
          map.set(item.meta.title, {
            label: item.meta.title,
            children: item?.children || [],
          })
        } else {
          map.set(item.meta.title, {
            label: item.meta.title,
          })
        }
      }
      // console.log(item)
      // console.log(map)
    }
  })

  map.forEach((value, key) => {
    tree.push(value)
    // console.log(value)
    if (value.children) {
      const subTree = createRoleTree(value.children)
      map.get(key).children = subTree
      // console.log(subTree)
    }
  })
  return tree
}

export const creatDashboardTree = (constantRoutes) => {
  const map = new Map()
  const tree = []
  constantRoutes.forEach((item) => {
    if (item.meta?.hidden !== true) {
      if (!map.has(item.meta.title)) {
        if (item?.children?.length > 0) {
          map.set(item.meta.title, {
            name: item.meta.title,
            children: item?.children || [],
          })
        } else {
          map.set(item.meta.title, {
            name: item.meta.title,
          })
        }
      }
      // console.log(item)
      // console.log(map)
    }
  })

  map.forEach((value, key) => {
    tree.push(value)
    // console.log(value)
    if (value.children) {
      const subTree = createRoleTree(value.children)
      map.get(key).children = subTree
      // console.log(subTree)
    }
  })
  return tree
}

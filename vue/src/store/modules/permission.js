import auth from '@/plugins/auth'
import router, { constantRoutes, dynamicRoutes } from '@/router'
import { getRouters } from '@/api/menu'
import Layout from '@/layout/index'
import ParentView from '@/components/ParentView'
import InnerLink from '@/layout/components/InnerLink'

// 匹配views里面所有的.vue文件
const modules = import.meta.glob('./../../views/**/*.vue')

const usePermissionStore = defineStore(
  'permission',
  {
    state: () => ({
      routes: [],
      addRoutes: [],
      defaultRoutes: [],
      topbarRouters: [],
      sidebarRouters: []
    }),
    actions: {
      setRoutes(routes) {
        this.addRoutes = routes
        this.routes = constantRoutes.concat(routes)
      },
      setDefaultRoutes(routes) {
        this.defaultRoutes = constantRoutes.concat(routes)
      },
      setTopbarRoutes(routes) {
        this.topbarRouters = routes
      },
      setSidebarRouters(routes) {
        this.sidebarRouters = routes
      },
      generateRoutes(roles) {
        return new Promise(resolve => {
          // 向后端请求路由数据
          getRouters().then(res => {
            function removeGen(list) {
              for (let i = list.length - 1; i >= 0; i--) {
                const route = list[i];
                const title = route.meta && route.meta.title;
                const path = route.path || '';
                const comp = route.component || '';
                const isGen = path.startsWith('/tool/gen') || (comp && comp.includes('tool/gen')) || (title && title.includes('代码生成'));
                if (isGen) {
                  list.splice(i, 1);
                  continue;
                }
                if (route.children && route.children.length > 0) {
                  removeGen(route.children);
                }
              }
            }
            removeGen(res.data);

            const hideSystemMenus = (list) => {
              const hideTitles = ['菜单管理', '部门管理', '岗位管理', '字典管理', '参数设置', '文件管理'];
              const hideRootTitles = ['系统监控', '监控管理'];
              const normalize = (val) => String(val ?? '').trim();
              const shouldHide = (title, targets) => {
                const text = normalize(title);
                if (!text) return false;
                return targets.some((t) => text === t || text.includes(t));
              };
              list.forEach(route => {
                if (route.meta && shouldHide(route.meta.title, hideRootTitles)) {
                  route.hidden = true;
                }
                if (route.meta && route.meta.title === '系统管理' && route.children && route.children.length) {
                  route.children.forEach(child => {
                    if (child.meta && shouldHide(child.meta.title, hideTitles)) {
                      child.hidden = true;
                    }
                  });
                }
                if (route.children && route.children.length) {
                  hideSystemMenus(route.children);
                }
              });
            };
            hideSystemMenus(res.data);
            // ---------------------------------------------------------
            // 任务：将入库、出库、移库、盘库提升为一级菜单（不挂在“仓库管理”下）
            // ---------------------------------------------------------
            const targetComponents = [
              'wms/order/receipt/index',   // 入库
              'wms/order/shipment/index',  // 出库
              'wms/order/movement/index',  // 移库
              'wms/order/check/index'      // 盘库
            ];
            
            const warehouseChildren = [];
            
            // 递归查找并提取目标路由
            function extractRoutes(list) {
              for (let i = list.length - 1; i >= 0; i--) {
                const route = list[i];
                
                // 1. 检查当前路由是否是目标组件
                if (route.component && targetComponents.includes(route.component)) {
                  // 修复路径：如果是 index，改为更有意义的路径，避免冲突
                  if (route.path === 'index' || route.path === '') {
                     if (route.component.includes('receipt')) route.path = 'receipt';
                     else if (route.component.includes('shipment')) route.path = 'shipment';
                     else if (route.component.includes('movement')) route.path = 'movement';
                     else if (route.component.includes('check')) route.path = 'check';
                  }
                  warehouseChildren.push(route);
                  list.splice(i, 1);
                  continue;
                }
                
                // 2. 检查子路由
                if (route.children && route.children.length > 0) {
                  extractRoutes(route.children);
                  
                  // 如果父节点（通常是Layout）变空了，且不是系统根节点，则移除
                  // 注意：这里简单判断，如果原来的父节点只是为了包裹这一个子节点，现在空了就删掉
                  if (route.children.length === 0 && route.component === 'Layout') {
                    list.splice(i, 1);
                  }
                }
              }
            }
            
            extractRoutes(res.data);
            
            // 如果找到了目标菜单，创建 4 个一级菜单
            if (warehouseChildren.length > 0) {
              // 按顺序排序: 入库 -> 出库 -> 移库 -> 盘库
              warehouseChildren.sort((a, b) => {
                const indexA = targetComponents.indexOf(a.component);
                const indexB = targetComponents.indexOf(b.component);
                return indexA - indexB;
              });

              const getMenuTitle = (component) => {
                if (component.includes('receipt')) return '入库'
                if (component.includes('shipment')) return '出库'
                if (component.includes('movement')) return '移库'
                if (component.includes('check')) return '盘库'
                return '仓库作业'
              }

              const getTopLevelPath = (component) => {
                if (component.includes('receipt')) return '/receipt'
                if (component.includes('shipment')) return '/shipment'
                if (component.includes('movement')) return '/movement'
                if (component.includes('check')) return '/check'
                return '/warehouse-op'
              }

              const topLevelMenus = warehouseChildren.map((child) => {
                const title = getMenuTitle(child.component || '')
                const topPath = getTopLevelPath(child.component || '')
                const childMeta = child.meta || {}

                const normalizedChild = {
                  ...child,
                  path: '',
                  meta: {
                    ...childMeta,
                    title
                  }
                }

                return {
                  path: topPath,
                  component: 'Layout',
                  hidden: false,
                  redirect: 'noRedirect',
                  meta: {
                    title,
                    icon: childMeta.icon || 'example',
                    noCache: false
                  },
                  children: [normalizedChild]
                }
              })

              res.data.splice(1, 0, ...topLevelMenus);
            }
            // ---------------------------------------------------------
            
            const sdata = JSON.parse(JSON.stringify(res.data))
            const rdata = JSON.parse(JSON.stringify(res.data))
            const defaultData = JSON.parse(JSON.stringify(res.data))
            const sidebarRoutes = filterAsyncRouter(sdata)
            const rewriteRoutes = filterAsyncRouter(rdata, false, true)
            const defaultRoutes = filterAsyncRouter(defaultData)
            const asyncRoutes = filterDynamicRoutes(dynamicRoutes)
            asyncRoutes.forEach(route => { router.addRoute(route) })
            this.setRoutes(rewriteRoutes)
            this.setSidebarRouters(constantRoutes.concat(sidebarRoutes))
            this.setDefaultRoutes(sidebarRoutes)
            this.setTopbarRoutes(defaultRoutes)
            resolve(rewriteRoutes)
          })
        })
      }
    }
  })

// 遍历后台传来的路由字符串，转换为组件对象
function filterAsyncRouter(asyncRouterMap, lastRouter = false, type = false) {
  return asyncRouterMap.filter(route => {
    if (type && route.children) {
      route.children = filterChildren(route.children)
    }
    if (route.component) {
      // Layout ParentView 组件特殊处理
      if (route.component === 'Layout') {
        route.component = Layout
      } else if (route.component === 'ParentView') {
        route.component = ParentView
      } else if (route.component === 'InnerLink') {
        route.component = InnerLink
      } else {
        route.component = loadView(route.component)
      }
    }
    if (route.children != null && route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children, route, type)
    } else {
      delete route['children']
      delete route['redirect']
    }
    return true
  })
}

function filterChildren(childrenMap, lastRouter = false) {
  var children = []
  childrenMap.forEach((el, index) => {
    if (el.children && el.children.length) {
      if (el.component === 'ParentView' && !lastRouter) {
        el.children.forEach(c => {
          c.path = el.path + '/' + c.path
          if (c.children && c.children.length) {
            children = children.concat(filterChildren(c.children, c))
            return
          }
          children.push(c)
        })
        return
      }
    }
    if (lastRouter) {
      el.path = lastRouter.path + '/' + el.path
      if (el.children && el.children.length) {
        children = children.concat(filterChildren(el.children, el))
        return
      }
    }
    children = children.concat(el)
  })
  return children
}

// 动态路由遍历，验证是否具备权限
export function filterDynamicRoutes(routes) {
  const res = []
  routes.forEach(route => {
    if (route.permissions) {
      if (auth.hasPermiOr(route.permissions)) {
        res.push(route)
      }
    } else if (route.roles) {
      if (auth.hasRoleOr(route.roles)) {
        res.push(route)
      }
    }
  })
  return res
}

export const loadView = (view) => {
  let res;
  for (const path in modules) {
    const dir = path.split('views/')[1].split('.vue')[0];
    if (dir === view) {
      res = () => modules[path]();
    }
  }
  return res;
}

export default usePermissionStore

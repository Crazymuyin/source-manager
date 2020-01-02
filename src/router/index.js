import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const constantRouterMap = [
  {
    path: '/login',
    name: 'Login',
    component: (resolve) => require(['../components/login/login'], resolve)
  }, {
    path: '/',
    name: '首页',
    component: (resolve) => require(['../components/layout'], resolve),
    children: [{
      path: '',
      name: '主页',
      component: (resolve) => require(['../components/Index'], resolve)
    }, {
      path: '/sourceAdd/sourceCount',
      name: '信源添加统计',
      component: (resolve) => require(['../components/sourceAdd/sourceCount'], resolve)
    }, {
      path: '/sourceAdd/mySource',
      name: '我的信源',
      component: (resolve) => require(['../components/sourceAdd/mySource'], resolve)
    }, {
      path: '/sourceAdd/addSource',
      name: '添加信源',
      component: (resolve) => require(['../components/sourceAdd/addSource'], resolve)
    }, {
      path: '/sourceAdd/updateSource',
      name: '信源修改',
      component: (resolve) => require(['../components/sourceAdd/updateSource'], resolve)
    }, {
      path: '/sourceAdd/importSource',
      name: '导入信源',
      component: (resolve) => require(['../components/sourceAdd/importSource'], resolve)
    }, {
      path: '/sourceWrite/writeSourceCount',
      name: '信源统计',
      component: (resolve) => require(['../components/sourceWrite/writeSourceCount'], resolve)
    }, {
      path: '/sourceManager/sourceCount',
      name: '信源统计',
      component: (resolve) => require(['../components/sourceManager/sourceCount'], resolve)
    }, {
      path: '/sourceManager/collection/sourceCount',
      name: '信源统计',
      component: (resolve) => require(['../components/sourceManager/sourceManagerCount'], resolve)
    }, {
      path: '/sourceManager/checkManager',
      name: '信源审核',
      component: (resolve) => require(['../components/sourceManager/checkManager/userSource'], resolve)
    }, {
      path: '/sourceManager/platformSource',
      name: '平台信源',
      component: (resolve) => require(['../components/sourceManager/platformSource'], resolve)
    }, {
      path: '/sourceManager/newAddSource',
      name: '新加信源',
      component: (resolve) => require(['../components/sourceManager/newAddSource'], resolve)
    }, {
      path: '/sourceManager/newWriteSource',
      name: '新写信源',
      component: (resolve) => require(['../components/sourceManager/newWriteSource'], resolve)
    }, {
      path: '/sourceManager/manager/errorSource',
      name: '报错信源',
      component: (resolve) => require(['../components/sourceManager/manager/errorSource'], resolve)
    }, {
      path: '/sourceManager/manager/sourceRecovery',
      name: '信源回收',
      component: (resolve) => require(['../components/sourceManager/manager/sourceRecovery'], resolve)
    }, {
      path: '/sourceWrite/myWriteSource',
      name: '我的信源',
      component: (resolve) => require(['../components/sourceWrite/myWriteSource'], resolve)
    }, {
      path: '/sourceWrite/writeSource',
      name: '写信源',
      component: (resolve) => require(['../components/sourceWrite/writeSource'], resolve)
    }, {
      path: '/sourceWrite/sourceUpdate',
      name: '修改信源',
      component: (resolve) => require(['../components/sourceWrite/sourceUpdate'], resolve)
    }, {
      path: '/sourceWrite/problemSource',
      name: '错误信源修改',
      component: (resolve) => require(['../components/sourceWrite/problemSource'], resolve)
    }, {
      path: '/sourceWrite/nextSource',
      name: '下一条',
      component: (resolve) => require(['../components/sourceWrite/nextSource'], resolve)
    }, {
      path: '/collectionAos/sourceCount',
      name: '平台属性',
      component: (resolve) => require(['../components/sourceManager/sourceCount'], resolve)
    }, {
      path: '/collectionAos/news',
      name: '新闻',
      component: (resolve) => require(['../components/collectionAos/itemPage'], resolve)
    }, {
      path: '/collectionAos/weiBo',
      name: '微博',
      component: (resolve) => require(['../components/collectionAos/itemPage'], resolve)
    }, {
      path: '/collectionAos/bbs',
      name: '论坛',
      component: (resolve) => require(['../components/collectionAos/itemPage'], resolve)
    }, {
      path: '/collectionAos/flatMedium',
      name: '平媒',
      component: (resolve) => require(['../components/collectionAos/itemPage'], resolve)
    }, {
      path: '/collectionAos/weChat',
      name: '微信',
      component: (resolve) => require(['../components/collectionAos/itemPage'], resolve)
    }, {
      path: '/system/user',
      name: '账号管理',
      component: (resolve) => require(['../components/system/user'], resolve)
    }, {
      path: '/system/auth',
      name: '权限管理',
      component: (resolve) => require(['../components/system/authSetting'], resolve)
    }, {
      path: '/system/role',
      name: '角色管理',
      component: (resolve) => require(['../components/system/roleSetting'], resolve)
    }, {
      path: '/system/menu',
      name: '菜单管理',
      component: (resolve) => require(['../components/system/menuSetting'], resolve)
    }, {
      path: '/user/userInfo',
      name: '个人资料',
      component: (resolve) => require(['../components/system/userInfo'], resolve)
    }, {
      path: '/user/changePass',
      name: '密码修改',
      component: (resolve) => require(['../components/system/changePass'], resolve)
    }]
  }
]

let router = new Router({
  // mode: 'history',
  routes: constantRouterMap
})

export default router

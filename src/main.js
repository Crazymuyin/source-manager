// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index'
import moment from 'moment/moment'
import axios from '../src/common/axiosTool'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/index'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(ElementUI)
Vue.config.productionTip = false

// unix转时间戳
// Vue.filter('moment', (value, formatString) => {
//   formatString = formatString || 'YYYY-MM-DD HH:mm:ss'
//   return moment.unix(value).format(formatString)
// })
// UTC时间格式转正常格式
Vue.filter('moment', (value, formatString) => {
  return moment(value).format('YYYY-MM-DD HH:mm:ss')
})

// // 中断未完成请求
// let pending = []
//
// router.beforeEach((to, from, next) => {
//   let routeName = to.meta.name || to.name
//   window.document.title = (routeName ? routeName + ' - ' : '') + 'AOS监测版'
//   pending.forEach((item, index) => {
//     item.Cancel() // 取消请求
//     pending.splice(index, 1) // 移除当前请求记录
//   })
//   next()
// })

router.beforeEach((to, from, next) => {
  if (to.name) {
    NProgress.start()
    next()
  } else {
    return false
  }
})

router.afterEach(() => {
  NProgress.done()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  axios,
  components: { App },
  template: '<App/>'
})

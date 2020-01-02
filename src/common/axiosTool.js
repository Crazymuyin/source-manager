import Vue from 'vue'
import axios from 'axios'
import router from '../router/index'
import {delLocalStorage, getLocalStorage} from './cookie'
// import {getCookie} from './cookie'

const qs = require('qs')
// 取消请求
let CancelToken = axios.CancelToken
let pending = []

// 设置默认请求头
// axios.defaults.headers = {
//   'X-Requested-With': 'XMLHttpRequest'
// }

// 请求超时的时间限制
axios.defaults.timeout = 20000

let cancelPending = (config) => {
  pending.forEach((item, index) => {
    if (config) {
      if (item.UrlPath === config.url) {
        item.Cancel() // 取消请求
        pending.splice(index, 1) // 移除当前请求记录
      };
    } else {
      item.Cancel() // 取消请求
      pending.splice(index, 1) // 移除当前请求记录
    }
  })
}

// 开始设置请求 发起的拦截处理
axios.interceptors.request.use(config => {
  if (config.url.indexOf('login') === -1) {
    cancelPending(config)
    config.cancelToken = new CancelToken(res => {
      pending.push({UrlPath: config.url, Cancel: res})
    })
    return config
  } else {
    cancelPending(config)
    config.cancelToken = new CancelToken(res => {
      pending.push({UrlPath: config.url, Cancel: res})
    })
    return config
  }
}, error => {
  return Promise.reject(error)
})

// 请求到结果的拦截处理
axios.interceptors.response.use(config => {
  // console.log(config.data)
  if (config.data.code === 302) {
    if (getLocalStorage('userId')) delLocalStorage('userId')
    if (getLocalStorage('roleId')) delLocalStorage('roleId')
    if (getLocalStorage('roleName')) delLocalStorage('roleName')
    if (getLocalStorage('username')) delLocalStorage('username')
    router.push({path: '/login'})
  }
  return config.data
}, error => {
    // console.log('interceptors===>' + error)
  if (error && error.response) {
    switch (error.response.status) {
      case 400:
        error.message = '错误请求'
        break
      case 401:
        error.message = '未授权，请重新登录'
        break
      case 403:
        error.message = '拒绝访问'
        break
      case 404:
        error.message = '请求错误,未找到该资源'
        break
      case 405:
        error.message = '请求方法未允许'
        break
      case 408:
        error.message = '请求超时'
        break
      case 500:
        error.message = '服务器端出错'
        break
      case 501:
        error.message = '网络未实现'
        break
      case 502:
        error.message = '网络错误'
        break
      case 503:
        error.message = '服务不可用'
        break
      case 504:
        error.message = '网络超时'
        break
      case 505:
        error.message = 'http版本不支持该请求'
        break
      default:
        error.message = `连接错误${error.response.status}`
    }
  } else if (String(error).indexOf('Network Error') !== -1) {
    error.message = '连接到服务器失败'
  } else {
    error.message = ''
  }
  return Promise.reject(error.message)
})

// 将axios 的 post 方法，绑定到 vue 实例上面的 $post
Vue.prototype.$post = function (url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, qs.stringify(params)).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  })
}

// 将axios 的 get 方法，绑定到 vue 实例上面的 $get
Vue.prototype.$get = function (url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    }).then(response => {
      resolve(response) // 返回请求成功的数据 data
    }).catch(error => {
      reject(error)
    })
  })
}

export default axios

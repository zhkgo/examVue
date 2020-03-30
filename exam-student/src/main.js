import Vue from 'vue'
import App from './App.vue'
import { router } from './router'
import store from './store'
import 'normalize.css/normalize.css'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css
import './icons' // icon
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import JSEncrypt from 'jsencrypt'
Vue.prototype.$getRsaCode = function (str) { // 注册方法
  let pubKey = `-----BEGIN PUBLIC KEY-----
  MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQClwwxhJKwStDnu7c0yCRkwTW2VKuLWwyVtFC6Zx9bYdF1qwqSP26CkDwaF6GHayIvv9b8BHlAaQH4SLIPzir062yzNukqspmthUw4gPJhbx1AQrWRoQJSv3/1Sk+tWyJRHXSiCZJZ3216LDhtx42LQ0HItDP8U9BLtsxA+5LEZzQIDAQAB
  -----END PUBLIC KEY-----`// rsa 公钥
  let encryptStr = new JSEncrypt()
  encryptStr.setPublicKey(pubKey)// 设置 加密公钥
  let data = encryptStr.encrypt(str.toString())// 进行加密
  console.log(data)
  return data
}
Vue.use(Element, {
  size: 'medium' // set element-ui default size
})

Vue.config.productionTip = false

NProgress.configure({ showSpinner: false }) // NProgress Configuration

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start()
  if (to.meta.title !== undefined) {
    document.title = to.meta.title
  } else {
    document.title = '\u200E'
  }

  if (to.meta.bodyBackground !== undefined) {
    document.querySelector('body').setAttribute('style', 'background: ' + to.meta.bodyBackground)
  } else {
    document.querySelector('body').removeAttribute('style')
  }

  if (to.path) {
    // eslint-disable-next-line no-undef
    _hmt.push(['_trackPageview', '/#' + to.fullPath])
  }
  next()
})

router.afterEach((to, from, next) => {
  // finish progress bar
  NProgress.done()
})

Vue.prototype.$$router = router

new Vue({
  router: router,
  store: store,
  render: h => h(App)
}).$mount('#app')

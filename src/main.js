import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import md5 from 'js-md5'
import promise from 'es6-promise'
import Vuex from 'vuex'
import echarts from 'echarts'
import store from './store'
import AMap from 'vue-amap'
import './common/css/common.css'
Vue.config.productionTip = false

promise.polyfill()
Vue.use(ElementUI)
Vue.use(Vuex)
Vue.use(AMap)
Vue.prototype.$axios = axios
Vue.prototype.$md5 = md5
Vue.prototype.$echarts = echarts
// 初始化vue-amap
AMap.initAMapApiLoader({
  // 高德key
  key: 'ee296389957a7bbfb91ff2f2f11b88b1',
  // 插件集合 （插件按需引入）
  plugin: ['AMap.Geocoder']
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})

export const bus = new Vue();

// 引用vue
import Vue from 'vue'
// 引用路由
import VueRouter from 'vue-router'
// 使用路由
Vue.use(VueRouter)
// 入口文件为src/App.vue，所以要引用
import App from './App'
// 引用路由配置文件
import routes from './config/routes'
// 使用配置文件规则
const router = new VueRouter({
  routes
})
// import Message from 'element-ui'

// 引用api文件
import api from './config/api'
// 引用utils工具文件
import utils from './utils/index'
// 将api方法绑定到全局
Vue.prototype.$api = api
Vue.prototype.$utils = utils
// Vue.prototype.$Message = Message

// 引用文本编辑器组件
import VueHtml5Editor from 'vue-html5-editor'
Vue.use(VueHtml5Editor)

// 引用element组件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
Vue.use(ElementUI)

// 引用全局组件
import Paging from './components/paging'
Vue.component('paging', Paging)
/* eslint-disable no-new */
// 跑起来
new Vue({
  el: '#app',
  router,
  render: (h) => h(App)
})

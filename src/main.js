import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

//引入 router 文件下的 index.js 的路由 router (index.js 可省略)
import router from "./router"
Vue.use(ElementUI)
// Vue.config.productionTip = false

new Vue({
  // 把 router 注入 Vue 实例
  router,
  render: h => h(App),
}).$mount('#app')
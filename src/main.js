import Vue from 'vue'
import App from './App.vue'
// 使用UI框架
import ElementUI from 'element-ui'
// 封装好的路由
import router from './router'
// 引入UI框架样式
import 'element-ui/lib/theme-chalk/index.css';


Vue.use(ElementUI);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

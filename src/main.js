import Vue from 'vue'
import ElementUI from 'element-ui'
import App from './App.vue'
import request from './utils/request';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'

Vue.use(ElementUI);

//通过原型链共享ajax请求的方法
Vue.prototype.$request = request

new Vue({
  //将router实例注入到vue实例中
  router,
  render: h => h(App),
}).$mount('#app')
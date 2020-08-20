import Vue from "vue"

// 引入路由 vue-router
import VueRouter from 'vue-router'

// 组件的引入
import Home from '../components/Home.vue'
import User from '../components/user/Default.vue'
import UserList from '../components/user/List.vue'
import UserAdd from '../components/user/Add.vue'

import Order from '../components/Order.vue'
import Goods from '../components/Goods.vue'
import Reg from '../components/Reg.vue'
import Login from '../components/Login.vue'
import NotFound from '../components/NotFound.vue'


// 调用Vue.use手动安装，之后才能在实例中通过this.$route访问
Vue.use(VueRouter);

// 实例化并配置参数    
// Router初始化报错，Cannot read property '$createElement' of undefined 
// 是因为components：Home 不用加s

const router = new VueRouter({
    routes : [
        {
            path: '/', // /->/home
            // 严格匹配
            redirect: '/home'
        },
        {
            path: '/home',
            component: Home
        },
        {
            path: '/user',
            component: User,
            // 二级导航
            children: [
                // 进入用户管理页面直接跳到用户列表
                {
                    path: '',
                    redirect: 'list'
                }, {
                    path: 'add',
                    component: UserAdd
                }, {
                    path: 'list',
                    component: UserList
                }]
        },
        {
            path: '/order',
            component: Order
        },
        {
            path: '/goods',
            component: Goods
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/reg',
            component: Reg
        },
        {
            path: '/404',
            component: NotFound
        },

        // 404页面效果
        {
            path: '*',
            redirect: '/404'
        }
    ]
})

export default router;

console.log('router=', router);
import Vue from 'vue'
import VueRouter from 'vue-router'


import user from '../pages/user.vue'
import goods from '../pages/goods.vue'
import order from '../pages/order.vue'
import index from '../pages/index.vue'
import NotFound from '../pages/NotFound.vue'


Vue.use(VueRouter)

// 实例化 vuerouter 并配置参数
const router = new VueRouter({
    routes: [{
        path: '/',
        redirect: '/index' // 重定向
    }, {
        path: '/user',
        component: user, // 当 /user 时，访问 user 对应的文件
        children: [{
            path: '',
            redirect: "list"
        }, {
            path: "add"
        }]

    }, {
        path: '/goods',
        component: goods
    }, {
        path: '/order',
        component: order
    }, {
        path: '/index',
        component: index
    }, {
        path: '/404',
        component: NotFound
    }, {
        // 路由 检索时，从上往下，如果上面的适配了，就会显示对
        // 应内容，这里通配 * 相当于过滤了上面的路由
        path: '*',
        redirect: '/404'
    }]
})

export default router
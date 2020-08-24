import Vue from 'vue'
import VueRouter from 'vue-router'

// 用户管理
import user from '../pages/user/index.vue'
import adduser from '../pages/user/addUser.vue'
import removeuser from '../pages/user/removeUser.vue'
import userlimits from '../pages/user/userLimits.vue'
import userlist from '../pages/user/userList.vue'
import edituser from '../pages/user/editUser.vue'

// 商品管理
import goods from '../pages/goods/index.vue'
import addgoods from '../pages/goods/addGoods.vue'
import removegoods from '../pages/goods/removeGoods.vue'
import goodsdesc from '../pages/goods/goodsDesc.vue'
import goodslist from '../pages/goods/goodsList.vue'
import editgoods from '../pages/goods/editGoods.vue'
import goodsSearch from '../pages/goods/goodsSearch.vue'

import order from '../pages/order/index.vue'
import addorder from '../pages/order/addOrder.vue'
import orderlist from '../pages/order/orderList.vue'
import removeorder from '../pages/order/removeOrder.vue'

import index from '../pages/index.vue'
import NotFound from '../pages/NotFound.vue'



Vue.use(VueRouter)

// 实例化 vuerouter 并配置参数
const router = new VueRouter({
    routes: [{
            path: '/',
            redirect: '/index' // 重定向
        }, {
            path: '/goods',
            component: goods,
            children: [{
                    path: '',
                    redirect: "list"
                }, {
                    path: "list",
                    component: goodslist
                },
                {
                    path: "add",
                    component: addgoods
                }, {
                    path: "remove",
                    component: removegoods
                },
                {
                    path: "edit",
                    component: editgoods
                },
                {
                    path: "desc",
                    component: goodsdesc
                }, {
                    path: "list",
                    component: goodslist
                },
                {
                    path: "goodsSearch",
                    component: goodsSearch
                }
            ]

        }, {
            path: '/user',
            component: user,
            children: [{
                    path: '',
                    redirect: "list"
                }, {
                    path: "list",
                    component: userlist
                },
                {
                    path: "add",
                    component: adduser
                }, {
                    path: "remove",
                    component: removeuser
                },
                {
                    path: "edit",
                    component: edituser
                },
                {
                    path: "limits",
                    component: userlimits
                }, {
                    path: "list",
                    component: userlist
                }
            ]
        }, {
            path: '/order',
            component: order,
            children: [{
                    path: '',
                    redirect: "list"
                }, {
                    path: "list",
                    component: orderlist
                },
                {
                    path: "add",
                    component: addorder
                }, {
                    path: "remove",
                    component: removeorder
                },
            ]
        }, {
            path: '/index',
            component: index
        }, {
            path: '/404',
            component: NotFound
        },
        {
            // 路由 检索时， 从上往下， 如果上面的适配了， 就会显示对
            // 应内容， 这里通配 * 相当于过滤了上面的路由
            path: '*',
            redirect: '/404'
        }
    ]
})

export default router
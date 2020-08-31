import Vue from 'vue';

//1.引入Vue-Router
import VueRouter from 'vue-router'

//用户管理
import User from '../pages/user/Default.vue'
import UserList from '../pages/user/List.vue'
import UserAdd from '../pages/user/Add.vue'
import UserEdit from '../pages/user/Edit.vue'
import UserDelete from '../pages/user/delete.vue'
import UserPower from '../pages/user/power.vue'

//商品管理
import Goods from '../pages/goods/Default.vue'
import GoodsAdd from '../pages/goods/Add.vue'
import GoodsList from '../pages/goods/List.vue'
import GoodsDelete from '../pages/goods/Delete.vue'
import GoodsDeleteMore from '../pages/goods/DeleteMore.vue'
import GoodsSearch from '../pages/goods/Search.vue'

//商品管理下的分类管理
import Classification from '../pages/goods/classification/Default.vue'
import ClassificationAdd from '../pages/goods/classification/Add.vue'
import ClassificationList from '../pages/goods/classification/List.vue'
import ClassificationDelete from '../pages/goods/classification/Delete.vue'
import ClassificationEdit from '../pages/goods/classification/Edit.vue'

//订单管理
import Order from '../pages/order/Default.vue'
import OrderAdd from '../pages/order/Add.vue'
import OrderList from '../pages/order/List.vue'
import OrderDelete from '../pages/order/Delete.vue'
import OrderEdit from '../pages/order/Edit.vue'


import Home from '../pages/Home.vue'
import HomeContent from '../pages/Homecontent.vue'
// import Order from '../pages/Order.vue'
// import Goods from '../pages/Goods.vue'
import Reg from '../pages/reg/index.vue'
import Login from '../pages/Login/index.vue'
import NotFound from '../pages/NotFound.vue'

import request from '../utils/request'

//2.使用vue-router
Vue.use(VueRouter);

//3.实例化router并配置参数
const router = new VueRouter({
    // mode:'history',//一般上线后改为history路由（需要额外配置服务器）
    routes: [{
            path: '/', // /->/home
            component: Home
        },
        {
            path: '/home',
            component: Home,
            meta: {
                requiresAuth: true
            },
            children: [{
                    path: '/',
                    redirect: 'homecontent'
                },
                {
                    path: '/homecontent',
                    component: HomeContent,
                    meta: {
                        requiresAuth: true
                    },
                },
                {
                    path: '/user',
                    component: User,
                    children: [
                        //进入用户管理页面直接跳到用户列表
                        {
                            path: '',
                            redirect: 'list'
                        }, {
                            path: 'add',
                            component: UserAdd
                        }, {
                            name: 'userList',
                            path: 'list',
                            component: UserList
                        }, {
                            name: 'userEdit',
                            //可以通过name来跳转页面
                            path: 'edit/:id',
                            //通过：id来传参
                            component: UserEdit
                            //用户编辑
                        }, {
                            // name: 'userDelete',
                            path: 'delete',
                            component: UserDelete
                        }, {
                            path: 'power',
                            component: UserPower
                        }
                    ]
                },
                {
                    path: '/order',
                    component: Order,
                    children: [
                        //进入订单管理页面直接跳到订单列表
                        {
                            path: '/',
                            redirect: 'list'
                        }, {
                            path: 'add',
                            component: OrderAdd
                        },
                        {
                            path: 'list',
                            component: OrderList
                        },
                        {
                            path: 'delete',
                            component: OrderDelete
                        }, {
                            path: 'Edit',
                            component: OrderEdit
                        },
                    ]
                },
                {
                    path: '/goods',
                    component: Goods,

                    //路由独享的守卫
                    // beforeEnter(to, from, next) {
                    //     console.log("beforeEnter");
                    // },

                    children: [{
                            path: '/',
                            redirect: 'list'
                        },
                        {
                            path: 'list',
                            component: GoodsList
                        },
                        {
                            path: 'add',
                            component: GoodsAdd
                        },
                        {
                            path: 'delete',
                            component: GoodsDelete
                        },
                        {
                            path: 'deletemore',
                            component: GoodsDeleteMore
                        },
                        {
                            path: 'search',
                            component: GoodsSearch
                        },
                        {
                            path: 'classification',
                            component: Classification,
                            children: [{
                                    path: 'add',
                                    component: ClassificationAdd
                                },
                                {
                                    path: 'list',
                                    component: ClassificationList
                                },
                                {
                                    path: 'delete',
                                    component: ClassificationDelete
                                },
                                {
                                    path: 'edit',
                                    component: ClassificationEdit
                                }
                            ]
                        },
                    ]
                },
            ],
        },
        {
            path: '/login',
            component: Login,
        },

        {
            path: '/reg',
            component: Reg,
        },
        {
            path: '/404',
            component: NotFound,
        },

        //404页面效果
        {
            path: '*',
            redirect: '/404'
            //除了有设置的路径之外所有路径都自动跳转到404
        }
    ]
})


//全局路由守卫
//beforeEach：在路由切换前执行
router.beforeEach(function (to, from, next) {
    //判断目标路由是否需要登录才可访问
    // console.log('beforeEach', to, from);

    console.log("to.fullPath=", to.fullPath)
    // if (to.meta.requiresAuth) {
    //     console.log("to.meta.requiresAuth=", to.meta.requiresAuth);
    if (to.matched.some(item => item.meta.requiresAuth)) {
        let currentUser = localStorage.getItem('currentUser') || {};
        try {
            currentUser = JSON.parse(currentUser)
        } catch (err) {
            currentUser = {};
        }
        // console.log('currentUser', currentUser);

        //判断当前信息是否包含token
        if (currentUser.authorization) {
            console.log("currentUser.authorization=", currentUser.authorization);
            //发起请求校验token的有效性
            request.get('/jwtverify', {
                params: {
                    authorization: currentUser.authorization
                }
            }).then(({
                data
            }) => {
                if (data.code === 0) {

                    next({
                        path: '/login',
                        query: {
                            // 跳转到登录页面，并传递目标页面路径
                            redirectTo: to.fullPath
                        }
                    });
                }
            })
            next();
        } else {
            // router.push('/login')
            // router.push({
            //     path:'/login'
            // });
            next({
                path: '/login',
                query: {
                    // 跳转到登录页面，并传递目标页面路径
                    redirectTo: to.fullPath
                }
            });
        }
    } else {
        next();
    }

})

//afterEach:路由切换完成
// router.afterEach((to, from) => {

// })

export default router;
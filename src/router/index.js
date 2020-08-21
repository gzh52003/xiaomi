import Vue from "vue"

// 引入路由 vue-router
import VueRouter from 'vue-router'


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
            component:()=>import("../components/Home.vue")
        },
        {
            path: '/user',
            component: ()=>import("../components/user/Default.vue"),
            // 二级导航
            children: [
                // 进入用户管理页面直接跳到用户列表
                {
                    path: '',
                    redirect: 'list'
                }, {
                    path: 'add',
                    component: ()=>import("../components/user/Add.vue")
                }, {
                    path: 'list',
                    component: ()=>import("../components/user/List.vue")
                }]
        },
        {
            path: '/order',
            component:()=>import("../components/Order.vue")
        },
        {
            path: '/goods',
            component:()=>import("../components/Goods.vue")
        },
        {
            path: '/login',
            component:()=>import("../components/Login.vue")
        },
        {
            path: '/reg',
            component:()=>import("../components/Reg.vue")
        },
        {
            path: '/404',
            component:()=>import("../components/NotFound.vue")
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
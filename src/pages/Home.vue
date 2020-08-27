
<template>
  <el-container style="height:100%">
    <el-header class="header">
      <el-row>
        <el-col :span="12" class="logo">
          <div class="grid-content bg-purple logo-img">
            <i>
              <img src="../img/mi-logo.png" alt />
            </i>
            小米商城后台管理系统
          </div>
        </el-col>
        <el-col :span="12" style="text-align:right">
          <div class="grid-content bg-purple-light">
            <el-button type="primary" plain>登录</el-button>
            <el-button type="primary" plain>注册</el-button>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu
          style="height:100%"
          :default-active="activeIndex"
          :nique-opened="true"
          mode="vertical"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ff0"
          @select="active"
          :default-openeds="openMenu"
          router
        >
          <template v-for="item in menu">
            <!-- 因为for和if不能同时存在一个标签内，使用template标签放置v-for循环 -->
            <el-menu-item :index="item.path" :key="item.path" v-if="!item.submenu">
              <!-- v-bind:index="item.path" 索引值绑定为每个网页的  -->
              <!-- :key(取数据中的唯一且稳定的)-->
              <!-- v-if判断目录中是否存在二级菜单,没有则只创建一级菜单,有则执行v-else，生成具有二级菜单的一级菜单 -->
              <i :class="item.icon" style="color:#fff"></i>
              {{item.text}}
            </el-menu-item>

            <el-submenu :index="item.path" :key="item.path" v-else>
              <template v-slot:title>
                <i :class="item.icon" style="color:#fff"></i>
                {{item.text}}
              </template>

              <template v-for="sub in item.submenu">
                <el-menu-item :key="sub.path" :index="item.path+sub.path" v-if="!sub.submenus">
                  <!-- :key(取数据中的唯一且稳定的)-->
                  <!-- 在一级菜单的地址后加上二级菜单的地址 -->
                  {{sub.text}}
                </el-menu-item>
                <el-submenu v-else :key="sub.path" :index="item.path+sub.path">
                  <template slot="title">{{sub.text}}</template>
                  <el-menu-item
                    :key="subs.path"
                    :index="item.path+sub.path+subs.path"
                    v-for=" subs in sub.submenus"
                  >{{subs.text}}</el-menu-item>
                </el-submenu>
              </template>
            </el-submenu>
          </template>
        </el-menu>
      </el-aside>
      <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>活动管理</el-breadcrumb-item>
        <el-breadcrumb-item>活动列表</el-breadcrumb-item>
        <el-breadcrumb-item>活动详情</el-breadcrumb-item>
      </el-breadcrumb>-->
      <el-main style="padding:0px 0;">
        <router-view></router-view>
        <!-- 路由单页面切换 -->
      </el-main>
    </el-container>
  </el-container>
</template>


<script>
export default {
  name: "App",
  data() {
    return {
      activeIndex: "/home",
      //默认首页为home
      openMenu: [],
      menu: [
        {
          text: "首页",
          path: "/home",
          icon: "el-icon-s-home",
        },
        {
          text: "用户管理",
          path: "/user",
          icon: "el-icon-user-solid",
          submenu: [
            {
              text: "添加用户",
              path: "/add",
            },
            {
              text: "用户列表",
              path: "/list",
            },
            {
              text: "删除用户",
              path: "/delete",
            },
            {
              text: "修改用户",
              path: "/edit/:id",
            },
            {
              text: "用户权限",
              path: "/power",
            },
          ],
        },
        {
          text: "商品管理",
          path: "/goods",
          icon: "el-icon-grape",
          submenu: [
            {
              text: "添加商品",
              path: "/add",
            },
            {
              text: "删除商品",
              path: "/delete",
            },
            {
              text: "批量删除",
              path: "/deletemore",
            },
            {
              text: "商品列表",
              path: "/list",
            },
            {
              text: "商品修改",
              path: "/edit",
            },
            {
              text: "商品搜索",
              path: "/search",
            },
            {
              text: "分类管理",
              path: "/classification",
              submenus: [
                {
                  text: "分类列表",
                  path: "/list",
                },
                {
                  text: "分类添加",
                  path: "/add",
                },
                {
                  text: "分类删除",
                  path: "/delete",
                },
                {
                  text: "分类修改",
                  path: "/edit",
                },
              ],
            },
          ],
        },
        {
          text: "订单管理",
          path: "/order",
          icon: "el-icon-s-order",
          submenu: [
            {
              text: "订单列表",
              path: "/list",
            },
            {
              text: "订单处理",
              path: "/add",
            },
            {
              text: "退款操作",
              path: "/delete",
            },
          ],
        },
      ],
    };
  },
  methods: {
    active(path) {
      this.activeIndex = path;
    },
  },
  components: {},
};
</script>

<style lang="scss">
html {
  height: 100%;
}
body {
  margin: 0;
  height: 100%;
}
.header {
  line-height: 60px;
  color: #fff;
  background-color: rgba(84, 92, 100, 0.9);
  .logo {
    font-size: 24px;
    color: #fc0;
    i {
      font-size: 40px;
      vertical-align: middle;
      margin-right: 5px;
      display: inline-block;
      width: 49px;
      height: 49px;
      img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
}
.is-active {
  i {
    color: inherit !important;
    // inherit 继承父级颜色
  }
}
</style>
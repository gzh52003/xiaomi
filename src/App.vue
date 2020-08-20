<template>
  <el-container style="height:100%">
    <!-- header 导航部分 -->
    <el-header class="header">
      <el-row>
        <el-col :span="12" class="logo">
          <i>
            <svg t="1597925388630" class="icon"
             viewBox="0 0 1024 1024" version="1.1"
              xmlns="http://www.w3.org/2000/svg"
               p-id="938" width="32" height="32">
               <path d="M947.2 807.563636h-123.345455c-2.327273 0-2.327273 0-4.654545-2.327272s-2.327273-2.327273-2.327273-4.654546V223.418182c0-2.327273 0-2.327273 2.327273-4.654546s2.327273-2.327273 4.654545-2.327272h123.345455c2.327273 0 2.327273 0 4.654545 2.327272s2.327273 2.327273 2.327273 4.654546v577.163636c0 2.327273-2.327273 6.981818-6.981818 6.981818z m-246.690909 0h-123.345455c-2.327273 0-2.327273 0-4.654545-2.327272s-2.327273-2.327273-2.327273-4.654546V435.2c0-51.2-39.563636-93.090909-90.763636-93.090909H209.454545c-2.327273 2.327273-2.327273 4.654545-2.327272 4.654545v451.490909c0 2.327273 0 2.327273-2.327273 4.654546s-2.327273 2.327273-4.654545 2.327273H76.8c-2.327273 0-2.327273 0-4.654545-2.327273-2.327273 0-2.327273 0-2.327273-2.327273V223.418182C69.818182 218.763636 72.145455 216.436364 76.8 216.436364h465.454545c44.218182 0 86.109091 18.618182 118.69091 51.2 30.254545 32.581818 48.872727 74.472727 46.545454 118.690909v411.927272c0 4.654545-2.327273 9.309091-6.981818 9.309091zM325.818182 446.836364h123.345454c2.327273 0 2.327273 0 4.654546 2.327272s2.327273 2.327273 2.327273 4.654546v346.763636c0 2.327273 0 2.327273-2.327273 4.654546s-2.327273 2.327273-4.654546 2.327272H325.818182c-2.327273 0-2.327273 0-4.654546-2.327272s-2.327273-2.327273-2.327272-4.654546V453.818182c0-4.654545 2.327273-6.981818 6.981818-6.981818z" fill="#FF6700" p-id="939"></path>
                 </svg>
            </i>小米后台管理系统
        </el-col>
        <el-col :span="12" style="text-align:right">
          <el-button type="text">注册</el-button>
          <el-button type="text">登录</el-button>
        </el-col>
      </el-row>
    </el-header>

    <el-container>
      <el-aside width="200px">
        <el-menu
          style="height:100%"
          :default-active="activeIndex" mode="vertical" background-color="#545c64" text-color="#fff" active-text-color="#ff0" @select="changeMenu"
          :default-openeds="openMenu"
          router
        >
          <template v-for="item in menu">
            <!-- 菜单 -->
            <el-menu-item :index="item.path" :key="item.path"  v-if="!item.submenu">
              <i :class="item.icon" style="color:#fff"></i>
              {{item.text}}
            </el-menu-item>
            <el-submenu :key="item.path" :index="item.path" v-else>
              <template v-slot:title>
                <i :class="item.icon" style="color:#fff"></i>{{item.text}}
              </template>
              <el-menu-item :key="sub.path" :index="item.path+sub.path" v-for="sub in item.submenu">{{sub.text}}</el-menu-item>
            </el-submenu>
          </template>
        </el-menu>
      </el-aside>
      <el-main>
        <!-- 面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>活动管理</el-breadcrumb-item>
          <el-breadcrumb-item>活动列表</el-breadcrumb-item>
          <el-breadcrumb-item>活动详情</el-breadcrumb-item>
        </el-breadcrumb>
        <div style="padding:15px 0;">
          <router-view />
        </div>
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
      openMenu:[],
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
          ],
        },
        {
          text: "商品管理",
          path: "/goods",
          icon: "el-icon-grape",
        },
        {
          text: "订单管理",
          path: "/order",
          icon: "el-icon-s-order",
        },
      ],
      currentIndex: 0,
    };
  },
  methods: {
    goto(path, idx) {
      console.log(this.$router);
      this.$router.push(path);
      // this.$router.replace(path);
      this.currentIndex = idx;
    },
    back() {
      // 后退
      this.$router.back();
    },
    changeMenu(path) {
      this.activeIndex = path;
    },
  },
  components: {},
};
</script>

<style lang="scss">
html{
  height: 100%;
}
body {
  margin: 0;
  height:100%;
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
    }
  }
}
.is-active {
  i {
    color: inherit !important;
  }
}
</style>

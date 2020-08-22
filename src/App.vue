<template>
  <el-container style="height:100%">
    <el-header class="header">
      <el-row>
        <el-col :span="12">豪哥哥工作室</el-col>
        <el-col :span="12" style="text-align:right">
          <el-button type="primary">登录</el-button>
          <el-button type="primary">注册</el-button>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu
          style="height:100%"
          :default-active="activeIndex"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          @select="changeMenu"
          active-text-color="#ffd04b"
          router
          unique-opened="true"
        >
          <!-- router 使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转 -->
          <template v-for="item in menu">
            <el-menu-item :index="item.path" :key="item.text" v-if="!item.submenu">
              <i :class="item.icon"></i>
              <span slot="title">{{item.text}}</span>
            </el-menu-item>
            <el-submenu :index="item.path" :key="item.text" v-else>
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{item.text}}</span>
              </template>

              <el-menu-item
                :index="item.path+sub.path"
                :key="sub.text"
                v-for="sub in item.submenu"
              >{{sub.text}}</el-menu-item>
            </el-submenu>
          </template>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "App",
  components: {},
  data() {
    return {
      // 在配置里，设置 :default-active="activeIndex"
      activeIndex: "/index",
      menu: [
        {
          text: "首页",
          path: "/index",
          icon: "el-icon-s-home",
        },
        {
          text: "用户管理",
          path: "/user",
          icon: "el-icon-user-solid",
          submenu: [
            {
              text: "用户列表",
              path: "list",
            },
            {
              text: "添加用户",
              path: "add",
            },
            {
              text: "删除用户",
              path: "remove",
            },
            {
              text: "批量删除",
              path: "removeMore",
            },

            {
              text: "修改用户",
              path: "edit",
            },
            {
              text: "验证token有效性",
              path: "token",
            },
            {
              text: "用户权限",
              path: "limits",
            },
          ],
        },
        {
          text: "商品管理",
          path: "/goods",
          icon: "el-icon-grape",
          submenu: [
            {
              text: "商品列表",
              path: "list",
            },
            {
              text: "添加商品",
              path: "add",
            },
            {
              text: "删除商品",
              path: "remove",
            },
            {
              text: "批量删除",
              path: "removeMore",
            },

            {
              text: "商品修改",
              path: "edit",
            },
            {
              text: "商品搜索",
              path: "search",
            },
            {
              text: "分类管理",
              path: "desc",
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
              path: "list",
            },
            {
              text: "添加订单",
              path: "add",
            },
            {
              text: "删除订单",
              path: "remove",
            },
          ],
        },
      ],
    };
  },
  methods: {
    changeMenu(path) {
      //进入页面时，高亮的菜单
      // console.log(this.activeIndex);
      this.activeIndex = path;
    },
    // 用 el-menu 绑定  @select:"goto" 事件，传的第一个参数为 index ，index 放的是 path，
    // this.$router.push(path); 跳转到这个 path 的路由
    // goto(path) {
    //   // console.log(666);
    //   this.$router.push(path);
    // },
    // 不过 element 的导航组件中，提供了 跳转属性 router ，不需要再进行绑定
  },
};
</script>

<style >
html {
  height: 100%;
}
body {
  margin: 0;
  height: 100%;
}
.header {
  background: rgba(84, 92, 100, 0.9);
  line-height: 60px;
  color: #f0f0f0;
}
</style>

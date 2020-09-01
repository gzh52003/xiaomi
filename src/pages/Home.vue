<template>
  <el-container style="height:100%">
    <el-header class="header">
      <el-row style="margin:0;">
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
            <!-- <el-button type="primary" plain>登录</el-button>
            <el-button type="primary" plain>注册</el-button>-->
            <!-- 下拉菜单 -->
            <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link">
                <span style="color:#fc0;font-size:15px;margin-right:8px">HI!{{currentUser.username}}</span>
                个人中心
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="edit">修改密码</el-dropdown-item>
                <el-dropdown-item command="logout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>

            <!-- 对话框：修改密码 -->
            <el-dialog title="修改密码" :visible.sync="dialogFormVisible" width="450px">
              <el-form
                :rules="rules"
                :model="ruleForm"
                label-position="right"
                label-width="80px"
                class="demo-ruleForm"
                ref="ruleForm"
              >
                <el-form-item label="旧密码" prop="oldpsw">
                  <el-input
                    v-model="ruleForm.oldpsw"
                    autocomplete="off"
                    placeholder="请输入你的旧密码"
                    style="width:300px"
                    type="password"
                  ></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="newpsw">
                  <el-input
                    v-model="ruleForm.newpsw"
                    autocomplete="off"
                    style="width:300px"
                    placeholder="请输入你要设置的新密码"
                    type="password"
                  ></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkpsw">
                  <el-input
                    v-model="ruleForm.checkpsw"
                    autocomplete="off"
                    style="width:300px"
                    placeholder="请再次输入你要设置的新密码"
                    type="password"
                  ></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="editpsw">确 定</el-button>
              </div>
            </el-dialog>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu
          style="height:100%"
          :default-active="activeIndex"
          mode="vertical"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ff0"
          @select="active"
          :default-openeds="openMenu"
          router
          :unique-opened="true"
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
import { logOut } from "@/utils/auth"; //引入cookie的方法
export default {
  name: "App",
  data() {
    //功能：验证旧密码是否正确
    var validatePsw = async (A, value, callback) => {
      const { data } = await this.$request.get(`user/checkpsw`, {
        params: {
          username: this.userinf.username,
          password: value,
        },
      });

      if (data.code == 1) {
        //登陆成功:旧密码是正确的
        callback();
        this.$message({
          message: "登陆成功:旧密码正确",
          type: "success",
        });
      } else {
        //登陆失败：旧密码不对
        callback(new Error("您的旧密码错误"));
        this.$message({
          message: "登陆失败：旧密码不对",
          type: "error",
        });
      }
    };
    //功能：验证新密码
    var validatePass = (ruleForm, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
        this.$message({
          message: "请输入密码",
          type: "error",
        });
      } else {
        if (this.ruleForm.checkpsw !== "") {
          this.$refs.ruleForm.validateField("checkpsw");
        }
        callback();
      }
    };
    //功能：验证确认密码
    var validatePass2 = (ruleForm, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.newpsw) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    return {
      currentUser: {},
      dialogFormVisible: false, //对话框的显示状态：false：不显示
      value: new Date(),
      ruleForm: {
        oldpsw: "", //旧密码
        newpsw: "", //新密码
        checkpsw: "", //确认密码
      },
      userinf: {},
      rules: {
        //正则
        oldpsw: [
          { required: true, message: "旧密码不能为空", trigger: "blur" }, //用户名不能为空
          { validator: validatePsw, trigger: "blur" }, //验证用户名是否存在
          //   { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        newpsw: [
          // { required: true, message: "新密码不能为空", trigger: "blur" },
          // {
          //   min: 3,
          //   max: 15,
          //   message: "长度在 3 到 15 个字符",
          //   trigger: "blur"
          // }
          { validator: validatePass, trigger: "blur" },
        ],
        checkpsw: [
          // { required: true, message: "确认密码不能为空", trigger: "blur" },
          { validator: validatePass2, trigger: "blur" },
        ],
      },

      activeIndex: "/home",
      //默认首页为home
      openMenu: [],
      menu: [
        {
          text: "首页",
          path: "/homecontent",
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
  //进入页面就获取用户信息
  created() {
    // let userinf = getUser("xiaomi-user"); //字符串 {username:xxx,uid:xxx}
    // console.log(userinf);
    // if (userinf) {
    //   this.userinf = JSON.parse(userinf);
    // }
    this.getcurrentUser();
  },
  watch: {
    $route(to, from) {
      if (from.path === "/login") {
        this.getcurrentUser();
      }
      if (to.path === "/login") {
        logOut(); //删除本地cookie的数据
        localStorage.removeItem("currentUser");
        this.currentUser = {};
      }
    },
  },
  methods: {
    getcurrentUser() {
      let currentUser = localStorage.getItem("currentUser");

      try {
        this.currentUser = JSON.parse(currentUser);
      } catch (err) {
        this.currentUser = {};
      }
    },
    active(path) {
      this.activeIndex = path;
    },
    //功能：下拉菜单的触发
    handleCommand(command) {
      // console.log(command);
      if (command == "edit") {
        //修改密码
        this.dialogFormVisible = true;
      } else if (command == "logout") {
        //退出
        // console.log("退出了");
        logOut(); //删除本地cookie的数据
        localStorage.removeItem("currentUser");
        this.currentUser = {};
        this.$message({
          message: "退出成功",
          type: "success",
          duration: 2000,
        });

        //跳转到登陆页
        this.$router.push("/login");
      }
    },

    //功能：点击确定按钮，确定修改密码
    editpsw() {
      this.$refs.ruleForm.validate(async (res) => {
        if (res) {
          //表单正则校验通过：发送ajax进行密码的修改
          //获取：uid、username、新密码，传给接口
          const { data } = await this.$request.put(`user/changepsw?`, {
            username: this.userinf.username,
            password: this.ruleForm.checkpsw,
          });
          console.log(data);
          if (data.code == 1) {
            //修改成功
            this.dialogFormVisible = false;
            this.$message({
              message: "修改成功",
              type: "success",
            });
            //跳到登陆页
            this.$router.push("/login");
            //清除本地存储的用户信息
            logOut();
            localStorage.removeItem("currentUser");
            this.currentUser = {};
          } else {
            //修改失败
            this.$message({
              message: "修改失败",
              type: "error",
            });
          }
        } else {
          return;
        }
      });
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

.el-dropdown-link {
  cursor: pointer;
  color: #fff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.el-dropdown {
  float: right;
  padding-right: 20px;
}
</style>
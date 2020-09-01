<template>
  <!-- 登录页组件 -->
  <div class="main">
    <div class="login-form">
      <h2 class="login-title">小米后台系统登录</h2>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="ruleForm.username" id="username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password" id="password" type="password"></el-input>
        </el-form-item>

        <el-form-item label="验证码" prop="vcode">
          <el-input v-model="ruleForm.vcode">
            <template v-slot:append>
              <div v-html="vcodeSvg" class="vcode" @click="getVcode"></div>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item prop="keep">
          <!-- `checked` 为 true 或 false -->
          <el-checkbox v-model="ruleForm.checked" id="mdl" @click.native="keep($event)">保留7天免登陆</el-checkbox>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="loginGo" style="float:right" id="btnLogin">登录</el-button>
          <el-button @click="gotoReg" style="float:right;margin-right:5px">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { setToken, setUser } from "../../utils/auth"; //引入cookies设置的相关方法

export default {
  data() {
    return {
      vcodeSvg: "",
      ruleForm: {
        username: "",
        password: "",
        vcode: "",
        checked: false,
      },
      rules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
        ],
        vcode: [
          {
            required: true,
            message: "请填写验证码",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    gotoReg() {
      this.$router.push("/reg");
    },
    async loginGo() {
      // const { data } = await this.$request.get(
      //   `http://localhost:2003/api/login?username=${this.ruleForm.name}&password=${this.ruleForm.password}&mdl=${this.ruleForm.checked}&vcode=${this.ruleForm.vcode}`
      // );
      console.log({ ...this.ruleForm });
      const { data } = await this.$request.get("/login", {
        params: {
          ...this.ruleForm,
        },
      });

      console.log("data=", data);
      if (data.code === 0 || data.code === 10) {
        this.$message({
          message: "账号和密码，验证码错误",
          type: "error",
        });
      } else {
        // 登录成功
        this.$message({
          message: " 登录成功",
          type: "success",
        });

        localStorage.setItem("currentUser", JSON.stringify(data.data));
        // 把用户信息写入本地存储

        this.$router.push("/");

        console.log("redirectTo=", redirectTo);
        const { redirectTo = "/homecontent" } = this.$route.query;
        this.$router.replace(redirectTo);
      }

      let userinf = {
        username: this.ruleForm.username,
        uid: data.data._id,
      };
      console.log(userinf);
      if (this.ruleForm.checked) {
        //需要保持7天
        setToken(data.data.authorization, 7);
        setUser(JSON.stringify(userinf), 7);
      } else {
        //存成会话级别:关掉浏览器就删除
        setToken(data.data.authorization);
        setUser(JSON.stringify(userinf));
      }
    },

    //功能：解决复选框的坑
    keep(ev) {
      if (ev.target.tagName == "INPUT") return;
      console.log(123);
      if (!this.ruleForm.checked) {
        this.$message({
          message: "请不要在公共场合使用该功能",
          type: "error",
        });
      }
    },

    async getVcode() {
      const { data } = await this.$request.get("/vcode");
      this.vcodeSvg = data.data;
    },
  },

  watch: {
    // ruleForm: {
    //   deep: true,
    //   handler: function (val) {
    //     //保留7天免登陆的提示框
    //     if (val.checked) {
    //       this.$message({
    //         message: "请不要在公共电脑使用该功能",
    //         type: "warning",
    //       });
    //     }
    //   },
    // },
  },

  created() {
    // console.log(this.$route);
    if (this.$route.query) {
      this.ruleForm.name = this.$route.query.name;
    }
    this.getVcode();
  },
};

// (async () => {
// 判断用户是否已经登录
// const authorization = localStorage.getItem("authorization");
// if (authorization) {
//   this.$router.push("/");
// }
// // 获取图形验证码
// async function getVcode(){
//     const result = await fetch(`http://localhost:2003/api/vcode?`).then(res => res.json());
//     if (result.code === 1) {
//         svgVcode.innerHTML = result.data;
//     }
// }
// getVcode();
// 点击刷新验证码
// svgVcode.onclick = getVcode;
//   btnLogin.onclick = async () => {
//     const _username = username.value;
//     const _password = password.value;
//     // const _vcode = vcode.value;
//     const _mdl = mdl.checked;
//     const result = await fetch(
//       `http://localhost:8080/api/login?username=${_username}&password=${_password}&mdl=${_mdl}`
//     ).then((res) => res.json());
//     if (result.code === 0) {
//       this.$message({
//         message: "账号和密码错误",
//         type: "error",
//       });
//     } else {
//       // 登录成功
//       localStorage.setItem("currentUser", JSON.stringify(result.data));
//       this.$router.push("/");
//     }
//   };
// })();
</script>

<style lang="scss" >
//scoped:这里面的样式只在本组件生效，局部作用域
//lang设置用sass写样式

.main {
  position: absolute;
  width: 100%;
  height: 100%;
  background: url("../../img/timg.gif") no-repeat;
  background-size: 100% 100%;
  overflow: hidden;
}
// 标题
.login-title {
  text-align: center;
  color: #303133;
  margin-bottom: 20px;
}
.login-form {
  width: 350px;
  // 上下间隙150px，左右自动
  margin: 160px auto;
  //透明背景色
  background-color: rgba(255, 255, 255, 0.8);
  padding: 30px;
  padding-right: 60px;
  // 圆角
  border-radius: 20px;
}

.vcode {
  display: block;
  width: 38px;
  height: 38px;
  position: relative;
  left: -20px;
}

.vcode svg {
  display: block;
  width: 80px;
  // height: ;
  position: absolute;
  left: 0;
  // top: -4px;
}
</style>

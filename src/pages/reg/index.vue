<template>
  <!-- 注册页组件 -->
  <div class="main">
    <div class="login-form">
      <h2 class="login-title">小米后台系统注册</h2>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm()" style="float:right">注册</el-button>
          <el-button @click="gotoLogin" style="float:right;margin-right:5px">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    var validateName = async (A, B, callback) => {
      /* 
            value:该表单的value值
            callback: 回调函数，返回提示信息
        */
      const { data } = await this.$request.get(
        `user/checkname?username=${this.ruleForm.name}`
      );
      console.log(data);
      console.log(this.ruleForm.name);
      if (data.code == 1) {
        //可以注册
        callback();
        this.$message({
          message: "可以注册",
          type: "success",
        });
      } else {
        //该用户名已存在
        callback(new Error("该用户名已存在"));
        this.$message({
          message: "该用户名已存在",
          type: "error",
        });
      }
    };
    return {
      ruleForm: {
        name: "",
        password: "",
      },
      rules: {
        name: [
          { required: true, message: "用户名不能为空", trigger: "blur" }, //用户名不能为空
          { validator: validateName, trigger: "blur" }, //用户名是否已存在
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    submitForm() {
      // this.$refs[formName].validate((valid) => {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          console.log(666);
          const { data } = await this.$request.post("/user", {
            username: this.ruleForm.name,
            password: this.ruleForm.password,
          });
          if (data.code == 1) {
            //注册成功
            this.$message({
              message: "注册成功",
              type: "success",
            });
            //注册成功，跳转到登陆页面
            this.$router.push({
              path: "/login",
              query: { name: this.ruleForm.name },
            });
          } else {
            //注册失败
            this.$message({
              message: "注册失败",
              type: "error",
            });
          }
        }
      });

      // });
    },
    gotoLogin() {
      this.$router.push("/login");
    },
    async RegGo() {},
  },
};
</script>

<style lang="scss" scoped>
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
</style>

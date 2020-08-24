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
        <el-form-item label="用户名" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item prop="keep">
          <!-- `checked` 为 true 或 false -->
          <el-checkbox v-model="ruleForm.checked">保留7天免登陆</el-checkbox>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')" style="float:right">登录</el-button>
          <el-button @click="gotoReg" style="float:right;margin-right:5px">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      ruleForm: {
        name: "",
        password: "",
        checked: false,
      },
      rules: {
        name: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
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
    gotoReg() {},
  },

  watch: {
    ruleForm: {
      deep: true,
      handler: function (val) {
        //保留7天免登陆的提示框
        if (val.checked) {
          this.$message({
            message: "请不要在公共电脑使用该功能",
            type: "warning",
          });
        }
      },
    },
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

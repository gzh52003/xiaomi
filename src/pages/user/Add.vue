<template>
  <div>
    <p>添加用户</p>
    <el-form
      status-icon
      label-width="100px"
      class="demo-ruleForm"
      :rules="rules"
      ref="ruleForm"
      :model="data"
      style="width: 90%;margin:0 auto"
    >
      <el-form-item label="用户名" prop="username">
        <el-input type="text" v-model="data.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="data.password" type="password"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-input v-model="data.gender"></el-input>
      </el-form-item>
      <el-form-item label="权限" prop="role">
        <el-input v-model="data.role"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">提交</el-button>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: {
        username: "",
        password: "",
        gender: "",
        role: "",
      },

      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 8,
            max: 16,
            message: "长度在 8 到 16 个字符",
            trigger: "blur",
          },
        ],
        gender: [{ required: false, message: "请输入性别", trigger: "blur" }],
        role: [{ required: false, message: "请输入权限", trigger: "blur" }],
      },
    };
  },
  methods: {
    submit() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          // 判断用户名是否已被注册9
          const { password, username, role, gender } = this.data;
          const { data } = await this.$request.post("/user/", {
            username,
            password,
            role,
            gender,
          });
          console.log(data);
          if (data.code === 1) {
            this.$message({
              type: "success",
              message: "添加成功!",
            });

            // this.$router.push({ name: "userList" });
          }
        }
      });
    },
  },
};
</script>
<template>
  <div>
    <p>编辑用户</p>
    <el-row>
      <el-col :span="16">
        <el-form
          status-icon
          label-width="100px"
          class="demo-ruleForm"
          style="width: 90%; margin:0 auto"
        >
          <!-- :model="ruleForm"
      :rules="rules"
          ref="ruleForm"-->
          <el-form-item label="用户名" prop="username">
            <el-input type="text" v-model="data.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="gender">
            <el-input v-model.number="data.gender"></el-input>
          </el-form-item>
          <el-form-item label="权限" prop="role">
            <el-input v-model.number="data.role"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submit">提交</el-button>
            <el-button>重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="8">
        <div class="demo-image__preview" style=" display:block;">
          <el-image style="width: 100px; height: 100px" :src="url"></el-image>
        </div>
        <el-form status-icon width="100px" style="width:100px; display:block;">
          <input type="file" @change="imgurlChange" ref="imgUpload" />
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: {},
      url: "",
    };
  },
  async beforeCreate() {
    // 对 得到的数据库进行 字段 筛选，不返回密码
    const _id = this.$route.params.id;
    const {
      data: { data },
    } = await this.$request.get("/user", { params: { _id } });
    this.data = data[0];
    this.url = "http://localhost:2003/" + this.data.imgUrl;
    // 图片地址拼接，访问服务器的地址
    console.log(data);
  },
  methods: {
    async imgurlChange() {
      // console.log(this.imgurl);
      const _id = this.$route.params.id;
      console.log(this.$refs.imgUpload.files[0]);
      const params = new FormData();
      params.append("haoge", this.$refs.imgUpload.files[0]);
      const { data } = await this.$request.put("upload/avatar/" + _id, params, {
        contentType: false, // 不需要自定义content-type
        // headers:{
        //     'Content-Type':'multipart/form-data'
        // }
      });
      // console.log(data);
      this.url = "http://localhost:2003/" + data.data; // 访问 服务器的图片地址
    },
    async submit() {
      const { _id, username, role, gender } = this.data;
      const { data } = await this.$request.put("/user/" + _id, {
        username,
        role,
        gender,
      });
      console.log(data);
      if (data.code === 1) {
        this.$message({
          type: "success",
          message: "修改成功!",
        });
        this.$router.push({ name: "userList" });
      }
    },
  },
};
</script>
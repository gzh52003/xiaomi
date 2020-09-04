<template>
  <div>
    <p>编辑商品</p>
    <el-row>
      <el-col :span="16">
        <el-form
          status-icon
          label-width="100px"
          class="demo-ruleForm"
          style="width: 90%; margin:0 auto"
        >
          <el-form-item label="商品名称" prop="product_name">
            <el-input type="text" v-model="data.product_name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="产品简介" prop="role">
            <el-input v-model.number="data.product_brief"></el-input>
          </el-form-item>
          <el-form-item label="原价" prop="product_org_price">
            <el-input v-model.number="data.product_org_price"></el-input>
          </el-form-item>
          <el-form-item label="现价" prop="product_price">
            <el-input v-model.number="data.product_price"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submit">确认</el-button>
            <el-button>重置</el-button>
          </el-form-item>
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
    };
  },
  methods: {
    // async imgurlChange() {
    //   // console.log(this.imgurl);
    //   const _id = this.$route.params.id;
    //   console.log(this.$refs.imgUpload.files[0]);
    //   const params = new FormData();
    //   params.append("haoge", this.$refs.imgUpload.files[0]);
    //   const { data } = await this.$request.put("upload/avatar/" + _id, params, {
    //     contentType: false, // 不需要自定义content-type
    //     // headers:{
    //     //     'Content-Type':'multipart/form-data'
    //     // }
    //   });
    //   // console.log(data);
    //   this.url = "http://localhost:2003/" + data.data; // 访问 服务器的图片地址
    // },
    async submit() {
      const {
        product_name,
        product_brief,
        product_price,
        product_org_price,
      } = this.data;
      const { data } = await this.$request.post("/goods/", {
        product_name,
        product_brief,
        product_price,
        product_org_price,
      });
      console.log(data);
      if (data.code === 1) {
        this.$message({
          type: "success",
          message: "修改成功!",
        });
        this.$router.push({ name: "goodList" });
      }
    },
  },
};
</script>
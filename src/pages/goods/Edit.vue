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
          <!-- :model="ruleForm"
      :rules="rules"
          ref="ruleForm"-->
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
          <el-form-item label="商品图片" prop="img">
            <el-upload
              class="upload-demo"
              action="http://localhost:2003/api/upload/avatar/"
              name="goods"
              :data="{'imgFolder': 'goods'}"
              :on-success="success"
              :multiple="true"
              :limit="5"
              list-type="picture"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">上传商品图片，最多五张</div>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submit">提交</el-button>
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
  async beforeCreate() {
    const _id = this.$route.params.id;
    const {
      data: { data },
    } = await this.$request.get("/goods", { params: { _id } });
    this.data = data[0];
  },

  methods: {
    success(response) {
      // console.log(response);
      const { data } = response;
      this.data.img_url.push("http://localhost:2003" + data);
      // console.log(this.data.img_url);
    },
    async submit() {
      console.log(this.data);
      const {
        _id,
        product_name,
        product_brief,
        product_price,
        product_org_price,
        img_url,
      } = this.data;

      const { data } = await this.$request.put("/goods/" + _id, {
        product_name,
        product_brief,
        product_price,
        product_org_price,
        img_url,
      });
      // console.log(data);
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
<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="产品编号:">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="产品名称:">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="浏览:">
      <el-upload
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        list-type="picture"
      >
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </el-form-item>
    <!-- <el-form-item label="审批人">
    <el-input v-model="formInline.user" placeholder="审批人"></el-input>
    </el-form-item>

        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :file-list="fileList"
    
     -->
    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即添加</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>

<style lang="scss">
.el-input__inner {
  width: 200px;
}
.el-main {
  margin: 0 auto;
}
</style>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
  },
};
</script>
<template>
  <div class="orderAdd">
    <el-form
      :label-position="labelPosition"
      label-width="80px"
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      class="demo-ruleForm"
    >
      <el-form-item label="订单编号" prop="orderNumber">
        <el-input v-if="orderid" v-model.number="ruleForm.orderNumber" disabled></el-input>
        <el-input v-else v-model.number="ruleForm.orderNumber"></el-input>
      </el-form-item>
      <el-form-item
        label="下单时间"
        prop="orderTime"
        value-format="yyyy-MM-dd HH:mm:ss"
        format="yyyy-MM-dd HH:mm:ss"
      >
        <el-date-picker v-model="ruleForm.orderTime" type="datetime" placeholder="选择日期时间"></el-date-picker>
      </el-form-item>
      <el-form-item label="数量">
        <el-input-number
          v-model="ruleForm.amount"
          @change="handleChange"
          :min="0"
          :max="9"
          label="描述文字"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="消费金额" prop="monetary">
        <el-input v-model="ruleForm.monetary"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="ruleForm.done">
          <el-option label="未完成" :value="false"></el-option>
          <el-option label="已完成" :value="true"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        v-if="ruleForm.done"
        label="发货时间"
        value-format="yyyy-MM-dd HH:mm:ss"
        format="yyyy-MM-dd HH:mm:ss"
      >
        <el-date-picker v-model="ruleForm.deliveryTime" type="datetime" placeholder="选择日期时间"></el-date-picker>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="ruleForm.remarks"></el-input>
      </el-form-item>
      <el-form-item label=" ">
        <el-button type="primary" plain @click="submitForm">{{orderid ? '修改' : '添加'}}</el-button>
        <el-button type="info" plain @click="resetForm">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    var validatPrices = (change, value, callback) => {
      if (
        change.required === false &&
        (value === "" || value === null || value === undefined)
      ) {
        callback();
      }
      const isPrice = /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/;
      if (isPrice.test(value)) {
        callback();
      } else {
        callback(new Error(change.message || "请输入正确的价格，例：10, 10.00"));
      }
    };
    return {
      orderid: "",
      labelPosition: "left",
      ruleForm: {
        orderNumber: "",
        remarks: "",
        type: "",
        monetary: "",
        orderTime: "",
        // value:'',
        amount: "1",
        deliveryTime: "",
        done: false,
      },
      rules: {
        orderNumber: [
          { required: true, message: "请输入订单编号", trigger: "change" },
          {
            type: "number",
            min: 9,
            message: "编号长度为9位以上",
            trigger: "change",
          },
        ],
        monetary: [
          { required: true, message: "请输入金额", trigger: "change" },
          { validator: validatPrices, trigger: "change" },
        ],
      },
      // pickerOptions: {
      //   disabledDate(time) {
      //     return time.getTime() > Date.now();
      //   },
      // },
      // value: ''
    };
  },
  methods: {
    handleChange(value) {
      console.log(value);
    },
    submitForm() {
      console.log(111, this.$refs["ruleForm"]);
      this.$refs["ruleForm"].validate(async (valid) => {
        console.log(222);
        //valid 为校验结果 全部校验通过的时候值为 true ，否则为 false
        if (valid) {
          const { orderid, ruleForm } = this;

          if (orderid) {
            //编辑
            const { data } = await this.$request.put("/order/" + orderid, {
              ...ruleForm,
            });
            if (data.code === 1) {
              this.$message({
                type: "success",
                message: "修改成功！",
              });
            }
          } else {
            //添加
            const { data } = await this.$request.post("/order/", {
              ...ruleForm,
            });
            if (data.code === 1) {
              this.$message({
                type: "success",
                message: "添加成功！",
              });
            }
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm() {
      // this.$refs[ruleForm].resetFields();
      // console.log(this)

      this.$router.go(-1); //返回上一层
    },
  },
  async created() {
    console.log(this.$route.query);
    const { id } = this.$route.query;
    this.orderid = id;
    if (id) {
      const res = await this.$request.get("order/", {
        params: { _id: id },
      });
      // console.log(res)
      Object.assign(this.ruleForm, res.data.data[0]);
    }
    // console.log(this.ruleForm)
    // this.id=id
  },
};
</script>

<style type="scss">
.orderAdd {
  width: 600px;
  margin-top: 50px;
  padding: 20px 50px 10px 50px;
  margin-left: 100px;
  border: 1px solid #ccc;
}
</style>
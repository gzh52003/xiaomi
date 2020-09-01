<template>
  <div class="orderAdd">
    <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
      <el-form-item label="订单编号">
        <el-input v-bind:value="formLabelAlign.orderNumber"></el-input>
      </el-form-item>
      <el-form-item label="下单时间">
        <el-date-picker
          v-model="orderTime"
          type="date"
          placeholder="">
        </el-date-picker>
        <span style="color:#DCDFE6"> - </span>
        <el-time-picker
          arrow-control
          v-model="value"
          :picker-options="{
            selectableRange: '18:30:00 - 20:30:00'
          }"
          placeholder="">
        </el-time-picker>
      </el-form-item>
      <el-form-item label="数量">
        <el-input-number v-model="num" @change="handleChange" :min="0" :max="9" label="描述文字"></el-input-number>
      </el-form-item>
      <el-form-item label="消费金额">
        <el-input v-model="formLabelAlign.monetary"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="发货时间">
        <el-date-picker
          v-model="dayValue"
          type="date"
          placeholder="">
        </el-date-picker>
        <span style="color:#DCDFE6"> - </span>
        <el-time-picker
          arrow-control
          v-model="value"
          :picker-options="{
            selectableRange: '18:30:00 - 20:30:00'
          }"
          placeholder="">
        </el-time-picker>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="formLabelAlign.region"></el-input>
      </el-form-item>
      <el-form-item label=" ">
        <el-button type="primary" plain>确定</el-button>
        <el-button type="info" plain>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
      return {
        id:"",
        labelPosition: 'left',
        formLabelAlign: {
          orderNumber: '',
          region: '',
          type: '',
          monetary:'',
        },
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
        },
        orderTime: '',
        value:'',
        num:'1',
        options: [{
          value: '选项1',
          label: '已完成'
        }, {
          value: '选项2',
          label: '未完成'
        }, ],
        // value: ''
      }
    },

    async created(
      
    ){
      // console.log(this.$route.query)
      const{id}=this.$route.query
      if(id){
        const res= await this.$request.get('order/',{
          params:{_id:id}
        })
        console.log(res)
      }
      // this.id=id
    },
    methods: {
      handleChange(value) {
        console.log(value);
      }
    }
};

</script>

<style type="scss">
  .orderAdd{
    width: 600px;
    margin-top: 50px;
    padding:20px 50px 10px 50px;
    margin-left: 100px;
    border: 1px solid #ccc;
  }
</style>
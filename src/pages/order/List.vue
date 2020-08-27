<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="10">订单号：
        <el-input v-model="input" placeholder="请输入内容" class="_input"></el-input></el-col>
      <el-col :span="10">下单时间：
        <el-input v-model="inputTime" placeholder="请输入内容" class="_input"></el-input></el-col>
      <el-col :span="4"><el-button type="primary" icon="el-icon-search">搜索</el-button></el-col>
    </el-row>
    <el-table
      ref="multipleTable"
      :data="dataList"
      tooltip-effect="dark"
      style="width: 100%;text-align:center"
       class="_table"
       stripe="ture"
       border="true"
      >
      <el-table-column
        type="selection">
      </el-table-column>
      <el-table-column
      label="#"  type="index">
      </el-table-column>
      <el-table-column
        label="订单编号" prop="orderNumber">
        <!-- <template slot-scope="scope">{{ scope.row.orderNumber }}</template> -->
      </el-table-column>
      <el-table-column
        label="下单时间" width="200" prop="orderTime">
        <!-- <template slot-scope="scope">{{ scope.row.orderTime }}</template> -->
      </el-table-column>
      <el-table-column
        label="数量" width="40" prop="amount">
        <!-- <template slot-scope="scope">{{ scope.row.amount }}</template> -->
      </el-table-column>
      <el-table-column
        label="消费金额" prop="monetary">
        <!-- <template slot-scope="scope">{{ scope.row.monetary }}</template> -->
      </el-table-column>
      <el-table-column
        label="状态" width="70">
        <template slot-scope="scope">{{ scope.row.done ? '已完成' : '未完成' }}</template>
      </el-table-column>
      <el-table-column
        label="发货时间"  width="200" prop="deliveryTime">
        <!-- <template slot-scope="scope">{{ scope.row.deliveryTime }}</template> -->
      </el-table-column>
      <el-table-column
        label="备注" prop="remarks">
        <!-- <template slot-scope="scope">{{ scope.row.remarks }}</template> -->
      </el-table-column>
      <el-table-column
        label="操作" width="150">
        <template v-slot:default="scope">
          <el-button type="danger" plain size="mini" @click="deleteOrder(scope.row._id)">删除</el-button>
          <el-button type="success" plain size="mini" @click="goto(scope.row._id)">编辑</el-button>
          </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page=currentPage
      :page-size=pageSize
      layout="total, sizes, prev, pager, next, jumper"
      :total="dataList.length">
    </el-pagination>
  </div>
</template>


<script>

// import request from '../../utils/request';


export default {
  data(){
    return{
      input:'',
      inputTime:'', 
      dataList:[],
      currentPage:1,
      pageSize:10
      // currentId:"",
    }
  },
   methods: {
      handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
        this.pageSize = val;
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage = val;
      },
      async deleteOrder(id){
        const {data}=await this.$request.delete('/order/'+ id)
        console.log(data)
        if(data.code==1){
        this.dataList=this.dataList.filter(item=>item._id!=id)
        }
      },
      goto(){
        //跳转路由传参
        this.$request.push('/order/Add')
      }
    },
  async created(){
    // axios({
    //   url:'http://localhost:2003/api/order',
    //   method:'get'
    // })

    const {data} = await this.$request.get(`/order?page=${this.currentPage}&size=${this.pageSize}`)
    console.log(data)

    this.dataList = data.data




    // axios.post('http://localhost:2003/api/order',{
    //   //post发送的数据
    // })
  }
  
//  async created(){
//    const res = await this.$request.get('/user')
//    console.log(res)
//   }
};
</script>

<style lang="scss">
  .el-row{
    margin-left: 10px !important;
    margin-right: 10px !important;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  ._input{
    width: 80%;
    margin-left: 10px;
  }
  // ._table{
  //   text-align: center;
  // }
  th,td{
    text-align: center !important;
  }
</style>
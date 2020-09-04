<template>
  <div>
    <el-table
      ref="multipleTable"
      :data="dataList"
      tooltip-effect="dark"
      style="width: 100%;text-align:center"
      class="_table"
      :stripe="true"
      :border="true"
    >
      <el-table-column type="selection"></el-table-column>
      <el-table-column label="#" type="index"></el-table-column>
      <el-table-column label="订单编号" prop="orderNumber">
        <!-- <template slot-scope="scope">{{ scope.row.orderNumber }}</template> -->
      </el-table-column>
      <el-table-column label="下单时间" width="200" prop="orderTime">
        <template slot-scope="scope">{{ scope.row.orderTime | formatdate('YYYY/MM/DD hh:mm:ss') }}</template>
      </el-table-column>
      <el-table-column label="数量" width="40" prop="amount">
        <!-- <template slot-scope="scope">{{ scope.row.amount }}</template> -->
      </el-table-column>
      <el-table-column label="消费金额" prop="monetary">
        <!-- <template slot-scope="scope">{{ scope.row.monetary }}</template> -->
      </el-table-column>
      <el-table-column label="状态" width="70">
        <template slot-scope="scope">{{ scope.row.done ? '已完成' : '未完成' }}</template>
      </el-table-column>
      <el-table-column label="发货时间" width="200" prop="deliveryTime">
        <template slot-scope="scope">{{ scope.row.deliveryTime | formatdate('YYYY/MM/DD hh:mm:ss')}}</template>
      </el-table-column>
      <el-table-column label="备注" prop="remarks">
        <!-- <template slot-scope="scope">{{ scope.row.remarks }}</template> -->
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template v-slot:default="scope">
          <el-button type="danger" plain size="mini" @click="deleteOrder(scope.row._id)">删除</el-button>
          <el-button type="success" plain size="mini" @click="addOrder(scope.row._id)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      style="margin:50px;"
      layout="prev, pager, next"
      :total="100"
      @current-change="pageChange"
    ></el-pagination>
  </div>
</template>


<script>
import Vue from "vue";

Vue.filter("formatdate", (val, fmt) => {
  if (val === "") {
    return "";
  } else {
    // fmt: YYYY-MM-DD hh:mm:ss
    const d = new Date(val);
    var o = {
      "M+": d.getMonth() + 1, //月份
      "D+": d.getDate(), //日
      "h+": d.getHours(), //小时
      "m+": d.getMinutes(), //分
      "s+": d.getSeconds(), //秒
      "q+": Math.floor((d.getMonth() + 3) / 3), //季度
      S: d.getMilliseconds(), //毫秒
    };

    // 匹配年份
    // 年份比较特殊，所以单独处理
    // test方法如果返回true，RegExp.$1得到匹配的字符
    if (/(Y+)/.test(fmt)) {
      // 得到fmt字符串中Y字符对应的时间
      // YYYY => 2020
      // YY => 20
      var res = String(d.getFullYear()).substr(4 - RegExp.$1.length);

      // 替换年份:YYYY-MM-DD hh:mm:ss -> 2017-MM-DD hh:mm:ss
      fmt = fmt.replace(RegExp.$1, res);
    }

    for (var str in o) {
      // 创建正则时设定分组，以便获取匹配到的字符
      // RegExp.$1
      var reg = new RegExp("(" + str + ")");

      // 如果有匹配则把fmt中匹配到的字符替换成o中对应的时间，根据fmt中的字符决定是否补0
      // YYYYDDMM => 20170813
      // YYYY-DD-MM hh:mm:ss => 2017-08-13 20:12:30
      if (reg.test(fmt)) {
        // 得到匹配字符对应的时间
        var dddd =
          RegExp.$1.length > 1
            ? ("00" + o[str]).substr(String(o[str]).length)
            : o[str];
        fmt = fmt.replace(RegExp.$1, dddd);
      }
    }

    return fmt;
  }
});

export default {
  data() {
    return {
      page: 1,
      input: "",
      inputTime: "",
      dataList: [],
      // currentPage:1,
      // pageSize:10
      // currentId:"",
    };
  },
  methods: {
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
    },
    async deleteOrder(id) {
      this.$confirm("你确定删除这条数据吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        const { data } = await this.$request.delete("/order/" + id);
        if (data.code == 1) {
          this.dataList = this.dataList.filter((item) => item._id !== id);
        }
        this.$message({
          type: "success",
          message: "删除成功!",
        });
      });
    },
    addOrder(id) {
      //跳转路由传参
      // this.$request.push('/order/Add.vue' + id)
      this.$router.push({
        name: "orderAdd",
        query: { id },
      });
    },
    async pageChange(page) {
      const { data } = await this.$request.get(`/order?page=${page}&size=8`);

      this.dataList = data.data;
    },
  },
  async created() {
    // axios({
    //   url:'http://localhost:2003/api/order',
    //   method:'get'
    // })

    const { data } = await this.$request.get(
      `/order?page=${this.currentPage}&size=8`
    );
    console.log(data);

    this.dataList = data.data;

    // axios.post('http://localhost:2003/api/order',{
    //   //post发送的数据
    // })
  },

  //  async created(){
  //    const res = await this.$request.get('/user')
  //    console.log(res)
  //   }
};
</script>

<style lang="scss">
.el-row {
  margin-left: 10px !important;
  margin-right: 10px !important;
  margin-top: 10px;
  margin-bottom: 10px;
}
._input {
  width: 80%;
  margin-left: 10px;
}
// ._table{
//   text-align: center;
// }
th,
td {
  text-align: center !important;
}
</style>
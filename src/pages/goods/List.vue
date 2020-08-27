<template>
  <el-table
    :data="tableData"
    border
    style="width: 92%">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      fixed
      prop="date"
      label="产品编号"
      width="150">
    </el-table-column>
    <el-table-column
      prop="name"
      label="产品名称"
      width="120">
    </el-table-column>
    <el-table-column
      prop="province"
      label="浏览"
      width="100">

      <template slot-scope="scope">
      <img  :src="scope.row.province" alt="" style="width: 50px;height: 50px">
      </template>
    </el-table-column>
    <el-table-column
      prop="price"
      label="产品现价"
      width="120">
    </el-table-column>
    <el-table-column
      prop="classify"
      label="分类"
      width="100">
    </el-table-column>
    <el-table-column
      prop="sum"
      label="数量"
      width="120">
    </el-table-column>
    <el-table-column
      prop="slide"
      label="状态"
      width="120">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button type="text" size="small" >编辑</el-button>
        <el-button @click="handleClick(scope.row)" type="text" size="small" >删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>


<style lang="scss">
    .el-table td, .el-table th{
      text-align: center;
    }
</style>


<script>
     export default {
    methods: {
      handleClick(row) {
        console.log(row);
      }
    },

    data() {
      return {
        tableData: [{
          date: '1000001',
          name: `小米4 黑色版 3GB+32GB`,
          province: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/c892a7640f58032489cbff8a948b50f9.jpg',
          price: '3980',
          classify: '手机',
          sum: 100,
          slide:'在售'
        }, {
          date: '1000002',
          name: '小米4 黑色版 3GB+32GB',
          province: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/c892a7640f58032489cbff8a948b50f9.jpg',
          price: '3980',
          classify: '手机',
          sum: 100,
          slide:'在售'
        }, {
          date: '1000003',
          name: '小米4 黑色版 3GB+32GB',
          province: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/c892a7640f58032489cbff8a948b50f9.jpg',
          price: '3980',
          classify: '手机',
          sum: 100,
          slide:'在售'
        }, {
          date: '1000004',
          name: '小米4 黑色版 3GB+32GB',
          province: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/c892a7640f58032489cbff8a948b50f9.jpg',
          price: '3980',
          classify: '手机',
          sum: 100,
          slide:'在售'
        }]
      }
    }
  }
</script>
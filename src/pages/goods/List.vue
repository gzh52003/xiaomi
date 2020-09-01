<template>
  <div>
    <p>商品列表</p>
    <template>
      <el-table
        ref="multipleTable"
        :data="goodsList"
        tooltip-effect="dark"
        style="width: 80%;margin:0 auto"
        class="goodslist"
      >
        <!-- @selection-change="handleSelectionChange" -->
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" label="#" width="55"></el-table-column>
        <el-table-column prop="img_url" label="商品图片" width="120">
          <template v-slot:default="scope">
            <img :src="scope.row.img_url[0]" alt />
          </template>
        </el-table-column>
        <el-table-column prop="goods_name" label="商品名称" width="600">
          <template v-slot:default="scope">
            <h4>
              {{ scope.row.product_name }}
              <span>{{scope.row.product_brief}}</span>
            </h4>
            <p class="price">
              <del>{{scope.row.product_org_price }}</del>
              &nbsp;&nbsp;
              <span style="color:#f00">￥{{scope.row.product_price}}</span>
            </p>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template v-slot:default="scope">
            <el-button
              size="small"
              type="success"
              icon="el-icon-edit"
              circle
              @click="gotoEdit(scope.row._id)"
            ></el-button>
            <el-button
              size="small"
              type="danger"
              icon="el-icon-delete"
              circle
              @click="removeUser(scope.row._id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <el-pagination
      background
      layout="prev, pager, next"
      style="text-align:center;margin:50px 0"
      :total="total"
      :page-size="8"
      :current-page="page"
      @current-change="pageChange"
    ></el-pagination>
  </div>
</template>
<script>
export default {
  data() {
    return {
      goodsList: [],
      total: 1,
      page: 1,
    };
  },

  async beforeCreate() {
    const {
      data: { data },
    } = await this.$request.get("/goods", {
      params: {
        page: this.page,
        size: 8,
      },
    });
    this.goodsList = data.data;
    // if(goodsList.img_url )
    // console.log(Object.prototype.toString.call([]));
    this.total = data.total;

    // console.log(data);
  },
  methods: {
    gotoEdit(id) {
      this.$router.push({
        name: "editGoods",
        params: { id },
      });
    },
    async pageChange(page) {
      const {
        data: { data },
      } = await this.$request.get("/goods", {
        params: {
          page,
          size: 8,
        },
      });
      this.goodsList = data.data;
    },
    async removeUser(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          const { data } = await this.$request.delete("/goods/" + id);
          if (data.code === 1) {
            this.goodsList = this.goodsList.filter((item) => item._id !== id);
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>
<style lang="scss" >
.goodslist {
  img {
    width: 80px;
  }
  h4 {
    span {
      font-size: 14px;
      font-weight: 500;
    }
  }
}
</style>
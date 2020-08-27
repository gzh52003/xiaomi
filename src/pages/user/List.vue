<template>
  <div>
    <p>用户列表</p>
    <template>
      <el-table
        ref="multipleTable"
        :data="userList"
        tooltip-effect="dark"
        style="width: 90%;margin:0 auto"
      >
        <!-- @selection-change="handleSelectionChange" -->
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="用户名">
          <template slot-scope="scope">{{ scope.row.username }}</template>
        </el-table-column>
        <el-table-column prop="name" label="性别">
          <template slot-scope="scope">{{ scope.row.gender }}</template>
        </el-table-column>
        <el-table-column prop="address" label="权限" show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.role}}</template>
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
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
      style="text-align:center;margin-top:50px"
      :total="50"
      :current-page="page"
      @current-change="pageChange"
    ></el-pagination>
  </div>
</template>


  
<script>
export default {
  data() {
    return {
      userList: [],
      page: 1,
    };
  },

  async created() {
    const {
      data: { data },
    } = await this.$request.get("/user", {
      params: {
        page: this.page,
        size: 8,
      },
    });
    this.userList = data;
    // console.log(data);
  },
  methods: {
    gotoEdit(id) {
      // console.log(id);
      this.$router.push({
        name: "userEdit",
        params: { id },
      });
    },
    async pageChange(page) {
      const {
        data: { data },
      } = await this.$request.get("/user", {
        params: {
          page,
          size: 8,
        },
      });
      this.userList = data;
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
          const { data } = await this.$request.delete("/user/" + id);
          if (data.code === 1) {
            this.userList = this.userList.filter((item) => item._id !== id);
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
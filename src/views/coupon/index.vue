<template>
  <div class="app-container">
    <el-form
      ref="queryForm"
      :model="queryParams"
      :inline="true"
      label-width="68px"
    >
      <el-form-item label="名称" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入框架名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select
          v-model="queryParams.status"
          placeholder="请选择框架状态"
          clearable
          size="small"
        >
          <el-option label="启用" :value="0" />
          <el-option label="停用" :value="1" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          type="cyan"
          icon="el-icon-search"
          size="mini"
          @click="handleQuery"
        >搜索
        </el-button>
        <el-button
          icon="el-icon-refresh"
          size="mini"
          @click="resetQuery"
        >重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
        >新增</el-button>
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="list">
      <el-table-column
        min-width="120"
        label="框架名称"
        show-overflow-tooltip
        align="center"
        show
        prop="name"
      />
      <el-table-column
        min-width="30"
        label="状态"
        show-overflow-tooltip
        align="center"
        show
        prop="status"
      />
      <el-table-column label="宣传图" align="center" prop="image">
        <template slot-scope="scope">
          <img class="share-img" :src="scope.row.image">
        </template>
      </el-table-column>
      <el-table-column label="宣传主题" align="center" prop="content" />
      <el-table-column label="APPID" align="center" prop="targetAppid" />
      <el-table-column
        label="操作"
        align="center"
        min-width="150"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            :loading="scope.row.editloading"
            @click="handleUpdate(scope.row, scope.$index)"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            :loading="scope.row.removeloading"
            @click="handleDelete(scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />
  </div>
</template>

<script>
import { getCoupon } from '@/api/coupon'

export default {
  data() {
    return {
      // 总条数
      total: 3,
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        name: null,
        status: null
      },
      loading: false,
      list: []
    }
  },
  async mounted() {
    this.getList()
  },
  methods: {
    async getList() {
      this.loading = true
      const { code, data } = await getCoupon(this.queryParams)
      this.loading = false
      if (!code) {
        this.list = data
      }
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1
      this.getList()
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm('queryForm')
      this.handleQuery()
    },
    /** 新增按钮操作 */
    handleAdd() {},

    /** 删除按钮操作 */
    handleDelete(row) {}
  }
}
</script>

<style>
.share-img {
  height: 80px;
  width: 50px;
}
</style>

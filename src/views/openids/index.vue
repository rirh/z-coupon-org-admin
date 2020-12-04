<template>
  <div class="app-container">
    <el-form
      ref="queryForm"
      :model="queryParams"
      :inline="true"
      label-width="45px"
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
          <el-option label="上线" :value="1" />
          <el-option label="下架" :value="0" />
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
      <el-table-column label="id" align="center" prop="_id" />
      <el-table-column label="openid" align="center" prop="openid" />
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
import { getOpenidList } from '@/api/openid'

export default {
  data() {
    return {
      // 总条数
      total: 0,
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
      const { code, data, affectedDocs } = await getOpenidList(
        this.queryParams
      )
      this.loading = false
      this.total = affectedDocs
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
    handleAdd() {}
  }
}
</script>

<style>
.share-img {
  height: 80px;
  width: 50px;
}
</style>

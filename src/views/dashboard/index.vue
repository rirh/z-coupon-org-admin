<template>
  <div class="app-container dashboard-container">
    <div>
      <el-row>
        <el-col :md="10" :lg="8" :span="8" :xs="24" :sm="24">
          <el-card class="box-card">
            <el-row class="dashboard-title">
              Coupon Active User
            </el-row>
            <el-row class="dashboard-text">
              <countTo :start-val="0" :end-val="CouponUser" :duration="3000" />
            </el-row>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { getOpenidList } from '@/api/openid'
import countTo from 'vue-count-to'

export default {
  name: 'Dashboard',
  components: {
    countTo
  },
  data() {
    return {
      CouponUser: 0,
      start: 0
    }
  },
  async mounted() {
    const { affectedDocs } = await getOpenidList()
    this.CouponUser = affectedDocs
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  background-color: #fafafa;
  &-title {
    text-align: center;
    margin: 5px 0;
    font-size: 20px;
  }
  &-text {
    text-align: center;
    margin: 10px;
    font-size: 26px;
    font-weight: bold;
  }
}
</style>

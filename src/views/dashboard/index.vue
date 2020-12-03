<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getCoupon } from '@/api/coupon'
export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters(['name'])
  },
  async mounted() {
    const res = await getCoupon()
    console.log(res)
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>

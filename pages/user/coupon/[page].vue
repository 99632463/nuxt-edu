<template>
  <loading-group :pending="pending" :error="error">
    <div class="px-3">
      <n-grid :x-gap="20" :cols="2">
        <n-grid-item v-for="(item, index) in rows" :key="index" :item="item">
          <UserCouponList :item="item" />
        </n-grid-item>
      </n-grid>
    </div> 
    <div class="flex justify-center items-center mt-5 pb-10">
      <n-pagination
        size="large"
        :item-count="total"
        :page="page"
        :page-size="limit"
        :on-update-page="handlePageChange"
      />
    </div>
  </loading-group>
</template>

<script setup>
import {NPagination,NGrid,NGridItem} from 'naive-ui'

useHead({title: '优惠卷记录'})

const {
  page,
  limit,
  total,
  handlePageChange,
  rows,
  pending,
  error,
  refresh,
} = await usePage(({page,limit}) => {
  return useUserCouponApi(page)
})
</script>
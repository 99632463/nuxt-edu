<template>
  <loading-group :pending="pending" :error="error">
    <div class="px-3">
      <UserBuyList v-for="(item, index) in rows" :key="index" :item="item"/>
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
import {NPagination} from 'naive-ui'

useHead({title: '购买记录'})

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
  return useOrderListApi(page)
})
</script>
<template>
  <n-grid :x-gap="20">
    <n-grid-item :span="18">
      <loading-group :pending="pending" :error="error">
        <div>
          <TestpaperList v-for="(item, index) in rows" :key="index" :item="item"/>
        </div>
        <div class="flex justify-center items-center mt-5 mb-10">
          <n-pagination
            size="large"
            :item-count="total"
            :page="page"
            :page-size="limit"
            :on-update-page="handlePageChange"
          />
        </div>
      </loading-group>
    </n-grid-item>
    <n-grid-item :span="6">
      <HotCourseList />
    </n-grid-item>
  </n-grid>
</template>

<script setup>
import { NButton, NGrid, NGridItem,NPagination } from "naive-ui";

useHead({
  title: "考试",
});

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
  return useListApi('testpaper', {
    page
  })
})
</script>
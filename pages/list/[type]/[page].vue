<template>
  <div>
    <n-breadcrumb class="mb-5">
      <n-breadcrumb-item>
        <nuxt-link to='/'>首页</nuxt-link>
      </n-breadcrumb-item>
      <n-breadcrumb-item>
        <nuxt-link>{{title}}</nuxt-link>
      </n-breadcrumb-item>
    </n-breadcrumb>
    
    <loading-group :pending="pending" :error="error">
      <template #loading>
        <LoadingCourseSkeleton />
      </template>
      <n-grid :x-gap="20" :cols="4">
        <n-gi v-for="(item,index) in rows" :key="index">
          <CourseList :item="item"/>
        </n-gi>
      </n-grid>
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
  </div>
</template>

<script setup>
import {NGi,NGrid,NPagination, NBreadcrumbItem, NBreadcrumb} from 'naive-ui'

const route = useRoute()
const {type} = route.params
const title = route.meta.title

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
  return useListApi(type, {
    page
  })
})

definePageMeta({
  middleware: ['list']
})
</script>
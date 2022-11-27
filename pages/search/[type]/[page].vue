<template>
  <div>
    <h5 class="text-lg my-3">"{{title}}"的搜索相关结果</h5>
    <ui-tab>
      <ui-tab-item 
        :active="type === item.value" 
        v-for="(item,index) in tabs" 
        :key="index"
        @click="handleClick(item.value)"
      >
        {{item.label}}
      </ui-tab-item>
    </ui-tab>
    
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
import {NGi,NGrid,NPagination} from 'naive-ui'

const route = useRoute()
const title = ref(route.query.keyword)
const type = ref(route.params.type)
useHead({title})

const tabs = [
  {
    label: '课程',
    value: 'course'
  },
  {
    label: '专栏',
    value: 'column'
  }
]

const handleClick = t => {
  navigateTo({
    params: {
      ...route.params,
      type: t
    },
    query: {
      ...route.query
    }
  })
}

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
  return useSearchListApi(() => {
    return {
      page,
      keyword: title.value,
      type: type.value
    }
  })
})

const stop = watch(() => route.query.keyword, (val) => {
  title.value = val
  refresh()
})

onBeforeUnmount(() => {
  stop()
})

definePageMeta({
  middleware: ['search']
})
</script>
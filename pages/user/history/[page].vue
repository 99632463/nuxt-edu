<template>
  <div>
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
      <div class="px-3">
        <UserHistoryList v-for="(item, index) in rows" :key="index" :item='item'/>
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
  </div>
</template>

<script setup>
import {NPagination} from 'naive-ui'

const route = useRoute()
const type = ref(route.query.tab || 'course')
useHead({title: '学习记录'})

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
      page: 1
    },
    query: {
      ...route.query,
      tab: t
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
  return useUserHistoryApi(() => {
    return {
      page,
      type: type.value
    }
  })
})
</script>
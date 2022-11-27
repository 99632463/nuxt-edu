<template>
  <UiCard>
    <UiCardHeader>
      <span class="mb-2 text-xs text-gray-400">学习进度</span>
      <n-progress type="line" :percentage="item.progress" :show-indicator="false"></n-progress>
    </UiCardHeader>
    <UiCardBody class="flex">
      <n-tag size="small" v-if="route.query.tab != 'column'">{{t[item.type]}}</n-tag>
      <span class="ml-3">uni-app实战在线教育</span>
      <n-button type="primary" size="tiny" class="ml-auto" @click="open">继续观看</n-button>
    </UiCardBody>
    <UiCardFooter></UiCardFooter>
  </UiCard>
</template>

<script setup>
import {NProgress,NTag,NButton} from 'naive-ui'

const route = useRoute()

const props = defineProps({
  item: Object
})

const t = {
  audio: '音频',
  video: '视频',
  media: '图文',
  column: '专栏',
  book: '电子书',
  course: '课程'
}

const open = () => {
  navigateTo(`/detail/${route.query.tab}/${props.item.id}`)
}
</script>
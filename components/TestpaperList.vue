<template>
  <section class="bg-white shadow p-5 rounded mb-5">
    <div class="flex justify-between">
      <h4>标题</h4>
      <small class="text-rose-500">时长: {{item.expire}}分钟</small>
    </div>
    <p class="py-5 text-gray-500 text-sm">
      题目总数: {{item.question_count}} 总分数：{{item.total_score}} 及格分：{{item.pass_score}}
    </p>
    <p class="flex justify-end">
      <n-button type="primary" @click="test">立即考试</n-button>
    </p>
  </section>
</template>

<script setup>
import {NButton} from 'naive-ui'

const props = defineProps({
  item: Object
})

const test = () => {
  navigateTo('/paper_test/' + props.item.id)
}
</script>
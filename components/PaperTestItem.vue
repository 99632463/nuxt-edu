<template>
  <div class="test-item">
    <div class="title">
      第 {{index + 1}} 题 {{typeOptions[item.type]}}
    </div>
    <div class="p-4">
      <p class="mb-5" v-html="item.title"></p>
      <!-- 题目选项 -->
      <div v-if="item.type == 'radio' || item.type == 'trueOrfalse' || item.type == 'checkbox'">
        <p class="tip">答案：</p>
        <ul>
          <li 
            class="option" 
            v-for="(q, qI) in item.options" 
            :key="qI" 
            @click="handleChooseOption(qI)"
            :class="{active: isActive(qI)}"
          >
            <span class="mr-2">{{en[qI]}}</span>
            <div v-html="q"></div>
          </li>
        </ul>
      </div>
      <!-- 填空题 -->
      <div v-else-if="item.type == 'completion'">
        <div class="mb-3 border rounded p-3" v-for="(uv, uvI) in modelValue" :key="uvI">
          <div class="flex items-center justify-between mb-3">
            <h5 class="text-sm">填空 {{uvI + 1}}</h5>
            <n-icon v-if="uvI > 0" @click="remove(uvI)"><Close /></n-icon>
          </div>
          <n-input v-model:value="modelValue[uvI]" type="textarea"></n-input>
        </div>

        <n-button type="primary" dashed class="w-full my-3" @click="add">添加填空</n-button>
      </div>
      <!-- 问答题 -->
      <div v-else>
        <div class="mb-3 border rounded p-3">
          <n-input v-model:value="modelValue[0]" type="textarea"></n-input>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {NIcon, NInput, NButton} from 'naive-ui'
import {Close} from '@vicons/ionicons5'

const props = defineProps({
  item: Object,
  index: Number
})

const modelValue = ref(props.item.user_value)

// 移除填空
const remove = (i) => {
  modelValue.value.splice(i, 1)
}

// 添加填空
const add = () => {
  modelValue.value.push('')
}

// 题目类型
const typeOptions = {
  answer: '问答题',
  completion: '填空题',
  trueOrfalse: '判断题',
  checkbox: '多选题',
  radio: '单选题'
}

// 选项转化
const en = {
  0: 'A',
  1: 'B',
  2: 'C',
  3: 'D',
  4: 'E',
  5: 'F',
  6: 'G'
}

// 单选/多选是否选中
function isActive(v){
  const {item} = props;
  if(item.type == 'radio' || item.type == 'trueOrfalse'){
    // 单选
    return modelValue.value == v
  }
  return modelValue.value.includes(v)
}

const handleChooseOption = val => {
  const {item} = props;
  if(item.type == 'radio' || item.type == 'trueOrfalse'){
    // 单选
    modelValue.value = modelValue.value == val ? -1 : val
  } else {
    // 多选
    let i = modelValue.value.findIndex(v => v == val)
    if(i == -1){
      modelValue.value.push(val)
    } else {
      modelValue.value.splice(i, 1)
    }
  }
}

// 监听值的变化
const emit = defineEmits(['change'])
watch(modelValue, newVal => {
  emit('change', unref(newVal))
}, { deep: true })
</script>

<style>
  .test-item{
    @apply shadow rounded mb-5;
  }
  .test-item .title{
    @apply bg-gray-100 p-4 border-b text-sm;
  }
  .test-item .tip{
    @apply text-xs mb-3 text-gray-500;
  }
  .test-item .option{
    transition: all 0.2s;
    @apply flex border p-2 rounded text-sm mb-2 cursor-pointer 
    hover:(!border-light-500 !bg-light-blue-50 text-light-blue-600)
    active:(!bg-light-blue-200);
  }
  .test-item .active{
    @apply !border-light-500 !bg-light-blue-50 text-light-blue-600;
  }
</style>
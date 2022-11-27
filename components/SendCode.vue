<template>
  <n-button :loading="loading" type="primary" ghost :disabled="time > 0 && !phone" @click="send">
    {{text}}
  </n-button>
</template>

<script setup>
import {NButton} from 'naive-ui'

const props = defineProps(['phone'])

const time = ref(0)
const timer = ref(null)
const loading = ref(null)

const text = computed(() => {
  if(loading.value){
    return '发送中...'
  }
  if(time.value > 0){
    return time.value + ' s'
  }
  return '获取验证码'
})

const send = async () => {
  loading.value = true
  const {data} = await useGetCaptchaApi(props.phone)
  loading.value = false

  alert(data.value)

  time.value = 60
  if(timer.value) clearInterval(timer.value)
  timer.value = setInterval(() => {
    time.value--
    if(time.value <= 0){
      clearInterval(timer.value)
    }
  }, 1000)
}

onBeforeUnmount(() => {
  if(timer.value) clearInterval(timer.value)
})
</script>
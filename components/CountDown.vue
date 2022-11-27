<template>
  <div class="count-down">
    <small>{{data.days}}</small>
    天
    <small>{{data.hours}}</small>
    :
    <small>{{data.minutes}}</small>
    :
    <small>{{data.seconds}}</small>
  </div>
</template>

<script setup>
import { times } from 'lodash';

const props = defineProps({
  time: {
    type: [String, Number],
    default: ''
  }
})

const emit = defineEmits(['start', 'end'])
const data = useCountDown(props.time)

function useCountDown(end_time){
  const timeout = ref(0)
  const timer = ref(null)

  end_time = new Date(end_time).getTime()
  timeout.value = (end_time - Date.now()) / 1000

  if(timeout.value <= 0) return emit('end')

  close()

  // 开启倒计时
  timer.value = setInterval(() => {
    timeout.value--
    if(timeout.value <= 0){
      close()
      return emit('end')
    }
  }, 1000)

  function close(){
    if(timer.value) {
      clearInterval(timer.value)
    }
  }

  const d = computed(() => formatDiffDate(timeout.value))
  return d
}

function formatDiffDate(seconds){
  let time = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  }

  if(seconds > 0) {
    time.days = Math.floor(seconds / (60 * 60 * 24))
    time.hours = Math.floor(seconds / (60 * 60)) - time.days * 24
    time.minutes = Math.floor(seconds / 60) - time.days * 24 * 60 - time.hours * 60
    time.seconds = Math.floor(seconds) - time.days * 24 * 60 * 60 - time.hours * 60 * 60 - time.minutes * 60
  }

  time.days = time.days < 10 ? '0' + time.days : time.days
  time.hours = time.hours < 10 ? '0' + time.hours : time.hours
  time.minutes = time.minutes < 10 ? '0' + time.minutes : time.minutes
  time.seconds = time.seconds < 10 ? '0' + time.seconds : time.seconds

  return time
}
</script>

<style scoped>
.count-down small{
  background: white;
  border-radius: 2px;
  padding: 2px 3px;
  margin: 0 3px;
  @apply text-yellow-500;
}
</style>
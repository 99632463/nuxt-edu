<template>
  <div class="text-center">
    {{formatTime(time_out)}}
  </div>
</template>

<script setup>
  const props = defineProps({
    expire: {
      type: Number,
      default: 120 //分钟
    }
  })

  function formatTime(result) {
    var h = Math.floor(result / 3600) < 10 ? '0' + Math.floor(result / 3600) : Math.floor(result / 3600)
    var m = Math.floor(result / 60 % 60) < 10 ? '0' + Math.floor(result / 60 % 60) : Math.floor(result / 60 % 60)
    var s = Math.floor(result % 60) < 10 ? '0' + Math.floor(result % 60) : Math.floor(result % 60)
    
    return result = result > 3600 ? (h + ':' + m + ':' + s) : m + ':' + s
  }

  let timer = null
  const time_out = ref(0)

  onMounted(() => {
    initTimeBox()
  })
  onBeforeUnmount(() => clearInterval(timer))

  function initTimeBox(){
    if(timer) clearInterval(timer)

    time_out.value = props.expire * 60
    if(time_out.value > 0){
      timer = setInterval(handletime_out, 1000)
    }
  }

  const emit = defineEmits(['end'])
  function handletime_out(){
    if(time_out.value == 0){
      emit('end')
      return clearInterval(timer)
    }
    time_out.value--
  }
</script>
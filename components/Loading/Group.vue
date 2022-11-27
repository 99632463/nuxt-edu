<template>
  <div>
    <template v-if="loading">
      <slot name='loading'>
        <LoadingSkeleton />
      </slot>
    </template>
    <template v-else-if="error"> 错误提示: {{ error?.data?.data }} </template>
    <template v-else>
      <slot />
    </template>
  </div>
</template>

<script setup>
import {onBeforeUnmount} from 'vue'

const props = defineProps({
  pending: Boolean,
  error: {
    type: [Boolean, String, Symbol],
    default: false
  }
})

const loading = ref(false)
const stop = watchEffect(() => {
  if(props.pending && !loading.value){
    loading.value = true
  } else {
    setTimeout(() => {
      loading.value = false
    }, 200)
  }
})

onBeforeUnmount(() => stop())
</script>
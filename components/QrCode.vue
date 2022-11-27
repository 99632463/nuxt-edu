<template>
  <div class="flex justify-center">
    <n-image :src="src" class="border" width="280" height="280"></n-image>
  </div>
</template>

<script setup>
import QRCode from 'qrcode'
import {NImage} from 'naive-ui'

const props = defineProps(['data'])

const src = ref(null)
QRCode.toDataURL(props.data, {
  width: 280,
  height: 280,
  margin: 2
}, function (err, url) {
  src.value = url
})
</script>
<template>
  <div>
    <n-image :src="src" class="border" width="280" height="280"></n-image>
  </div>
</template>

<script setup>
import QRCode from 'qrcode'
import {NImage} from 'naive-ui'

const src = ref(null)
QRCode.toDataURL('http://192.168.1.102:8080?name=wang', {
  width: 280,
  height: 280,
  margin: 2
}, function (err, url) {
  src.value = url
})
</script>
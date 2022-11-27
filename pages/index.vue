<template>
  <loading-group :pending="pending" :error="error">
    <template v-for="(item, index) in data" :key="index">
      <Banner v-if="item.type === 'swiper'" :data='item.data'/>
      <ImageNav v-else-if="item.type === 'icons'" :data='item.data'/>
      <ImageAd v-else-if="item.type === 'imageAd'" :data='item.data'/>
      <ListCard v-else-if="item.type === 'list'" :title="item.title" :data='item.data'/>
      <ListCard v-else-if="item.type === 'promotion'" :type="item.listType" :title="item.title" :data='item.data'/>
    </template>
  </loading-group>
</template>

<script setup>
useHead({
  title: '帝杀编程首页'
})

const { pending, data, error } = await useIndexDataApi()

if (process.server && error.value) {
  throwError(error.value?.data?.data);
}
</script>
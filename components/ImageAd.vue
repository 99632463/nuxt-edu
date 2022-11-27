<template>
  <img 
    v-for="(item,index) in data" 
    :key="index" 
    :src="item.src" 
    class="w-[100%] h-[100px] rounded mb-6 cursor-pointer"
    @click="$commonOpen(item)"
  />
</template>

<script setup>
// import { NGrid, NGi, NCard } from "naive-ui";

defineProps({
  data: Array,
});
</script>
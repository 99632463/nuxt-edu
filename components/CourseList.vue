<template>
  <n-card class="cursor-pointer mb-5 shadow-md !border-0" @click="open">
    <template #cover>
      <ClientOnly>
        <ui-image :src="item.cover" class="w-[100%] h-[150px]"></ui-image>
      </ClientOnly>
    </template>
    <div class="pt-2">
      <span class="font-bold w-full truncate">{{item.title}}</span>
    </div>
    <div class="mt-2 flex items-end">
      <Price :value="item.price" />
      <Price :value="item.t_price" through class="ml-2"/>
    </div>
    <template #footer v-if="item.group_id || item.flashsale_id">
      <ClientOnly>
        <div class="bg-yellow-500 text-white p-3 text-xs flex items-center rounded-b">
          {{item.group_id ? '拼团中' : '秒杀中'}}
          <div class="ml-auto flex items-center">
            倒计时
            <CountDown :time='item.end_time'/>
          </div>
        </div>
      </ClientOnly>
    </template>
  </n-card>
</template>

<script setup>
import { NCard } from "naive-ui";

const props = defineProps({
  item: Object,
});

const open = () => {
  let path = ''
  if(['course','media','audio','video'].includes(props.item.type)){
    path = `/detail/course/${props.item.id}`
  } else if (props.item.type === 'column') {
    path = `/detail/column/${props.item.id}`
  } else if (props.item.type === 'live') {
    path = `/detail/live/${props.item.id}`
  } 

  navigateTo(path)
}
</script>

<style scoped>
:deep(.n-card__footer){
  padding-left: 0 !important;
  padding-right: 0 !important;
}
</style>
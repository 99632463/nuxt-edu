<template>
  <div class="border-b p-5">
    <div class="cursor-pointer text-gray-600" @click="open">
      <n-tag v-if="item.is_top" :bordered="false" type="success" size="small"
        >置顶</n-tag
      >
      {{ item.desc.text }}
    </div>
    <div class="mt-3 cursor-pointer" style="width: 500px">
      <n-image
        v-for="(img, imgI) in item.desc.images"
        :key="imgI"
        :src="img"
        :width="item.desc.images.length == 1 ? 300 : 150"
        :height="item.desc.images.length == 1 ? 200 : 100"
        class="mr-3 mb-2 rounded"
      ></n-image>
    </div>
    <div class="flex mt-5">
      <n-button
        :type="item.issupport ? 'primary' : 'tertiary'"
        secondary
        strong
        size="tiny"
        class="mr-3"
        :loading="supportLoading"
        @click="handleSupport(item)"
      >
        <template #icon>
          <n-icon><ThumbsUpSharp /></n-icon>
        </template>
        点赞 {{ item.support_count || "" }}
      </n-button>

      <n-button secondary strong size="tiny" class="mr-3">
        <template #icon>
          <n-icon><ChatboxEllipsesOutline /></n-icon>
        </template>
        评论 {{ item.comment_count || "" }}
      </n-button>
      <n-button text size="tiny" class="mr-3"
        >作者：{{ item.user.name }}</n-button
      >
      <n-button type="error" size="tiny">删除</n-button>
    </div>
  </div>
</template>

<script setup>
import { NTag, NImage, NButton, NIcon } from "naive-ui";
import { ThumbsUpSharp, ChatboxEllipsesOutline } from "@vicons/ionicons5";

const props = defineProps({
  item: Object,
});

const  {
  supportLoading,
  handleSupport
} = useHandleSupportPost()

const open = () => {
  navigateTo('/post_detail/'+ props.item.id)
}
</script>
<template>
  <LoadingGroup :pending="pending" :error="error">
    <section class="py-4" v-if="data.isbuy && (data.type != 'media' && type =='course')">
      <ClientOnly>
        <PlayerAudio v-if="data.type == 'audio'" :title="data.title" :url="data.content" :cover="data.cover"/>
        <PlayerVideo v-if="data.type == 'video'" :url="data.content"/>
      </ClientOnly>
    </section>
    <section v-else class="detail-top">
      <n-image :src="data.cover" object-fit="cover" class="image"> </n-image>
      <div class="info">
        <div class="flex flex-col items-start">
          <div class="flex items-center">
            <span class="text-xl mr-2">{{ data.title }}</span>
          </div>
          <p class="my-2 text-xs text-gray-400">{{subTitle}}</p>
          <div v-if="!data.isbuy">
            <Price :value="data.price" class="text-xl" />
            <Price :value="data.t_price" through class="ml-1 text-xs" />
          </div>
        </div>

        <div class="mt-auto" v-if="!data.isbuy" @click="buy">
          <n-button type="primary">立即学习</n-button>
        </div>
      </div>
    </section>

    <n-grid :x-gap="20">
      <n-grid-item :span="18">
        <section class="detail-bottom">
          <ui-tab class="border-b">
            <ui-tab-item @click="changeTab(item.value)" :active="tab === item.value" v-for="(item,index) in tabs" :key="index">
              {{item.label}}
            </ui-tab-item>
          </ui-tab>
          <div v-if="tab == 'content'" class="content" v-html="data.type == 'media' && data.isbuy ? data.content : data.try"></div>
          <DetailMenu v-else>
            <DetailMenuItem 
              v-for="(item,index) in data.column_courses" 
              :key="index"
              :item="item"
              :index="index"
              @click="learn(item)"
            >
            </DetailMenuItem>
          </DetailMenu>
        </section>
      </n-grid-item>
      <n-grid-item :span="6">
        <HotCourseList />
      </n-grid-item>
    </n-grid>
  </LoadingGroup>
</template>

<script setup>
import { NImage, NButton, NGrid, NGridItem } from "naive-ui";

const route = useRoute();
const { id, type } = route.params;

const {tab, tabs, changeTab} = useInitDetailTabs(type)
const query = useRequestQuery()

useInitHead()

const { data, pending, refresh, error } = await useReadDetailApi(type, query);

function useRequestQuery(){
  const {column_id} = route.query
  let query = { id }
  if(column_id){
    query.column_id = column_id
  }
  return query
}

const title = computed(() => (!pending.value ? data.value?.title : "详情页"));
useHead({ title });

const o = {
  media: '图文',
  video: '视频',
  audio: '音频'
}

const subTitle = computed(() => {
  let pre = ''
  if(type === 'course'){
    pre = `[${o[data.value.type]}]`
  }
  return `${pre}${data.value.sub_count}人学过`
})

const loading = ref(false)
const buy = () => {
  useHasAuth(async () => {
    // 免费学习
    if(data.value.price == 0){
      loading.value = true
      await useLearnApi({
        goods_id: data.value.id,
        type
      })
      loading.value = false
      refresh()

      return
    }

    // 付费学习
    let ty = 'course'
    let id = data.value.id
    if(type == 'live'){
      ty = 'live'
    } else if(type == 'column'){
      ty = 'column'
    }

    navigateTo(`/createorder?id=${id}&type=${ty}`)
  })
}

function useInitDetailTabs(t){
  const tabs = computed(() => {
    const ts = [{
      label: '详情',
      value: 'content'
    }]

    if(t == 'column' || t == 'book'){
      ts.push({
        label: '目录',
        value: 'menu'
      })
    }

    return ts
  })

  const tab = ref('content')

  const changeTab =(e) => tab.value = e

  return {
    tab,
    tabs,
    changeTab
  }
}

const learn = item => {
  useHasAuth(() => {
    if(type === 'column' && item.price != 0 && !data.value.isbuy){
      return alert('请先购买该专栏')
    }
    let url = ''
    if(type == 'column'){
      url = `/detail/course/${item.id}?column_id=${data.value.id}`
    }
    navigateTo(url)
  })
}

function useInitHead(){
  if(type === 'course'){
    useHead({
      link: [
        {
          rel: 'stylesheet',
          href: '/aplayer/Aplayer.min.css'
        }
      ],
      script: [
        {
          src: '/aplayer/Aplayer.min.js'
        },
        {
          src: '//unpkg.byted-static.com/xgplayer/2.31.2/browser/index.js'
        }
      ]
    })
  }
}
</script>

<style scoped>
.detail-top{
  @apply rounded bg-white flex p-5 my-5;
}
.detail-top .image{
  @apply rounded w-[340px] h-[200px] mr-5;
}
.detail-top .info{
  @apply flex-1 flex flex-col py-2;
}
.detail-bottom{
  @apply bg-white rounded mb-5;
}
.detail-bottom .content{
  @apply  px-5 pb-5;
}
.detail-bottom .content img{
  max-width: 100%;
}
</style>
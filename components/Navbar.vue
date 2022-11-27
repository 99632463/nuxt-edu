<template>
  <div class="navbar">
    <div class="container flex items-center h-[60px]">
      <n-button text class="!text-xl font-bold">帝杀编程</n-button>
      
      <ui-menu>
        <ui-menu-item 
          v-for="(item, index) in menus" 
          :key="index" 
          :active="isMenuItemActive(item)"
          @click="handleOpen(item.path)"
        >
          {{item.name}}
        </ui-menu-item>
      </ui-menu>

      <n-button circle class="ml-auto mr-3" @click="openSearch">
        <template #icon>
          <n-icon><Search /></n-icon>
        </template>
      </n-button>
      <nuxt-link to="/login" v-if="!user">
        <n-button secondary strong>登录</n-button>
      </nuxt-link>
      <n-dropdown v-else :options="userOptions" @select="handleSelect">
        <n-avatar
          round
          size="small"
          :src="user.avatar || 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'"
        />
      </n-dropdown>
    </div>
  </div>
  <div class="w-[100%] h-[80px]"></div>
  <SearchBar ref="searchBarRef"/>
</template>

<script setup>
import { NButton, NIcon, NDropdown, NAvatar } from "naive-ui";
import { Search } from "@vicons/ionicons5";

const user = useUser()

const menus = [
  {
    name: '首页',
    path: '/'
  },
  {
    name: '考试',
    path: '/pager/1',
    match: [{
      name: 'pager-page'
    }]
  },
  {
    name: '拼团',
    path: '/list/group/1',
    match: [{
      name: 'list-type-page'
    }],
    params: {
      type: 'group'
    }
  },
  {
    name: '秒杀',
    path: '/list/flashsale/1',
    match: [{
      name: 'list-type-page'
    }],
    params: {
      type: 'flashsale'
    }
  },
  {
    name: '直播',
    path: '/list/live/1',
    match: [{
      name: 'list-type-page'
    }],
    params: {
      type: 'live'
    }
  },
  {
    name: '专栏',
    path: '/list/column/1',
    match: [{
      name: 'list-type-page'
    }],
    params: {
      type: 'column'
    }
  },
  {
    name: '电子书',
    path: '/list/book/1',
    match: [{
      name: 'list-type-page'
    }],
    params: {
      type: 'book'
    }
  },
  {
    name: '社区',
    path: '/bbs/0/1',
    match: [{
      name: 'bbs-bbs_id-page'
    }]
  },
  {
    name: '课程',
    path: '/list/course/1',
    match: [{
      name: 'list-type-page'
    }],
    params: {
      type: 'course'
    }
  }
]
const userOptions = [
  {
    label: "用户中心",
    key: "center",
  },
  {
    label: "退出",
    key: "logout",
  },
];
const route = useRoute()

const handleOpen = (path) => {
  navigateTo(path)
}

const isMenuItemActive = item => {
  if(item.match){
    let i = item.match.findIndex(o => o.name === route.name)
    let res = true
    if(item.params){
      res = Object.keys(item.params).findIndex(key => item.params[key] === route.params[key]) > -1
    }
    return i > -1 && res
  }
  return route.path === item.path
}

const searchBarRef = ref(null)
const openSearch = () => searchBarRef.value.open()

const handleSelect = async key => {
  if(key === 'logout'){
    await useLogout()
  }
  if(key === 'center'){
    navigateTo('/user/history/1')
  }
}
</script>

<style scoped>
.navbar {
  z-index: 1000;
  @apply bg-white fixed top-0 left-0 right-0 shadow-sm;
}
</style>
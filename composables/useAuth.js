export const useUser = () => {
  return useState('user', () => {
    return null;
  })
}

//  更新用户信息
export async function useRefreshUserInfo(){
  const token = useCookie('token')
  const user = useUser()

  if(token.value) {
    const {data,error} = await useGetinfoApi()

    if(data.value) {
      user.value = data.value
    }
  }
}

export async function useLogout(){
  await useLogoutApi()
  const user = useUser()
  user.value = null
  const token = useCookie('token')
  token.value = null

  const route = useRoute()
  if(route.path != '/'){
    navigateTo('/', {replace:true})
  }
}

// 登录并且绑定手机号才能操作
export function useHasAuth(callback = null) {
  const route = useRoute()
  const token = useCookie('token')
  const user = useUser()

  // 未登录
  if(!token.value) {
    alert('请先登录')
    return navigateTo('/login?from=' + route.fullPath)
  }

  const phone = user.value?.phone
  if(!phone && route.name !== 'bindPhone'){
    alert('请先绑定手机号')
    return navigateTo('/bindPhone?from=' + route.fullPath)
  }

  callback && callback()
}

export function useHandleSupportPost() {
  const supportLoading = ref(false)
  const handleSupport = (item) => {
    useHasAuth(async () => {
      let type = item.issupport ? 'unsupport' : 'support'
      // let msg = item.issupport ? '取消点赞' : '点赞'

      supportLoading.value = true
      const {data} = await usePostSupportApi(item.id, type)
      supportLoading.value = false

      if(type == 'unsupport'){
        item.support_count--
      } else {
        item.support_count++
      }

      item.issupport = !item.issupport
    })
  }

  return {
    supportLoading,
    handleSupport
  }
}
export default defineNuxtRouteMiddleware((to,from) => {
  const token = useCookie('token')
  const user = useUser()
  const route = useRoute()

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
})
export default defineNuxtRouteMiddleware((to,from) => {
  const token = useCookie('token')

  if(token.value) {
    if(process.client){
      alert('请勿重复登录')
    }
    return '/'
  }
})
export function useLoginApi(body){
  return useHttpPost('login', '/login', {
    body
  })
}

export function useRegApi(body){
  return useHttpPost('reg', '/reg', {
    body
  })
}

export function useGetinfoApi(){
  return useHttpGet('getinfo', '/getinfo', {
    $: true
  })
}

export function useLogoutApi(){
  return useHttpPost('logout', '/logout')
}

export function useGetCaptchaApi(phone){
  return useHttpPost('get_captcha', '/get_captcha', {
    body: {phone}
  })
}

export function useBindPhoneApi(body){
  return useHttpPost('bindphone', '/bind_mobile', {
    body
  })
}

export function useUserHistoryApi(query){
  return useHttpGet('user_history', () => {
    let q = useQueryToString(query())
    return `/user_history/list${q}`
  }, {
    lazy: true
  })
}

export function useOrderListApi(page){
  return useHttpGet('orderList', `/order/list?page=${page}`, {
    lazy: true
  })
}

export function useMypostListApi(page){
  return useHttpGet('MypostList', `/mypost?page=${page}`, {
    lazy: true
  })
}

export function useUserCouponApi(page){
  return useHttpGet('UserCoupon', `/user_coupon?page=${page}`, {
    lazy: true
  })
}

export function useUploadConfig() {
  const token = useCookie('token')
  return {
    action: fetchConfig.baseURL + '/upload',
    headers: {
      appid: fetchConfig.headers.appid,
      token: token.value
    }
  }
}
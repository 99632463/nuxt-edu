export function useGetGoodsInfoApi(id, type = 'course'){
  return useHttpGet('GetGoodsInfo', `/goods/read?type=${type}&id=${id}`, {
    lazy: true
  })
}

export function useGetUseableUserCouponApi(id, type = 'course'){
  return useHttpGet('GetUseableUserCoupon', `/user_coupon?goods_id=${id}&type=${type}&page=1`)
}

export function useCreateOrderApi(body) {
  return useHttpPost('createOrder', '/order/save', {body})
}

export function useWxpayApi(no) {
  return useHttpPost('wxpay', '/order/wxpay', {body: {no}})
}

export function useGetWxpayStatusApi(no) {
  return useHttpPost('getwxpaystatus', '/order/iswxpay', {body: {no}, $:true})
}
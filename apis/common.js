export function useSearchListApi(query){
  
  return useHttpGet('searchList', () => {
    let q = useQueryToString(query())
    return `/search${q}`
  }, {
    lazy: true
  })
}

export function useCouponListApi(){
  return useHttpGet('CouponList', '/coupon/List')
}

export function useListApi(type,query = {}){
  let q = useQueryToString(query)
  return useHttpGet(type + 'CourseList', `/${type}/list${q}`, {
    lazy: true
  })
}

export function useReadDetailApi(type, query = {}){
  let q = useQueryToString(query)
  return useHttpGet('ReadDetail', `/${type}/read${q}`, {
    lazy: true
  })
}
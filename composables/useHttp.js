export const fetchConfig = {
  baseURL: 'http://demonuxtapi.dishait.cn/pc',
  headers: {
    appid: "bd9d01ecc75dbbaaefce",
  },
}

function useGetFetchOptions(options = {}) {
  options.baseURL = options.baseURL ?? fetchConfig.baseURL
  options.headers = options.headers ?? {
    appid: fetchConfig.headers.appid
  }
  options.initialCache = options.initialCache ?? false
  options.lazy = options.lazy ?? false

  // token
  const token = useCookie('token')
  if(token) {
    options.headers.token = token.value
  }

  return options
}

export async function useHttp(key,url,options = {}){
  options = useGetFetchOptions(options)
  options.key = key

  if(options.$){
    const data = ref(null)
    const error = ref(null)
    return await $fetch(url, options).then(res => {
      data.value = res.data
      return {
        data,
        error
      }
    }).catch(err => {
      const msg = err?.data?.data
      if(process.client){
        alert(msg || '服务端错误')
      }

      error.value = msg

      return {
        data,
        error
      }
    })
  }

  let res = await useFetch(url, {
    ...options,
    transform: (res) => {
      return res.data;
    }
  })

  if(process.client && res.error.value){
    const msg = res.error.value?.data?.data
    if(!options.lazy){
      alert(msg || '服务端错误')
    }
  }

  return res
}

export function useHttpGet(key,url,options = {}){
  options.method = 'GET'
  return useHttp(key,url,options)

}export function useHttpPost(key,url,options = {}){
  options.method = 'POST'
  return useHttp(key,url,options)
}


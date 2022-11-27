export function usePostSupportApi(post_id, type='support'){
  return useHttpPost('PostSupport', `/post/${type}`, {
    body: {post_id}
  })
}
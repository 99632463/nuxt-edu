export function useCourseListApi(page){
  return useHttpGet('CourseList', `/course/list?page=${page}`, {
    lazy: true
  })
}

export function useReadCourseApi(query = {}){
  let q = useQueryToString(query)
  return useHttpGet('ReadCourse', `/course/read${q}`, {
    lazy: true
  })
}

export function useHotCourseListApi(){
  return useHttpGet('HotCourse', `/hot`, {
    lazy: true
  })
}

export function useLearnApi(body){
  return useHttpPost('learn', `/order/learn`, {body})
}
<template>
  <div style="width: 100%">
    <ClientOnly>
      <template #fallback>
        <div style="width:94px; height: 94px" class="border rounded bg-gray-50 flex items-center justify-center">
          <n-spin show></n-spin>
        </div>
      </template>
      <n-upload
        :action="action"
        :headers="headers"
        v-model:file-list="fileList"
        name="file"
        :data="data"
        list-type="image-card"
        :max="1"
        :on-finish="handleSuccess"
        :multiple="false"
      >
        点击上传
      </n-upload>
    </ClientOnly>
  </div>
</template>

<script setup>
import { NUpload,NSpin } from "naive-ui";

const {
  action,
  headers
} = useUploadConfig()

const props = defineProps({
  modelValue: String,
  data: Object
})

const fileList = ref([])

const handleSuccess = (...e) => {
  const {file,event} = e[0]
  const response = JSON.parse(event.target.response)
  file.url = response.data
  return file
}

initFileList()
function initFileList(){
  fileList.value = props.modelValue ? [
    {
      id: props.modelValue,
      name: props.modelValue,
      status: 'finished',
      url: props.modelValue
    }
  ] : []
}

const stopWatch = watch(() => fileList, newVal => {
  updateModelValue()
}, { deep: true })

onBeforeUnmount(() => stopWatch())

const emit = defineEmits(['update:modelValue'])
function updateModelValue() {
  let urls = []
  fileList.value.forEach(o => {
    if(o.status === 'finished' && o.url){
      urls.push(o.url)
    }
  })

  emit('update:modelValue', urls[0] || '')
}
</script>
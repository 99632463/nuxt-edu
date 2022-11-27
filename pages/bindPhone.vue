<template>
  <n-form class="w-[340px]" :model="form" ref="formRef" size="large">
    <n-form-item :show-label="false">
      <n-input v-model:value="form.phone" placeholder="手机号" />
    </n-form-item>
    <n-form-item :show-label="false">
      <n-input-group>
        <n-input type="password" v-model:value="form.code" placeholder="验证码" />
        <send-code :phone="form.phone"/>  
      </n-input-group>
    </n-form-item>

    <div>
      <n-button :loading="loading" class="w-full" type="primary" @click="onSubmit">
       绑定
      </n-button>
    </div>
  </n-form>
</template>

<script setup>
import {NForm,NFormItem,NInput,NButton,NInputGroup} from 'naive-ui'
useHead({
  title: '绑定手机号'
})
const route = useRoute()
console.log(useRoute());

const formRef = ref(null)
const form = reactive({
  phone: '',
  code: ''
})

const loading = ref(false)
const onSubmit = async () => {
  loading.value = true
  await useBindPhoneApi(form)
  loading.value = false

  navigateTo(route.query.from || '/')
}

definePageMeta({
  title: '绑定手机号',
  layout: 'login'
})
</script>
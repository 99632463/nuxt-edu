<template>
  <n-form class="w-[340px]" :model="form" ref="formRef" size="large">
    <n-form-item :show-label="false">
      <n-input v-model:value="form.username" placeholder="用户名/手机/邮箱" />
    </n-form-item>
    <n-form-item :show-label="false">
      <n-input type="password" v-model:value="form.password" placeholder="密码" />
    </n-form-item>
    <n-form-item v-if="type != 'login'" :show-label="false">
      <n-input type="password" v-model:value="form.repassword" placeholder="重复密码" />
    </n-form-item>

    <div class="flex justify-between w-full mb-2">
      <n-button type="primary" quaternary size="tiny" @click="changeType">{{type == 'login' ? '注 册' : '登 录'}}</n-button>
      <n-button type="primary" quaternary size="tiny">忘记密码？</n-button>
    </div>

    <div>
      <n-button :loading="loading" class="w-full" type="primary" @click="onSubmit">
        {{type == 'login' ? '登 录' : '注 册'}}
      </n-button>
    </div>
    <div class="flex justify-center items-center w-full text-xs mt-5 text-gray-600">
      注册即同意
      <n-button type="primary" quaternary size="tiny">《服务协议》</n-button>
      和
      <n-button type="primary" quaternary size="tiny">《隐私政策》</n-button>
    </div>
  </n-form>
</template>

<script setup>
import {NForm,NFormItem,NInput,NButton} from 'naive-ui'

const route = useRoute()
const type = ref('login')
const title = ref('登录')
useHead({
  title
})

const formRef = ref(null)
const form = reactive({
  username: '',
  password: '',
  repassword: ''
})

const changeType = () => {
  type.value = type.value === 'login' ? 'reg' : 'login'
  title.value = type.value === 'login' ? '登录' : '注册'
  route.meta.title = title.value
  form.username = ''
  form.password = ''
  form.repassword = ''
}

const loading = ref(false)
const onSubmit = async () => {
  loading.value = true

  let {
    data,
    error
  } = type.value == 'login' ? await useLoginApi(form) : await useRegApi(form)

  loading.value = false

  if(error.value) {
    return
  }

  if(type.value == 'login'){
    const token = useCookie('token')
    token.value = data.value.token
    const user = useUser()
    user.value = data.value

    navigateTo(route.query.from || '/', { replace: true })
  } else {
    changeType()
    alert('注册成功')
  }
}

definePageMeta({
  layout: 'login',
  middleware: ['only-visitor']
})
</script>
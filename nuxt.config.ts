// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  app: {
    head: {
      titleTemplate: '%s - 固定标题',
      title: '帝杀编程',
      charset: 'utf-8',
      htmlAttrs: {
        lang: 'zh-cn'
      },
      meta: [

      ],
      script: [],
      link: []
    }
  },
  css: [
    '@/assets/main.css'
  ],
  build: {
    transpile:
      process.env.NODE_ENV === 'production'
        ? [
          'naive-ui',
          'vueuc',
          '@css-render/vue3-ssr',
          '@juggle/resize-observer'
        ]
        : ['@juggle/resize-observer']
  },
  vite: {
    optimizeDeps: {
      include:
        process.env.NODE_ENV === 'development'
          ? ['naive-ui', 'vueuc', 'date-fns-tz/esm/formatInTimeZone']
          : []
    }
  },
  buildModules: [
    'nuxt-windicss',
  ],
  imports: {
    dirs: ['apis']
  }
})

import { defineNuxtConfig } from '@nuxt/bridge'

import { resolve } from 'path'

export default defineNuxtConfig({

  ssr: false,

  buildDir: 'dist',
  srcDir: 'src/',
  components: true,
  alias: {
    'style': resolve(__dirname, './assets/style')
  },
  head: {
    titleTemplate: '%s - lucanos',
    title: 'lucanos',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  css: [],
  plugins: [],
  modules: []
})

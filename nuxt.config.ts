export default {
  ssr: false,
  srcDir: 'src/',
  router: {
    middleware: ['ethereum'],
  },
  head: {
    title: 'Taks ethereum',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      // { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  components: true,
  plugins: [
    "~/plugins/ant-desing"
  ]
}

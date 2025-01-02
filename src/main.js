import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
// import funcPlugins from './plugins/func'
// import objPlugins from './plugins/obj'
import person from './plugins/person'
import globalComponents from './plugins/global-components'
import globalDirectives from './plugins/global-directives'
import dayjs from './plugins/dayjs'
// import focus from './directives/focus'

const app = createApp(App)

// app.use(funcPlugins)
// app.use(objPlugins, { name: 'LEE코딩' })
app.use(person, { name: '홍길동' })
app.use(globalComponents)
app.use(globalDirectives)
app.use(dayjs)
// app.directive('focus', focus)

app.use(router)
app.mount('#app')
// createApp(App).mount('#app')

import 'bootstrap/dist/js/bootstrap.bundle.min.js'

// console.log('MODE: ', import.meta.env.MODE)
// console.log('BASE_URL: ', import.meta.env.BASE_URL)
// console.log('PROD: ', import.meta.env.PROD)
// console.log('DEV: ', import.meta.env.DEV)
// console.log('VITE_APP_API_URL: ', import.meta.env.VITE_APP_API_URL)

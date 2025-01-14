import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from '@/router'
import globalComponents from './plugins/global-components'
import globalDirectives from './plugins/global-directives'
import dayjs from './plugins/dayjs'

const app = createApp(App)

app.use(globalComponents)
app.use(globalDirectives)
app.use(dayjs)
app.use(createPinia())

app.use(router)
app.mount('#app')

import 'bootstrap/dist/js/bootstrap.bundle.min.js'

// console.log('MODE: ', import.meta.env.MODE)
// console.log('BASE_URL: ', import.meta.env.BASE_URL)
// console.log('PROD: ', import.meta.env.PROD)
// console.log('DEV: ', import.meta.env.DEV)
// console.log('VITE_APP_API_URL: ', import.meta.env.VITE_APP_API_URL)

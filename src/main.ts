import { createApp } from 'vue'
import App from './App.vue'

// Pinia Store
import { createPinia } from 'pinia'


// Vue router with Pages
import { createRouter, createWebHistory } from 'vue-router'
import routes from 'virtual:generated-pages'

const router = createRouter({ routes, history: createWebHistory()})

import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'

import Button from 'primevue/button'

import '@/common/fetch-intercept'

const app = createApp(App)

app
  .use(PrimeVue)
  .use(createPinia())
  .use(ToastService)
  .use(router)
  .component('Button', Button)

app.mount('#app')

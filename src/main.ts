// TODO
// 1. Resolve @typescript-eslint/no-unsafe-argument when not asserting component as DefinedComponent type

import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import type { DefinedComponent } from 'node_modules/@vue/test-utils/dist/types'
import App from './App.vue'
import router from './router'

const app = createApp(App as DefinedComponent)

app.use(createPinia())
app.use(router)

app.mount('#app')

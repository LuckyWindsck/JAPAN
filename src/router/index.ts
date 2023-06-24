// TODO
// 1. Resolve @typescript-eslint/no-unsafe-assignment when not asserting component as DefinedComponent type

import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'

import type { DefinedComponent } from 'node_modules/@vue/test-utils/dist/types'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView as DefinedComponent,
    },
  ],
})

export default router

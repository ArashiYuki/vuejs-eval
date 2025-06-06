import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', alias: '/factures' , name: 'factures', component: () => import('@/views/FacturesView.vue') },
    { path: '/factures/edit/:id', name: 'facture', component: () => import('@/views/FactureEditView.vue') },
    { path: '/factures/create', name: 'factureCreate', component: () => import('@/views/FactureCreateView.vue') },
    { path: '/clients', name: 'clients', component: () => import('@/views/ClientsView.vue') },
    { path: '/clients/edit/:id', name: 'client', component: () => import('@/views/ClientEditView.vue') },
    { path: '/clients/create', name: 'clientCreate', component: () => import('@/views/ClientCreateView.vue') },
    { path: '/about', name: 'about', component: () => import('@/views/AboutView.vue') },
  ],
})

export default router

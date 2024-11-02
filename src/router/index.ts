import Login from '@/views/Login-Cliente.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/VentanaPrincipal',
      name: 'VentanaPrincipal',
      component: () => import('../views/VentanaCliente.vue')
    },
    {
      path: '/VentanaPrincipal/ReservasCliente',
      name: 'ReservasCliente',
      component: () => import('../views/ventasAnteriores.vue')
    }
  ]
})

export default router


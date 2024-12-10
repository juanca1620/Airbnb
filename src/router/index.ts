// router/index.ts
import { createRouter, createWebHistory } from 'vue-router';
import LoginCliente from '@/views/Login-Cliente.vue';
import VentanaCliente from '@/views/VentanaCliente.vue'; // Asume que el componente está en views

const routes = [
  {
    path: '/', 
    name: 'login', 
    component: LoginCliente,
  },
  {
    path: '/VentanaPrincipal',  // Esta ruta debe coincidir con el path que usas en router.push
    name: 'VentanaPrincipal',
    component: VentanaCliente,
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;



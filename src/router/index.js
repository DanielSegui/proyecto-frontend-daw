import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/modules/auth/store';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/coches',
      name: 'coches',
      component: () => import('@/views/CochesView.vue')
    },
    {
      path: '/motos',
      name: 'motos',
      component: () => import('@/views/MotosView.vue')
    },
    {
      path: '/clasicos',
      name: 'clasicos',
      component: () => import('@/views/ClasicosView.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('@/views/AdminView.vue'),
      meta: { requiresAuth: true, roles: ['admin'] } 
    },
    {
      path: '/forbidden',
      name: 'forbidden',
      component: () => import('@/views/ForbiddenView.vue') // <-- ¡Cambiado a @/views/...!
    },
    {
      path: '/coches/:id',
      name: 'coche-detalle',
      component: () => import('@/views/VehicleDetailView.vue')
    },
    {
      path: '/motos/:id',
      name: 'moto-detalle',
      component: () => import('@/views/VehicleDetailView.vue')
    },
    {
      path: '/clasicos/:id',
      name: 'clasico-detalle',
      component: () => import('@/views/VehicleDetailView.vue')
    },
    {
      path: '/favoritos',
      name: 'favoritos',
      component: () => import('@/views/FavoritosView.vue')
    },
  ]
});

// Guard global corregido siguiendo las directrices de las páginas 14 y 15 del PDF
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  
  // 1. Verificar si la ruta requiere estar autenticado
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return next('/login'); // Si no está logueado, directo al login
  }

  // 2. Verificar roles si la ruta está protegida por roles (Página 15 de la guía)
  if (to.meta.roles && (!authStore.user || !to.meta.roles.includes(authStore.user.role))) {
    return next('/forbidden'); // Redirige si el rol no coincide o no hay usuario
  }

  // Si pasa todos los filtros, continúa con total normalidad
  next();
});

export default router;
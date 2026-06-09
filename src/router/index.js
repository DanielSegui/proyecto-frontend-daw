import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/modules/auth/auth';
import CatalogView from '@/views/CatalogView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0, behavior: 'smooth' } // El 'smooth' hace que suba con una transición suave elegante
    }
  },

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
      path: '/vehicles/:id',
      name: 'vehicle-detalle',
      component: () => import('@/views/VehicleDetailView.vue')
    },
    {
      path: '/favoritos',
      name: 'favoritos',
      component: () => import('@/views/FavoritosView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: '/perfil',
      name: 'perfil',
      component: () => import('../views/ProfileView.vue')
    },
    {
      path: '/formulario',
      name: 'formulario',
      component: () => import('../views/ContactoView.vue')
    },
    {
      path: '/reserva',
      name: 'reserva',
      component: () => import('../views/ReservaView.vue')
    },
    {
      path: '/catalogo',
      name: 'catalogo',
      component: () => import('@/views/CatalogView.vue')
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
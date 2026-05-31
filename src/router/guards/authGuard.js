import { useAuthStore } from '@/modules/auth/auth';

export function authGuard(to, from, next) {
  const authStore = useAuthStore();

  // Si la ruta requiere autenticación y el usuario no está logueado
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login'); // Redirige al login
  } else {
    next(); // Deja pasar
  }
}
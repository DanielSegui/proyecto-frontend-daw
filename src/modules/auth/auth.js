import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  // 1. TRUCO TEMPORAL: Forzamos un objeto de usuario con rol 'admin'
  // (Originalmente tenías: ref(JSON.parse(localStorage.getItem('user')) || null);)
  const user = ref({
    name: 'Daniel Admin Test',
    email: 'admin@dnmotors.com',
    role: 'admin' // <-- Esto es lo que lee tu router guard y tu useRole.js
  });

  // 2. TRUCO TEMPORAL: Forzamos un token cualquiera para simular que estás logueado
  // (Originalmente tenías: ref(localStorage.getItem('token') || null);)
  const token = ref('token-falso-de-prueba-frontend');

  // Getters: propiedades calculadas
  const isAuthenticated = computed(() => !!token.value);
  const userRole = computed(() => user.value?.role || null);

  // Acciones: funciones para modificar el estado
  function setAuth(userData, userToken) {
    user.value = userData;
    token.value = userToken;
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', userToken);
  }

  function logout() {
    user.value = null;
    token.value = null;
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }

  return { user, token, isAuthenticated, userRole, setAuth, logout };
});
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  // Estado: datos que queremos recordar
  const user = ref(JSON.parse(localStorage.getItem('user')) || null);
  const token = ref(localStorage.getItem('token') || null);

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
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

export const useAuthStore = defineStore('auth', () => {
  const user = ref(JSON.parse(localStorage.getItem('user')) || null);
  const token = ref(localStorage.getItem('token') || null);

  const isAuthenticated = computed(() => !!token.value);
  const userRole = computed(() => user.value?.role || null);

  function setAuth(userData, userToken) {
    user.value = userData;
    token.value = userToken;
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', userToken);
  }

  async function logout() {
    if (token.value) {
      try {
        await axios.post(`${API_URL}/logout`, {}, {
          headers: { Authorization: `Bearer ${token.value}` }
        });
      } catch {}
    }
    user.value = null;
    token.value = null;
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }

  return { user, token, isAuthenticated, userRole, setAuth, logout };
});

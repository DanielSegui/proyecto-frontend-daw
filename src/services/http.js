import axios from 'axios';
import { useAuthStore } from '@/modules/auth/auth'; // Lo crearemos después

const http = axios.create({
  baseURL: 'http://tu-backend-laravel.test/api', // Cambia por tu URL real
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Interceptor para añadir el token automáticamente
http.interceptors.request.use((config) => {
  const authStore = useAuthStore();
  if (authStore.token) {
    config.headers.Authorization = `Bearer ${authStore.token}`;
  }
  return config;
});

export default http;
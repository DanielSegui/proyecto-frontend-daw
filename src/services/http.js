import axios from 'axios';
import { useAuthStore } from '@/modules/auth/auth'; 

const http = axios.create({
  // AQUESTA LÍNIA ÉS LA MÀGICA:
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

http.interceptors.request.use((config) => {
  const authStore = useAuthStore();
  if (authStore.token) {
    config.headers.Authorization = `Bearer ${authStore.token}`;
  }
  return config;
});

export default http;
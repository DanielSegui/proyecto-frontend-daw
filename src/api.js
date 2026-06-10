import axios from 'axios';

const api = axios.create({
  // Aquesta URL vindrà del teu fitxer .env
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000'
});

export default api;
<template>
  <main class="detalle-container" style="min-height: 80vh; display: flex; justify-content: center; align-items: center;">
    
    <form @submit.prevent="handleLogin" class="auth-form-block">
      <h1>Iniciar sesión</h1>
      
      <p v-if="errorMessage" style="color: #ff4444; font-weight: bold; margin-bottom: 15px;">
        {{ errorMessage }}
      </p>
      <p v-if="route.query.success" style="color: #28a745; font-weight: bold; margin-bottom: 15px;">
        Registro exitoso, inicia sesión.
      </p>

      <input 
        type="email" 
        v-model="email" 
        placeholder="Email"
        required
      ><br>
      
      <input 
        type="password" 
        v-model="contrasenya" 
        placeholder="Contraseña" 
        required
      ><br>

      <button type="submit" :disabled="loading">
        {{ loading ? 'Iniciando...' : 'Iniciar sesión' }}
      </button>
      
      <button type="button" class="button" @click="irARegistro">
        ¿No tienes cuenta? Regístrate
      </button>
      
      <button type="button" @click="irAlInicio">
        Volver al inicio
      </button>
    </form>

  </main>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '../modules/auth/auth.js'
import http from '../services/http.js'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const email = ref('')
const contrasenya = ref('')
const errorMessage = ref('')
const loading = ref(false)

const handleLogin = async () => {
  if (!email.value || !contrasenya.value) {
    errorMessage.value = 'Todos los campos son obligatorios.'
    return
  }

  loading.value = true
  errorMessage.value = ''

  try {
    const response = await http.post('/login', {
      email: email.value,
      password: contrasenya.value,
    })
    authStore.setAuth(response.data.user, response.data.token)
    router.push('/perfil')
  } catch (error) {
    errorMessage.value =
      error.response?.data?.message ||
      error.response?.data?.errors?.email?.[0] ||
      'Credenciales incorrectas.'
  } finally {
    loading.value = false
  }
}

const irARegistro = () => {
  router.push('/register')
}

const irAlInicio = () => {
  router.push('/')
}
</script>

<style scoped>
@import '@/assets/user_formulari.css';

.auth-form-block {
  margin: 0 auto;
  width: 100%;
  max-width: 500px;
}
</style>

<template>
  <main class="detalle-container" style="min-height: 80vh; display: flex; justify-content: center; align-items: center;">
    
    <form @submit.prevent="handleRegister" class="auth-form-block">
      <h1>Registro de usuario</h1>
      
      <p v-if="errorMessage" style="color: #ff4444; font-weight: bold; margin-bottom: 15px;">
        {{ errorMessage }}
      </p>

      <input 
        type="text" 
        v-model="name" 
        placeholder="Nombre completo"
        required
      ><br><br>

      <input 
        type="email" 
        v-model="email" 
        placeholder="Email"
        required
      ><br><br>
      
      <input 
        type="password" 
        v-model="contrasenya" 
        placeholder="Contraseña (mín. 8 caracteres)" 
        required
      ><br><br>

      <button type="submit" :disabled="loading">
        {{ loading ? 'Registrando...' : 'Registrarse' }}
      </button>
      
      <button type="button" class="button" @click="irALogin">
        ¿Ya tienes cuenta? Inicia sesión aquí
      </button>
      
      <button type="button" @click="irAlInicio">
        Volver al inicio
      </button>
    </form>

  </main>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../modules/auth/auth.js'
import http from '../services/http.js'

const router = useRouter()
const authStore = useAuthStore()

const name = ref('')
const email = ref('')
const contrasenya = ref('')
const errorMessage = ref('')
const loading = ref(false)

const handleRegister = async () => {
  if (!name.value || !email.value || !contrasenya.value) {
    errorMessage.value = 'Por favor rellena todos los campos obligatorios.'
    return
  }

  if (contrasenya.value.length < 8) {
    errorMessage.value = 'La contraseña debe tener al menos 8 caracteres.'
    return
  }

  loading.value = true
  errorMessage.value = ''

  try {
    const response = await http.post('/register', {
      name: name.value,
      email: email.value,
      password: contrasenya.value,
    })
    authStore.setAuth(response.data.user, response.data.token)
    router.push('/perfil')
  } catch (error) {
    const errors = error.response?.data?.errors
    if (errors) {
      errorMessage.value = Object.values(errors).flat().join(' ')
    } else {
      errorMessage.value = error.response?.data?.message || 'Error al registrar. Inténtalo de nuevo.'
    }
  } finally {
    loading.value = false
  }
}

const irALogin = () => {
  router.push('/login')
}

const irAlInicio = () => {
  router.push('/')
}
</script>

<style scoped>
@import '@/assets/user_formulari.css';

.auth-form-block {
  margin: 40px auto 100px auto; 
  width: 100%;
  max-width: 500px; 
  padding: 30px; 
  box-sizing: border-box;
}

.auth-form-block input,
.auth-form-block button {
  width: 100%;
  box-sizing: border-box;
}
</style>

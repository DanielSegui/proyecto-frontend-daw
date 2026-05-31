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
        type="text" 
        v-model="nomUsuari" 
        placeholder="Nombre de usuario"
        required
      ><br>
      
      <input 
        type="password" 
        v-model="contrasenya" 
        placeholder="Contraseña" 
        required
      ><br>

      <button type="submit">Iniciar sesión</button>
      
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

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const nomUsuari = ref('')
const contrasenya = ref('')
const errorMessage = ref('')

const handleLogin = () => {
  if (!nomUsuari.value || !contrasenya.value) {
    errorMessage.value = "Todos los campos son obligatorios."
    return
  }

  // 1. Simulamos la respuesta con la estructura exacta que tendrá Laravel
  const rol = nomUsuari.value.toLowerCase().includes('admin') ? 'admin' : 'client'
  
  const datosUsuarioSimulados = {
    nom_usuari: nomUsuari.value,
    name: nomUsuari.value, // Dejamos name por si acaso lo usa el header
    nom: 'Daniel',         // Ponemos tu nombre de pruebas
    cognoms: 'García',     // Ponemos tus apellidos para que no salga vacío
    role: rol,
    email: `${nomUsuari.value.toLowerCase()}@gmail.com`, // Un email más real
    avatar: '/imgs/menu1.png'
  }
  
  const tokenSimulado = "token_falso_sprint4_123456"

  // 2. Ejecutamos TU función real del store
  authStore.setAuth(datosUsuarioSimulados, tokenSimulado)
  
  // 3. Redirigimos al perfil (Ojo: asegúrate de que la ruta en tu router es /perfil o /profile)
  router.push('/perfil') 
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
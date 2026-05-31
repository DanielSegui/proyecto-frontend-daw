<template>
  <main class="detalle-container" style="min-height: 80vh; display: flex; justify-content: center; align-items: center;">
    
    <form @submit.prevent="handleRegister" class="auth-form-block">
      <h1>Registro de usuario</h1>
      
      <p v-if="errorMessage" style="color: #ff4444; font-weight: bold; margin-bottom: 15px;">
        {{ errorMessage }}
      </p>

      <input 
        type="text" 
        v-model="nomUsuari" 
        placeholder="Nombre Usuario"
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
        placeholder="Contraseña" 
        required
      ><br><br>

      <input 
        type="text" 
        v-model="nom" 
        placeholder="Nombre" 
        required
      ><br><br>

      <input 
        type="text" 
        v-model="cognoms" 
        placeholder="Apellidos"
      ><br><br>

      <button type="submit">Registrarse</button>
      
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

const router = useRouter()

// Estados reactivos basados en tu base de datos JSON
const nomUsuari = ref('')
const email = ref('')
const contrasenya = ref('')
const nom = ref('')
const cognoms = ref('')
const errorMessage = ref('')

const handleRegister = () => {
  if (!nomUsuari.value || !email.value || !contrasenya.value || !nom.value) {
    errorMessage.value = 'Por favor rellena todos los campos obligatorios.'
    return
  }

  errorMessage.value = ""

  // Simulación: Redirigimos al login pasando el 'success' en la URL como hacía tu PHP
  router.push({ path: '/login', query: { success: 'true' } })
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
  /* 40px arriba, auto a los lados, 100px abajo para empujar con fuerza el footer */
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
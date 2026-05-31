<template>
  <main class="perfil-page-wrapper">
    
    <div class="profile-box" v-if="authStore.isAuthenticated && authStore.user">
      <h1>Perfil de usuario</h1>
      
      <p><strong>Nombre de usuario:</strong> {{ authStore.user.name }}</p>
      <p><strong>Nombre:</strong> {{ authStore.user.name }}</p> 
      <p><strong>Apellidos:</strong> {{ authStore.user.cognoms || 'No especificados' }}</p>
      <p><strong>Email:</strong> {{ authStore.user.email }}</p>
      <p><strong>Fecha de registro:</strong> {{ fechaSimulada }}</p>
      
      <a href="#" @click.prevent="handleLogout">Cerrar sesión</a>
      
      <div style="margin-top: 10px;">
        <button type="button" @click="irAEditar">
          Editar perfil
        </button>
      </div>
      
      <div style="margin-top: 15px;">
        <button type="button" @click="irAlInicio">
          Volver al inicio
        </button>
      </div>
    </div>

    <div class="profile-box text-center-box" v-else>
      <h1 style="color: #ff4444; margin-bottom: 20px;">Acceso Denegado</h1>
      <p class="msg-denegado">
        Debes iniciar sesión para acceder a tu perfil VIP de D&N Motors.
      </p>
      
      <div style="margin-top: 30px;">
        <button type="button" @click="irALogin">
          Ir al Login
        </button>
      </div>
    </div>

  </main>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../modules/auth/auth.js'

const router = useRouter()
const authStore = useAuthStore()

const fechaSimulada = ref(new Date().toLocaleDateString('es-ES', {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
}))

const handleLogout = () => {
  if (confirm('¿Seguro que deseas cerrar sesión en D&N Motors?')) {
    authStore.logout()
    router.push('/login')
  }
}

const irAEditar = () => {
  alert('Funcionalidad de edición lista para conectar con la API de Laravel en el Sprint 5.')
}

const irAlInicio = () => {
  router.push('/')
}

const irALogin = () => {
  router.push('/login')
}
</script>

<style scoped>
@import '@/assets/perfil.css';

/* Ajustes de control directo para forzar el comportamiento en el componente */
.text-center-box p.msg-denegado {
  text-align: center !important;
  border-bottom: none !important;
  color: #fff;
  font-size: 1.1rem;
  line-height: 1.6;
}
</style>
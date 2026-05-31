<script setup>
import { ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { useAuthStore } from '@/modules/auth/auth'; 

const authStore = useAuthStore();
const router = useRouter();
const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const handleLogout = () => {
  authStore.logout();
  isMenuOpen.value = false;
  router.push('/');
};
</script>

<template>
  <header class="header">
    <div class="logo">
      <RouterLink to="/"><img src="/imgs/logo3.png" alt="D&N Motors Logo"></RouterLink>
    </div>
    <div class="user-menu">
      <button class="menu-toggle" @click="toggleMenu">
        <img src="/imgs/menu1.png" class="user-avatar">
      </button>
      
      <ul class="dropdown" :class="{ show: isMenuOpen }">
        <li v-if="authStore.isAuthenticated">
          <RouterLink to="/perfil">Perfil</RouterLink>
        </li>
        <li v-if="authStore.isAuthenticated">
          <button @click="handleLogout" class="logout-link">Cerrar sesión</button>
        </li>
        <li v-else>
          <RouterLink to="/login">Iniciar sesión</RouterLink>
        </li>

        <li><RouterLink to="/">Inicio</RouterLink></li>
        <li><RouterLink to="/coches">Coches de lujo</RouterLink></li>
        <li><RouterLink to="/motos">Motos Superdeportivas</RouterLink></li>
        <li><RouterLink to="/clasicos">Coches clásicos</RouterLink></li>
        <li><RouterLink to="/catalogo" class="nav-link">Catálogo</RouterLink></li>
        <li><RouterLink to="/favoritos" style="color: #ff4444;">❤ Mis Favoritos</RouterLink></li>
        <li><RouterLink to="/formulario">Contacto</RouterLink></li>
      </ul>
    </div>
  </header>
</template>

<style scoped>
/* Estilo para que el botón de cerrar sesión se vea exactamente como un link */
.logout-link {
  background: none;
  border: none;
  color: #ff4444;
  cursor: pointer;
  font-family: inherit;
  font-size: 1rem;
  padding: 10px 16px; /* Ajusta el padding para que coincida con tus otros links */
  width: 100%;
  text-align: left;
  display: block;
}
.logout-link:hover {
  text-decoration: underline;
}
</style>
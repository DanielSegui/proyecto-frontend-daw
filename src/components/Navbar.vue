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
        <li><RouterLink to="/profile">Perfil</RouterLink></li>
        <li><RouterLink to="/login">Iniciar sesión</RouterLink></li>
        <li><RouterLink to="/">Inicio</RouterLink></li>
        <li><RouterLink to="/coches">Coches de lujo</RouterLink></li>
        <li><RouterLink to="/motos">Motos Superdeportivas</RouterLink></li>
        <li><RouterLink to="/clasicos">Coches clásicos</RouterLink></li>
        <li><RouterLink to="/favoritos" style="color: #ff4444;">❤ Mis Favoritos</RouterLink></li>
        <li><RouterLink to="/formulario">Contacto</RouterLink></li>
      </ul>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

const isMenuOpen = ref(false);
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>
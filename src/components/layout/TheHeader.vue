<template>
  <header class="header">
    <div class="logo">
      <RouterLink to="/"><img src="@/assets/logo3.png" alt="D&N Motors Logo"></RouterLink>
    </div>
    <div class="user-menu">
      <button class="menu-toggle" @click="toggleMenu"><img src="@/assets/menu1.png" class="user-avatar"></button>
      <ul class="dropdown" :class="{ show: isMenuOpen }">
        <li><RouterLink to="/profile">Perfil</RouterLink></li>
        <li><RouterLink to="/login">Iniciar sesión</RouterLink></li>
        </ul>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue';
const isMenuOpen = ref(false);
const toggleMenu = () => isMenuOpen.value = !isMenuOpen.value;
</script>
<template>
  <Navbar />

  <RouterView />

  <Footer />
</template>

<script setup>
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import { useAuthStore } from '@/modules/auth/auth';
// Opcional: Si vols assegurar que l'estat es carregui bé en refrescar
const authStore = useAuthStore();

onMounted(() => {
  console.log("App iniciada. Estat d'autenticació:", authStore.isAuthenticated);
});
</script>

<style>
/* Aquí posaries els estils globals si en tens */
body {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
}
</style>
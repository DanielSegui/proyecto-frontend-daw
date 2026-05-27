<template>
  <div style="height: 80vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; background: #0D0F12; padding: 20px;">
    <h1 style="font-size: 5rem; color: #ff4444; font-weight: bold;">403</h1>
    <h2 style="color: goldenrod; margin-bottom: 20px;">Acceso Restringido</h2>
    <p style="max-width: 500px; color: white; margin-bottom: 30px; font-family: 'Montserrat', sans-serif;">
      No tienes los permisos ni el rol necesario para visualizar esta sección de D&N Motors.
    </p>
    <button class="cat-btn" @click="$router.push('/')">Volver al inicio</button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
</script>
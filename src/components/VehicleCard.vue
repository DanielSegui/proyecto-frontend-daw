<template>
  <div class="coches-card">
    <RouterLink :to="vehicle.link">
      <img :src="vehicle.image" :alt="vehicle.name">
      <h3>{{ vehicle.name }}</h3>
    </RouterLink>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';

// Definimos las props que necesita la tarjeta para renderizarse
defineProps({
  vehicle: {
    type: Object,
    required: true
  }
});
</script>
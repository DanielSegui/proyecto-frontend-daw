<template>
  <div class="coches-card">
    <RouterLink :to="{ name: 'vehicle-detalle', params: { id: vehicle.id } }">
      <img 
        :src="vehicle.image" 
        :alt="vehicle.name" 
        loading="lazy" 
        width="400" 
        height="250"
      >
      <h3>{{ vehicle.name }}</h3>
    </RouterLink>
    
    <EcoBadge />
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import EcoBadge from './EcoBadge.vue';

defineProps({
  vehicle: {
    type: Object,
    required: true
  }
});
</script>

<style scoped>
/* Un consell extra: assegura't que la imatge no es deformi */
img {
  width: 100%;
  height: 250px;
  object-fit: cover; /* Manté la proporció sense deformar la imatge */
}
</style>
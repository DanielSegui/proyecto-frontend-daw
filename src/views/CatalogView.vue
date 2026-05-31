<template>
  <div class="catalog-page">
    <h1 class="title">Catálogo Completo</h1>
    
    <input v-model="searchQuery" placeholder="Buscar modelo..." class="search-bar">

    <div class="coches-tienda">
      <RouterLink 
        v-for="v in filteredVehicles" 
        :key="v.id" 
        :to="`/coches/${v.id}`"
        class="card-wrapper"
      >
        <VehicleCard :vehicle="v" />
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { vehiclesData } from '@/data/vehicles';
import VehicleCard from '@/components/VehicleCard.vue';

const searchQuery = ref('');

const filteredVehicles = computed(() => {
  const query = searchQuery.value.toLowerCase();
  return Object.keys(vehiclesData).map(id => ({
    id,
    ...vehiclesData[id]
  })).filter(v => v.name.toLowerCase().includes(query));
});
</script>

<style scoped>
.catalog-page {
  min-height: 100vh;
  padding: 120px 20px 40px 20px;
  background: #0D0F12;
}

.title { color: gold; text-align: center; margin-bottom: 40px; }

.search-bar {
  display: block;
  margin: 0 auto 40px auto;
  width: 90%;
  max-width: 600px;
  padding: 15px 25px;
  border-radius: 50px;
  border: 2px solid #b8860b;
  background: #111;
  color: white;
  outline: none;
}

.coches-tienda {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
}

/* El truco para que la tarjeta sea clicable y tenga efecto profesional */
.card-wrapper {
  text-decoration: none;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: block;
  border-radius: 12px;
  overflow: hidden;
}

.card-wrapper:hover {
  transform: translateY(-10px);
  box-shadow: 0 10px 20px rgba(184, 134, 11, 0.3);
}
</style>
<template>
  <main>
    <section class="hero1">
      <img src="/imgs/image3.jpg" class="hero1-image" alt="Coches de lujo">
      <div class="hero1-content">
        <h1>Coches de lujo</h1>
        <p>Donde la pasión por los coches se convierte en confianza</p>
      </div>
    </section>

    <section class="coches"> 
      <div class="search-section" style="padding: 30px 20px; text-align: center; background: #0D0F12;">
        <div style="max-width: 600px; margin: 0 auto; position: relative;">
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="Busca tu modelo ideal..." 
            style="width: 100%; padding: 15px 25px; border-radius: 50px; border: 2px solid #b8860b; background: #111; color: white; font-family: 'Montserrat', sans-serif; outline: none; transition: 0.3s; box-shadow: 0 0 15px rgba(184, 134, 11, 0.2);"
          >
        </div>
        
        <p v-if="searchQuery.trim() !== ''" :style="{ color: filteredVehicles.length === 0 ? '#ff4444' : '#b8860b' }" style="margin-top: 15px; font-size: 0.9rem; font-weight: 600;">
          {{ filteredVehicles.length === 0 ? 'No se han encontrado modelos que coincidan.' : `Se han encontrado ${filteredVehicles.length} modelo(s) disponible(s).` }}
        </p>
      </div>

      <h2 class="coches-titulo">
        {{ searchQuery ? 'Resultados de la búsqueda' : 'Coches Destacados' }}
      </h2>
      <br>

      <div v-if="loading" style="text-align:center; color: gold; padding: 40px;">Cargando...</div>

      <div class="coches-tienda">
        <VehicleCard 
          v-for="coche in filteredVehicles" 
          :key="coche.id" 
          :vehicle="coche" 
        />
      </div>    
    </section>
  </main>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import VehicleCard from '@/components/VehicleCard.vue';
import http from '@/services/http.js';

const searchQuery = ref('');
const coches = ref([]);
const loading = ref(false);

onMounted(async () => {
  loading.value = true;
  try {
    const response = await http.get('/products', {
      params: { category: 'Coches de Lujo', per_page: 50 }
    });
    coches.value = response.data.data;
  } catch (error) {
    console.error('Error al cargar los coches:', error);
  } finally {
    loading.value = false;
  }
});

const filteredVehicles = computed(() => {
  const query = searchQuery.value.toLowerCase().trim();
  if (!query) return coches.value;
  return coches.value.filter(coche => coche.name.toLowerCase().includes(query));
});
</script>

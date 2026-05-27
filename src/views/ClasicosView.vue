<template>
  <main>
    <section class="hero1">
      <img src="/imgs/clasico.jpg" class="hero1-image" alt="Coches Clásicos">
      <div class="hero1-content">
        <h1>Coches Clásicos</h1>
        <p>La elegancia que nunca pasa de moda</p>
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
          <span style="position: absolute; right: 25px; top: 15px; color: #b8860b; font-size: 1.2rem;">🔍</span>
        </div>
        
        <p v-if="searchQuery.trim() !== ''" :style="{ color: filteredClasicos.length === 0 ? '#ff4444' : '#b8860b' }" style="margin-top: 15px; font-size: 0.9rem; font-weight: 600; min-height: 20px;">
          {{ filteredClasicos.length === 0 ? 'No se han encontrado modelos que coincidan.' : `Se han encontrado ${filteredClasicos.length} modelo(s) disponible(s).` }}
        </p>
      </div>

      <h2 class="coches-titulo">Joyas Históricas</h2>
      <br>

      <div class="coches-tienda">
        <VehicleCard 
          v-for="clasico in filteredClasicos" 
          :key="clasico.id" 
          :vehicle="clasico" 
        />
      </div>    
    </section>
  </main>
</template>

<script setup>
import { ref, computed } from 'vue';
import VehicleCard from '@/components/VehicleCard.vue';

const searchQuery = ref('');

// Listado de coches clásicos extraído exactamente de tu HTML original
const clasicos = ref([
  { id: 1, name: 'Ferrari 250 GTO', image: '/imgs/ferrari250.jpg', link: '/clasicos/ferrari250' },
  { id: 2, name: 'Mercedes 300 SL Gullwing', image: '/imgs/mercedes300G.webp', link: '/clasicos/mercedes300' },
  { id: 3, name: 'Porsche 356', image: '/imgs/porsche356.jpg', link: '/clasicos/porsche356' },
  { id: 4, name: 'Shelby Cobra', image: '/imgs/shelby.webp', link: '/clasicos/shelby' },
  { id: 5, name: 'Jaguar E-Type', image: '/imgs/jaguarE.webp', link: '/clasicos/jaguar' },
  { id: 6, name: 'Ford Mustang 1964', image: '/imgs/mustang1964.jpg', link: '/clasicos/mustang' }
]);

// Filtro reactivo sin usar JS nativo sucio
const filteredClasicos = computed(() => {
  const query = searchQuery.value.toLowerCase().trim();
  if (!query) return clasicos.value;
  return clasicos.value.filter(clasico => clasico.name.toLowerCase().includes(query));
});
</script>
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
          <span style="position: absolute; right: 25px; top: 15px; color: #b8860b; font-size: 1.2rem;">🔍</span>
        </div>
        
        <p v-if="searchQuery.trim() !== ''" :style="{ color: filteredVehicles.length === 0 ? '#ff4444' : '#b8860b' }" style="margin-top: 15px; font-size: 0.9rem; font-weight: 600; min-height: 20px;">
          {{ filteredVehicles.length === 0 ? 'No se han encontrado modelos que coincidan.' : `Se han encontrado ${filteredVehicles.length} modelo(s) disponible(s).` }}
        </p>
      </div>

      <h2 class="coches-titulo">Coches Destacados</h2>
      <br>

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
import { ref, computed } from 'vue';
import VehicleCard from '@/components/VehicleCard.vue';

const searchQuery = ref('');

// Listado de coches
const coches = ref([
  { id: 1, name: 'Porsche 911 Carrera GTS', image: '/imgs/porsche911.webp', link: '/coches/porsche911' },
  { id: 2, name: 'Lamborghini Aventador', image: '/imgs/lambo.jpg', link: '/coches/laventador' },
  { id: 3, name: 'Ferrari F8 Tributo', image: '/imgs/ferrari1.jpg', link: '/coches/ferrariF8' },
  { id: 4, name: 'Porsche 911 GT3 RS', image: '/imgs/gt3rs.jpg', link: '/coches/porscheGT3' },
  { id: 5, name: 'Bugatti Chiron', image: '/imgs/bugattiChiron.jpg', link: '/coches/bugattiChiron' },
  { id: 6, name: 'Koenigsegg Jesko', image: '/imgs/jesko.jpg', link: '/coches/jesko' }
]);

// Filtro reactivo igual al de motos
const filteredVehicles = computed(() => {
  const query = searchQuery.value.toLowerCase().trim();
  if (!query) return coches.value;
  return coches.value.filter(coche => coche.name.toLowerCase().includes(query));
});
</script>
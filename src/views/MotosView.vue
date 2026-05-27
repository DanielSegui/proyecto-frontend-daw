<template>
  <main>
    <section class="hero1">
      <img src="/imgs/motohero.jpg" class="hero1-image" alt="Motos Superdeportivas">
      <div class="hero1-content">
        <h1>Motos Superdeportivas</h1>
        <p>Siente la adrenalina pura en dos ruedas</p>
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
        
        <p v-if="searchQuery.trim() !== ''" :style="{ color: filteredMotos.length === 0 ? '#ff4444' : '#b8860b' }" style="margin-top: 15px; font-size: 0.9rem; font-weight: 600; min-height: 20px;">
          {{ filteredMotos.length === 0 ? 'No se han encontrado modelos que coincidan.' : `Se han encontrado ${filteredMotos.length} modelo(s) disponible(s).` }}
        </p>
      </div>

      <h2 class="coches-titulo">Motos Destacadas</h2>
      <br>

      <div class="coches-tienda">
        <VehicleCard 
          v-for="moto in filteredMotos" 
          :key="moto.id" 
          :vehicle="moto" 
        />
      </div>    
    </section>
  </main>
</template>

<script setup>
import { ref, computed } from 'vue';
import VehicleCard from '@/components/VehicleCard.vue';

const searchQuery = ref('');

// Listado de motos extraído exactamente de tu HTML original
const motos = ref([
  { id: 1, name: 'Ducati Panigale V4', image: '/imgs/ducatip.webp', link: '/motos/ducatiV4' },
  { id: 2, name: 'Kawasaki Ninja H2R', image: '/imgs/kninja.jpg', link: '/motos/kninja' },
  { id: 3, name: 'BMW S1000RR', image: '/imgs/motobmw.webp', link: '/motos/bmwmoto' },
  { id: 4, name: 'Yamaha R1M', image: '/imgs/yamahaR1M.jpeg', link: '/motos/yamaha' },
  { id: 5, name: 'Honda CBR1000RR-R', image: '/imgs/Hcbr.jpg', link: '/motos/honda' },
  { id: 6, name: 'Aprilia RSV4', image: '/imgs/aprilia.jpg', link: '/motos/aprilia' }
]);

// Filtro reactivo sin usar JS nativo sucio
const filteredMotos = computed(() => {
  const query = searchQuery.value.toLowerCase().trim();
  if (!query) return motos.value;
  return motos.value.filter(moto => moto.name.toLowerCase().includes(query));
});
</script>
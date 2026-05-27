<template>
  <main class="detalle-container" style="padding-top: 15vh; min-height: 80vh;">
    <h1 class="gold-title" style="text-align: center; font-size: 2.5rem;">
      Mi Garaje Personal
    </h1>

    <div v-if="favsList.length > 0" class="g-grid">
      <div v-for="vehicle in favsList" :key="vehicle.id" class="g-card">
        
        <div class="g-img-container">
          <img :src="vehicle.image" :alt="vehicle.name" @error="handleImageError">
        </div>
        
        <h3 class="g-titulo">{{ vehicle.name }}</h3>
        <p style="color: goldenrod; font-weight: bold; font-size: 1.2rem;">
          {{ vehicle.price }}
        </p>
        
        <router-link 
          :to="getVehicleRoute(vehicle.id)" 
          class="btn-reserva" 
          style="padding: 10px; font-size: 0.8rem; margin-top: 15px; display: block; text-decoration: none;"
        >
          VER DETALLES
        </router-link>
        
        <button @click="eliminarFav(vehicle)" class="btn-borrar">
          ELIMINAR DEL GARAJE
        </button>
      </div>
    </div>

    <div v-else style="text-align: center; padding: 100px 20px;">
      <p style="color: #666; font-size: 1.2rem;">Tu garaje está vacío en este momento.</p>
      <router-link 
        to="/coches" 
        class="btn-reserva" 
        style="display: inline-block; margin-top: 20px; text-decoration: none; width: auto; padding: 15px 40px;"
      >
        EXPLORAR CATÁLOGO
      </router-link>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { vehiclesData } from '@/data/vehicles';

const favsList = ref([]);

const cargarFavoritos = () => {
  // 1. Sacamos los nombres de los favoritos guardados en localStorage
  const nombresFavs = JSON.parse(localStorage.getItem('misFavoritos')) || [];
  const temporales = [];

  // 2. Buscamos esos nombres dentro de nuestro objeto global de datos
  for (const id in vehiclesData) {
    if (nombresFavs.includes(vehiclesData[id].name)) {
      temporales.push({
        id: id,
        ...vehiclesData[id]
      });
    }
  }
  
  favsList.value = temporales;
};

// Función para calcular la ruta exacta dependiendo del vehículo
const getVehicleRoute = (id) => {
  // Si empieza por 'ducati', 'kninja', 'bmw', etc., es una moto
  const motosIds = ['ducatiV4', 'kninja', 'bmwmoto', 'yamaha', 'honda', 'aprilia'];
  // Si empieza por 'ferrari250', 'mercedes', etc., es clásico
  const clasicosIds = ['ferrari250', 'mercedes300', 'porsche356', 'shelby', 'jaguar', 'mustang'];

  if (motosIds.includes(id)) return `/motos/${id}`;
  if (clasicosIds.includes(id)) return `/clasicos/${id}`;
  return `/coches/${id}`; // Por defecto redirige a la sección de coches
};

const eliminarFav = (vehicle) => {
  if (!confirm(`¿Seguro que quieres sacar el ${vehicle.name} de tu garaje?`)) return;
  
  let favoritos = JSON.parse(localStorage.getItem('misFavoritos')) || [];
  favoritos = favoritos.filter(name => name !== vehicle.name);
  
  localStorage.setItem('misFavoritos', JSON.stringify(favoritos));
  // Volvemos a recargar la lista de manera reactiva
  cargarFavoritos();
};

// Reemplazo del "onerror" clásico de HTML por un método limpio de Vue
const handleImageError = (e) => {
  e.target.src = '/imgs/logo3.png';
};

onMounted(() => {
  cargarFavoritos();
});
</script>
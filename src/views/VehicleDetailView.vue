<template>
  <main v-if="vehicle" class="detalle-container" style="padding-top: 15vh; background: #0D0F12;">
    <section class="info-principal">
      <div class="galeria-vip">
        <img :src="vehicle.image" :alt="vehicle.name">
      </div>
      
      <div class="detalles-compra">
        <span class="badge-lujo">Disponible</span>
        <br><br>
        <h1>{{ vehicle.name }}</h1>
        <p class="precio-especial">{{ vehicle.price }}</p>
        
        <div class="specs-grid">
          <div class="spec-item"><strong>Motor</strong><span>{{ vehicle.motor }}</span></div>
          <div class="spec-item"><strong>Potencia</strong><span>{{ vehicle.potencia }}</span></div>
          <div class="spec-item"><strong>0-100</strong><span>{{ vehicle.aceleracion }}</span></div>
        </div>

        <div class="acciones-compra">
          <button class="btn-reserva">RESERVAR AHORA</button>
          <button 
            @click="toggleFavorito" 
            class="btn-favorito" 
            :class="{ 'active': isFavorito }"
          >
            <span class="corazon">❤</span> 
            <span class="texto-fav">
                {{ isFavorito ? 'En tus favoritos' : 'Añadir a favoritos' }}
            </span>
          </button>
        </div>
      </div>
    </section>

    <section class="reviews-section">
      <h2 class="gold-title">Opiniones de Clientes</h2>
      
      <form @submit.prevent="agregarComentario">
        <div class="rating-input">
          <span 
            v-for="star in [5, 4, 3, 2, 1]" 
            :key="star"
            class="star" 
            :class="{ 'active': star <= nuevaValoracion }"
            @click="nuevaValoracion = star"
          >★</span>
        </div>
        <textarea 
            id="commentText" 
            v-model="nuevoTextoComentario" 
            placeholder="Escribe tu reseña como experto..." 
            required
        ></textarea>
        <button type="submit" class="btn-reserva btn-small">Publicar Reseña</button>
      </form>

      <div class="margin-top-40">
        <div v-for="c in comentarios" :key="c.id" class="comment-card">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
            <strong style="color:gold; font-size:1.1em;">{{ c.usuario }}</strong>
            <span style="color:gold; letter-spacing:2px;">
              {{ '★'.repeat(c.estrellas) }}{{ '☆'.repeat(5 - c.estrellas) }}
            </span>
          </div>
          <p style="color:white; margin:0 0 15px 0; line-height:1.6;">{{ c.texto }}</p>
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <small style="color:#666;">{{ c.fecha }}</small>
            <button @click="borrarComentario(c.id)" class="btn-delete">BORRAR MI RESEÑA</button>
          </div>
        </div>
      </div>
    </section>
  </main>
  
  <div v-else style="padding: 150px; text-align: center; color: white;">
    <h2>Vehículo no encontrado</h2>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { vehiclesData } from '@/data/vehicles';

const route = useRoute();
const vehicleId = ref(route.params.id);
const vehicle = ref(null);

// Estados de Favoritos
const isFavorito = ref(false);

// Estados de Comentarios
const nuevaValoracion = ref(5);
const nuevoTextoComentario = ref('');
const comentarios = ref([]);

// Cargar o cambiar de vehículo dinámicamente
const inicializarVehiculo = () => {
  vehicleId.value = route.params.id;
  vehicle.value = vehiclesData[vehicleId.value];
  
  if (vehicle.value) {
    comprobarFavorito();
    cargarComentariosSimulados();
  }
};

// --- MECÁNICA: FAVORITOS ---
const comprobarFavorito = () => {
  let favoritos = JSON.parse(localStorage.getItem('misFavoritos')) || [];
  isFavorito.value = favoritos.includes(vehicle.value.name);
};

const toggleFavorito = () => {
  let favoritos = JSON.parse(localStorage.getItem('misFavoritos')) || [];
  if (favoritos.includes(vehicle.value.name)) {
    favoritos = favoritos.filter(c => c !== vehicle.value.name);
    isFavorito.value = false;
  } else {
    favoritos.push(vehicle.value.name);
    isFavorito.value = true;
  }
  localStorage.setItem('misFavoritos', JSON.stringify(favoritos));
};

// --- MECÁNICA: COMENTARIOS REACTIVOS ---
const cargarComentariosSimulados = () => {
  // Inicializamos un par de comentarios en memoria local según el vehículo elegido
  comentarios.value = [
    {
      id: 1,
      usuario: "ExpertoMotor",
      estrellas: 5,
      texto: `Impresionante rendimiento del ${vehicle.value.name}. La respuesta de su motor es espectacular.`,
      fecha: "2026-05-25"
    }
  ];
};

const agregarComentario = () => {
  const nuevo = {
    id: Date.now(),
    usuario: "Usuario_Sesion", // Cambiará en el futuro con tu Auth Store de Pinia
    estrellas: nuevaValoracion.value,
    texto: nuevoTextoComentario.value,
    fecha: new Date().toISOString().split('T')[0]
  };
  
  comentarios.value.unshift(nuevo);
  nuevoTextoComentario.value = '';
  nuevaValoracion.value = 5;
};

const borrarComentario = (id) => {
  if (confirm("¿Eliminar tu comentario permanentemente?")) {
    comentarios.value = comentarios.value.filter(c => c.id !== id);
  }
};

// Observar si la ruta cambia de coche/moto/clásico para refrescar los datos
watch(() => route.params.id, () => {
  inicializarVehiculo();
});

onMounted(() => {
  inicializarVehiculo();
});
</script>
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
          <RouterLink 
            :to="{ 
              path: '/reserva', 
              query: { modelo: vehicle.name, precio: vehicle.price } 
            }" 
            class="btn-reserva"
            style="text-decoration: none; display: inline-block; text-align: center; box-sizing: border-box;"
          >
            RESERVAR AHORA
          </RouterLink>

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
      
      <div v-if="authStore.isAuthenticated">
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
          <button type="submit" class="btn-reserva btn-small" :disabled="enviandoReview">
            {{ enviandoReview ? 'Publicando...' : 'Publicar Reseña' }}
          </button>
        </form>
      </div>
      <p v-else style="color: #b8860b; margin-bottom: 20px;">
        <RouterLink to="/login" style="color: gold;">Inicia sesión</RouterLink> para dejar una reseña.
      </p>

      <div v-if="loadingReviews" style="color: gold; text-align: center; padding: 20px;">
        Cargando reseñas...
      </div>

      <div class="margin-top-40">
        <div v-for="c in comentarios" :key="c.id" class="comment-card">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
            <strong style="color:gold; font-size:1.1em;">{{ c.usuario }}</strong>
            <span style="color:gold; letter-spacing:2px;">
              {{ '★'.repeat(c.estrellas) }}{{ '☆'.repeat(5 - c.estrellas) }}
            </span>
          </div>
          <p style="color:white; margin:0 0 15px 0; line-height:1.6;">{{ c.texto }}</p>
          <small style="color:#666;">{{ c.fecha }}</small>
        </div>

        <p v-if="!loadingReviews && comentarios.length === 0" style="color: #666; text-align: center;">
          Aún no hay reseñas. ¡Sé el primero en opinar!
        </p>
      </div>
    </section>
  </main>
  
  <div v-else-if="loadingVehicle" style="padding: 150px; text-align: center; color: white;">
    <h2>Cargando vehículo...</h2>
  </div>

  <div v-else style="padding: 150px; text-align: center; color: white;">
    <h2>Vehículo no encontrado</h2>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useAuthStore } from '@/modules/auth/auth';
import http from '@/services/http.js';

const route = useRoute();
const authStore = useAuthStore();

const vehicle = ref(null);
const loadingVehicle = ref(true);
const loadingReviews = ref(false);
const isFavorito = ref(false);
const nuevaValoracion = ref(5);
const nuevoTextoComentario = ref('');
const comentarios = ref([]);
const enviandoReview = ref(false);

const fetchVehicle = async (id) => {
  loadingVehicle.value = true;
  vehicle.value = null;
  try {
    const response = await http.get(`/products/${id}`);
    vehicle.value = response.data.data;
    comprobarFavorito();
    await fetchReviews(id);
  } catch (err) {
    console.error('Error al cargar vehículo:', err);
  } finally {
    loadingVehicle.value = false;
  }
};

const fetchReviews = async (id) => {
  loadingReviews.value = true;
  try {
    const response = await http.get(`/products/${id}/reviews`);
    comentarios.value = response.data.data.map(r => ({
      id: r.id,
      usuario: r.usuario || 'Anónimo',
      estrellas: r.stars,
      texto: r.comment,
      fecha: r.review_date,
    }));
  } catch (err) {
    console.error('Error al cargar reseñas:', err);
  } finally {
    loadingReviews.value = false;
  }
};

const comprobarFavorito = () => {
  const favoritos = JSON.parse(localStorage.getItem('misFavoritos')) || [];
  isFavorito.value = favoritos.includes(vehicle.value?.name);
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

const agregarComentario = async () => {
  if (!authStore.isAuthenticated) return;
  enviandoReview.value = true;
  try {
    const response = await http.post(`/products/${route.params.id}/reviews`, {
      stars: nuevaValoracion.value,
      comment: nuevoTextoComentario.value,
    });
    const r = response.data.data;
    comentarios.value.unshift({
      id: r.id,
      usuario: r.usuario || authStore.user?.name || 'Tú',
      estrellas: r.stars,
      texto: r.comment,
      fecha: r.review_date,
    });
    nuevoTextoComentario.value = '';
    nuevaValoracion.value = 5;
  } catch (err) {
    console.error('Error al publicar reseña:', err);
    alert('No se pudo publicar la reseña. Inténtalo de nuevo.');
  } finally {
    enviandoReview.value = false;
  }
};

watch(() => route.params.id, (newId) => {
  if (newId) fetchVehicle(newId);
});

onMounted(() => {
  fetchVehicle(route.params.id);
});
</script>

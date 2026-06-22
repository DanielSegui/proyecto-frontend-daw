<template>
  <div class="catalog-page">
    <h1 class="title">Catálogo Completo</h1>
    
    <input v-model="searchQuery" placeholder="Buscar modelo..." class="search-bar">

    <div v-if="loading" style="text-align:center; color: gold; padding: 40px;">
      Cargando vehículos...
    </div>

    <div v-else-if="error" style="text-align:center; color: #ff4444; padding: 40px;">
      Error al cargar el catálogo. Inténtalo de nuevo.
    </div>

    <div v-else class="coches-tienda">
      <VehicleCard 
        v-for="v in filteredVehicles" 
        :key="v.id" 
        :vehicle="v" 
      />
    </div>

    <div v-if="!loading && !error && totalPages > 1" class="pagination">
      <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1">Anterior</button>
      <span style="color: gold; padding: 0 15px;">Página {{ currentPage }} / {{ totalPages }}</span>
      <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages">Siguiente</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import VehicleCard from '@/components/VehicleCard.vue';
import http from '@/services/http.js';

const searchQuery = ref('');
const vehicles = ref([]);
const loading = ref(false);
const error = ref(false);
const currentPage = ref(1);
const totalPages = ref(1);

const fetchVehicles = async (page = 1) => {
  loading.value = true;
  error.value = false;
  try {
    const params = { page };
    if (searchQuery.value.trim()) {
      params.q = searchQuery.value.trim();
    }
    const response = await http.get('/products', { params });
    vehicles.value = response.data.data;
    totalPages.value = response.data.meta?.last_page || 1;
    currentPage.value = response.data.meta?.current_page || 1;
  } catch (err) {
    console.error('Error al cargar catálogo:', err);
    error.value = true;
  } finally {
    loading.value = false;
  }
};

const filteredVehicles = computed(() => {
  if (!searchQuery.value.trim()) return vehicles.value;
  const q = searchQuery.value.toLowerCase();
  return vehicles.value.filter(v => v.name.toLowerCase().includes(q));
});

const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    fetchVehicles(page);
  }
};

let searchTimeout = null;
watch(searchQuery, () => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => fetchVehicles(1), 400);
});

onMounted(() => fetchVehicles(1));
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

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
}

.pagination button {
  background: #b8860b;
  color: black;
  border: none;
  padding: 10px 20px;
  border-radius: 25px;
  cursor: pointer;
  font-weight: bold;
}

.pagination button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
</style>

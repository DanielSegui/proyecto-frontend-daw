<!-- src/views/AdminView.vue -->
<template>
  <div class="admin-container">
    <div class="admin-card">
      <div class="admin-icon">⚙️</div>
      <h1>Panel de Administración</h1>
      <p class="subtitle">Zona Restringida</p>
      <hr class="divider" />
      <p class="description">
        Esta es una ruta protegida. Solo los usuarios con rol de <strong>administrador</strong> 
        tienen permisos para gestionar el inventario, revisar transacciones y modificar los vehículos de D&N Motors.
      </p>
      <div class="admin-actions">
        <router-link to="/" class="btn-back">Volver al Inicio</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.admin-container {
  min-height: 75vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background-color: #0b0b0b; /* Fondo oscuro a juego con tu web */
  color: #ffffff;
  font-family: 'Poppins', sans-serif;
}

.admin-card {
  background: #141414; /* Tarjeta un poco más clara para dar contraste */
  border: 1px solid #222222;
  border-radius: 12px;
  padding: 3rem 2rem;
  max-width: 550px;
  width: 100%;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
}

.admin-icon {
  font-size: 3.5rem;
  margin-bottom: 1rem;
  animation: spin 4s linear infinite; /* Un toque sutil de movimiento en el engranaje */
}

@keyframes spin {
  100% { transform: rotate(360deg); }
}

h1 {
  font-size: 2.2rem;
  font-weight: 700;
  margin: 0;
  color: #ffffff;
  letter-spacing: -0.5px;
}

.subtitle {
  color: goldenrod; /* Color dorado para el toque premium */
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-top: 0.5rem;
  margin-bottom: 1.5rem;
  font-weight: 600;
}

.divider {
  border: 0;
  height: 1px;
  background: linear-gradient(to right, transparent, #333, transparent);
  margin-bottom: 1.5rem;
}

.description {
  color: #aaaaaa;
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.btn-back {
  display: inline-block;
  background-color: #ffffff;
  color: #000000;
  padding: 0.8rem 2rem;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-back:hover {
  background-color: goldenrod;
  color: #ffffff;
  transform: translateY(-2px);
}
</style>
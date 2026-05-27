<template>
  <main>
    <section class="hero2">
      <video autoplay loop muted class="hero2-video">
        <source src="/vids/mclaren.mp4" type="video/mp4">
      </video>
      <div class="hero2-content">
        <h1>D&N Motors</h1>
        <p>Donde la pasión por los coches se convierte en confianza</p>
      </div>
    </section>

    <section class="categorias container py-5">
      <h2 class="categorias-titulo text-center">Elige Tu Camino</h2>
      <div class="categorias-texto text-center mb-5">
        <p>En D&N Motors puedes elegir si prefieres coches de lujo, motos superdeportivas o apostar por los coches clásicos e históricos.</p>
      </div>
      <div class="row g-4 d-flex align-items-stretch">
        <div class="col-12 col-md-4">
          <div class="cat-card h-100 position-relative">
            <img src="/imgs/ferrari.png" alt="Coches superdeportivos" class="img-fluid">
            <h3>Coches De Lujo</h3>
            <button class="cat-btn" @click="$router.push('/coches')">Descúbrelo</button>
          </div>
        </div>
        <div class="col-12 col-md-4">
          <div class="cat-card h-100 position-relative">
            <span class="badge rounded-pill bg-danger position-absolute m-3" style="top:0; right:0;">¡TOP VENTAS!</span>
            <img src="/imgs/motoDeportiva.png" alt="Motos super deportivas" class="img-fluid">
            <h3>Motos Superdeportivas</h3>
            <button class="cat-btn" @click="$router.push('/motos')">Descúbrelo</button>
          </div>
        </div>
        <div class="col-12 col-md-4">
          <div class="cat-card h-100 position-relative">
            <span class="badge rounded-pill bg-warning text-dark position-absolute m-3" style="top:0; right:0;">Nueva Colección</span>
            <img src="/imgs/clasicos2.png" alt="Coches clásicos" class="img-fluid">
            <h3>Coches Clásicos</h3>
            <button class="cat-btn" @click="$router.push('/clasicos')">Descúbrelo</button>
          </div>
        </div>
      </div>
    </section>

    <section class="split">
      <div class="split-img"><img src="/imgs/moto1.jpg" alt="Motocicleta deportiva"></div>
      <div class="split-text">
        <h2>Pasión por el Motor</h2>
        <p>En D&N Motors somos apasionados del mundo del motor. Nuestro objetivo es ofrecerte los mejores coches nuevos y de ocasión.</p>
      </div>
    </section>

    <section class="split reverse">
      <div class="split-img"><img src="/imgs/aston.jpg" alt="Coche deportivo azul"></div>
      <div class="split-text">
        <h2>Tu Coche Ideal Te Espera</h2>
        <p>Ya sea que busques tu primer coche, un modelo familiar o un vehículo deportivo, en D&N Motors encontrarás la opción perfecta.</p>
      </div>
    </section>

    <section class="about">
      <h2>Sobre nosotros</h2>
      <div class="carousel-container">
        <div class="carousel-track" :style="{ transform: `translateX(-${carouselIndex * 100}%)` }">
          <div class="carousel-item">
            <img src="/imgs/mecanico.jpg" alt="Mecánicos">
            <p>Ofrecemos el mejor cuidado para tu vehículo con los mejores mecánicos.</p>
          </div>
          <div class="carousel-item">
            <img src="/imgs/taller.jpg" alt="Taller">
            <p>Contamos con un taller profesional equipado con tecnología de última generación.</p>
          </div>
          <div class="carousel-item">
            <img src="/imgs/tallerLujo.jpg" alt="Atención">
            <p>Brindamos atención personalizada para garantizar tu total satisfacción.</p>
          </div>
        </div>
        <button class="carousel-btn prev" @click="moveCarousel(-1)">←</button>
        <button class="carousel-btn next" @click="moveCarousel(1)">→</button>
      </div>
      <button class="btn" @click="$router.push('/contacto')">Contáctanos</button>
    </section>
  </main>
</template>

<script setup>
import { ref } from 'vue';

// Lógica del Carrusel
const carouselIndex = ref(0);
const moveCarousel = (direction) => {
  carouselIndex.value = (carouselIndex.value + direction + 3) % 3;
};
</script>
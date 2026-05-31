# D&N Motors - Frontend (Vue)

## Descripció
SPA (Single Page Application) desenvolupada amb Vue 3, Pinia i Axios. Aquest projecte és el frontend del sistema D&N Motors i es comunica amb una API REST Laravel externa.

## Configuració del Desenvolupament
- **Requisits:** Node.js 20+ i Docker.
- **Instruccions:** 
  1. Copia el fitxer `.env.example` a `.env` i configura `VITE_API_URL`.
  2. Executa `docker-compose up --build`.
- **Arquitectura:**
  - `src/services/`: Capa de comunicació amb l'API (Axios + Interceptors).
  - `src/modules/auth/`: Gestió d'estat i autenticació amb Pinia.
  - `src/components/`: Components reutilitzables seguint criteris d'accessibilitat.

## Integració CI/CD
Aquest repositori disposa d'un procés automatitzat per al build de producció (Nginx) via Docker.
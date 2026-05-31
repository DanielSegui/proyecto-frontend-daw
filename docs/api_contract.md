# Contracte de l'API (Frontend - Backend)

Aquest document detalla els endpoints de l'API REST utilitzats pel frontend de D&N Motors per comunicar-se amb el backend de Laravel.

## Configuració Base
- **URL Base:** Definida en la variable d'entorn `VITE_API_URL`.
- **Headers:** Totes les peticions inclouen `Content-Type: application/json` i `Accept: application/json`.
- **Autenticació:** S'utilitza `Bearer Token` mitjançant interceptors d'Axios.

## Endpoints Principals

### 1. Vehicles
* **GET `/api/vehicles`**
  - **Descripció:** Obté el llistat de vehicles amb suport per a paginació i filtres.
  - **Paràmetres:** `search`, `category`, `page`.
  - **Resposta (200 OK):** JSON amb el llistat de vehicles.

### 2. Contacte
* **POST `/api/contacte`**
  - **Descripció:** Envia el formulari de contacte validat.
  - **Payload:** 
```json
    {
      "nom": "string",
      "email": "string",
      "edat": "number",
      "telefon": "string",
      "consentiment": "boolean"
    }
    ```
  - **Resposta (200 OK):** Confirmació d'enviament.

### 3. Autenticació
* **POST `/api/login`**
  - **Descripció:** Autenticació d'usuari i recepció de token.
* **GET `/api/oauth/google/redirect`**
  - **Descripció:** Inici del flux OAuth2 amb Google.
* **GET `/api/oauth/google/callback`**
  - **Descripció:** Finalització del flux i intercanvi de codi per token.

## Gestió d'Errors
L'aplicació està preparada per gestionar els següents codis d'estat segons la guia:
- **401 Unauthorized:** Redirecció al login per token caducat.
- **422 Unprocessable Entity:** Errors de validació en els formularis (capturats per `vee-validate`).
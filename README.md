# Manual d'Usuari - D&N Motors

Benvingut a la plataforma de gestió de vehicles D&N Motors. Aquest manual t'ajudarà a navegar i utilitzar les funcionalitats principals de l'aplicació.

## 1. Introducció
D&N Motors és una aplicació web dissenyada per a la consulta, visualització i gestió de vehicles de gamma alta. L'aplicació permet filtrar, cercar i obtenir informació tècnica detallada de cada model.

## 2. Funcionalitats Principals

### 2.1. Catàleg de Vehicles
- **Visualització:** En accedir a la pàgina principal, veuràs el llistat de vehicles disponibles.
- **Cerca i Filtres:** Utilitza la barra de cerca per trobar models concrets. Pots aplicar filtres per categoria o marca per refinar els resultats.
- **Paginació:** Navega entre les diferents pàgines del catàleg per explorar tot l'inventari.

### 2.2. Detall del Vehicle
- Fes clic sobre qualsevol vehicle per accedir a la seva fitxa detallada.
- **Fitxa Tècnica en PDF:** Dins de la vista de detall, trobaràs un botó per descarregar la fitxa tècnica del vehicle en format PDF, facilitant la consulta fora de l'aplicació.

### 2.3. Contacte
- Si tens alguna consulta, utilitza el formulari de contacte.
- **Validació en temps real:** El formulari validarà les teves dades a mesura que les escriguis (nom, correu electrònic, telèfon, etc.) per garantir que la informació s'envia correctament.
- **Feedback visual:** Si hi ha alguna dada incorrecta, el camp es marcarà en vermell amb un missatge d'error explicatiu.

## 3. Ajuda i Resolució de Problemes
- **Ajuda contextual:** L'aplicació inclou missatges d'ajuda en els formularis per guiar-te durant l'entrada de dades.
- **Errors de connexió:** Si el sistema no respon, verifica la teva connexió a internet. Si el problema persisteix, contacta amb l'administrador.


# Frontend: D&N Motors

Aquest és el repositori del frontend per a **D&N Motors**. L'aplicació utilitza una arquitectura moderna basada en microserveis desacoblats, servida mitjançant un contenidor **Nginx** que actua com a **Proxy Invers** i gestor SSL per garantir connexions segures.

# Arquitectura del Frontend
El frontend ha estat dissenyat per ser modular i segur:

1. **Service Layer:** Totes les peticions a l'API es gestionen mitjançant `src/services/http.js`. Aquest mòdul utilitza **Axios Interceptors** per injectar automàticament el `Bearer Token` a les capçaleres de les peticions (C1).
2. **Validació:** Utilitzem `Yup` per definir esquemes de ddaes rigorosos en tots els formularis, garantint que només dades vàlides arriben al backend (C3).
3. **Ecodisseny:** Utilitzem formats d'imatge optimitzats (.webp) i hem minimitzat els recursos per reduir la petjada energètica, complint amb els criteris ASG (C6).
---

## 🏗 Arquitectura del Sistema

El sistema es basa en contenidors Docker que s'orquestren per separar la lògica de presentació (**Frontend**) de la lògica de dades (**Backend**), amb **Nginx** gestionant la seguretat i el trànsit.

---

## 🛠 Configuració Tècnica (Docker Compose)

Tota la infraestructura es desplega mitjançant `docker-compose.yml`. Utilitzem una **xarxa compartida** (`app-network`) que permet que els serveis es comuniquin pel seu nom intern de manera segura.

```yaml
services:
  # El frontend
  frontend:
    build: ./frontend
    restart: always
    networks:
      - app-network

  # El servei de Nginx
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/conf.d/default.conf
      - ./proxy/www:/var/www/certbot
      - ./letsencrypt:/etc/letsencrypt
    networks:
      - app-network
    depends_on:
      - frontend

  # Certbot per obtenir el certificat
  certbot:
    image: certbot/certbot
    volumes:
      - ./proxy/www:/var/www/certbot
      - ./letsencrypt:/etc/letsencrypt
    networks:
      - app-network

networks:
  app-network:
    driver: bridge

```

---

## 🔐 Configuració de Seguretat (Nginx SSL)

Hem configurat l'Nginx amb una prioritat absoluta per al repte de Let's Encrypt (**ACME Challenge**), garantint renovacions automàtiques sense desconnectar el servei.

```nginx
server {
    listen 80;
    server_name www.projecte07.ddaw.es;

    location ^~ /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    location / {
        return 301 https://$host$request_uri;
    }
}
```

---

## 🚀 Desplegament i CI/CD

El projecte està preparat per a un entorn de producció amb:

* **SSL Automàtic:** Certificats generats per Certbot mitjançant webroot.
* **CI/CD:** Pipeline en desenvolupament a GitHub Actions per automatitzar el desplegament al servidor AWS via SSH.

---

## 🔗 Integració

* **Backend API:** Enllaç al repositori del Backend.
* **Status:** HTTPS actiu i serveis desacoblats.

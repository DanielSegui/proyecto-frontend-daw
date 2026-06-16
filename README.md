# Frontend: D&N Motors

Aquest és el repositori del frontend per a **D&N Motors**. L'aplicació utilitza una arquitectura moderna basada en microserveis desacoblats, servida mitjançant un contenidor **Nginx** que actua com a **Proxy Invers** i gestor SSL per garantir connexions segures.

---

## 🏗 Arquitectura del Sistema

El sistema es basa en contenidors Docker que s'orquestren per separar la lògica de presentació (**Frontend**) de la lògica de dades (**Backend**), amb **Nginx** gestionant la seguretat i el trànsit.

---

## 🛠 Configuració Tècnica (Docker Compose)

Tota la infraestructura es desplega mitjançant `docker-compose.yml`. Utilitzem una **xarxa compartida** (`app-network`) que permet que els serveis es comuniquin pel seu nom intern de manera segura.

```yaml
services:
  frontend:
    build: ./frontend
    networks:
      - app-network

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

# Arquitectura del Frontend
El frontend ha estat dissenyat per ser modular i segur:

1. **Service Layer:** Totes les peticions a l'API es gestionen mitjançant `src/services/http.js`. Aquest mòdul utilitza **Axios Interceptors** per injectar automàticament el `Bearer Token` a les capçaleres de les peticions (C1).
2. **Validació:** Utilitzem `Yup` per definir esquemes de ddaes rigorosos en tots els formularis, garantint que només dades vàlides arriben al backend (C3).
3. **Ecodisseny:** Utilitzem formats d'imatge optimitzats (.webp) i hem minimitzat els recursos per reduir la petjada energètica, complint amb els criteris ASG (C6).
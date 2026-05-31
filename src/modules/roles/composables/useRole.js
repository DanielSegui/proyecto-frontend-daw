// src/modules/roles/composables/useRole.js
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/modules/auth/auth' // <-- Asegúrate de que esta ruta apunta a tu store de auth real

export function useRole() {
  // Convertimos las propiedades del store a refs reactivas para que cambien al desloguearse
  const { user } = storeToRefs(useAuthStore())

  const can = (permission) => {
    // Leemos el rol del usuario actual (admin, vendor, editor, user)
    const role = user.value?.role

    // Definición estricta del modelo de roles y permisos del PDF (Sección C3.7)
    const rules = {
      admin: ['create', 'edit', 'delete', 'moderate'],
      vendor: ['create', 'edit', 'delete'],
      editor: ['moderate'],
      user: ['read']
    }

    // Retorna true si el permiso solicitado está dentro de las reglas de su rol
    return rules[role]?.includes(permission) ?? false
  }

  // Devolvemos la función para poder usarla en los componentes
  return { can }
}
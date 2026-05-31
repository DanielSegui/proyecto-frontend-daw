<!-- src/modules/roles/components/RoleGuard.vue -->
<script setup>
import { useRole } from '../composables/useRole'

const props = defineProps({
  permission: {
    type: String,
    required: true
  }
})

const { can } = useRole()
</script>

<template>
  <!-- Solo renderiza el contenido si el usuario tiene permiso -->
  <slot v-if="can(props.permission)"></slot>
</template>
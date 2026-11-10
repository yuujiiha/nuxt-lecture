<script setup lang="ts">
defineProps<{
  user: {
    name: string
    role: string
  }
}>()
</script>

<template>
  <div class="card">
    <p><strong>{{ user.name }}</strong></p>
    <p>{{ user.role }}</p>
  </div>
</template>

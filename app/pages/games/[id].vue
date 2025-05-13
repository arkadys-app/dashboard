<script setup lang="ts">
const { data: game } = await useFetch(`/api/games/${useRoute().params.id}`)
</script>

<template>
  <div class="flex flex-col">
    <h1>{{ game.name }}</h1>
  </div>
</template>

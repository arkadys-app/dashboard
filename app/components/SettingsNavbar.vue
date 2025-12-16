<script setup lang="ts">
const links = [
  { name: 'Général', path: '/settings' },
  { name: 'Compte', path: '/settings/account' }
]
</script>

<template>
  <nav class="w-full h-10 px-4 lg:px-6 border-b border-b-slate-300 bg-white">
    <ul class="max-w-2xl mx-auto grid grid-cols-2 items-center gap-2 h-full">
      <li v-for="link in links" :key="link.path" class="relative w-full">
        <NuxtLink
          :to="link.path"
          class="flex items-center justify-center rounded-lg h-8 text-sm font-medium text-slate-500 hover:bg-slate-100 hover:text-slate-800 [.router-link-exact-active]:text-teal-500 transition-colors"
        >
          {{ link.name }}
        </NuxtLink>
        <Motion
          v-if="$route.path === link.path"
          class="absolute -bottom-1 left-0 right-0 h-0.5 bg-teal-500 rounded-full"
          layout-id="navbar-indicator"
        />
      </li>
    </ul>
  </nav>
</template>

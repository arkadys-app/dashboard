<script setup lang="ts">
const items = [
  { icon: 'lucide:layout-grid', label: 'Tableau de bord', to: '/' },
  { icon: 'lucide:gamepad-2', label: 'Jeux', to: '/games' },
  { icon: 'lucide:settings-2', label: 'Paramètres', to: '/settings' }
]
</script>

<template>
  <nav class="flex-1 px-4">
    <ul class="flex flex-col gap-y-1">
      <template v-for="item of items" :key="item.label">
        <li>
          <NuxtLink
            :to="item.to"
            class="flex h-9 items-center rounded-md px-3 text-sm font-medium text-gray-600 transition-colors select-none hover:text-gray-800 hover:bg-gray-100 [&.router-link-active]:bg-teal-100 [&.router-link-active]:text-teal-800"
          >
            <Icon :name="item.icon" size="16" class="mr-2" />
            {{ item.label }}
          </NuxtLink>
        </li>
      </template>
    </ul>
  </nav>
</template>

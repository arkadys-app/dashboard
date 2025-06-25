<script setup lang="ts">
const items = [
  [
    {
      name: 'Accueil',
      icon: 'lucide:house',
      link: '/'
    },
    {
      name: 'Jeux',
      icon: 'lucide:gamepad-2',
      link: '/games'
    },
    {
      name: 'Paramètres',
      icon: 'lucide:settings-2',
      link: '/settings'
    }
  ]
] satisfies { name: string; icon: string; link: string }[][]
</script>

<template>
  <div class="flex flex-col w-72 px-6 border-r border-r-zinc-200">
    <!-- Top -->
    <div class="px-4 py-12">
      <!-- Logo -->
      <div class="flex items-center gap-x-2">
        <NuxtLink to="/">
          <NuxtImg src="/logo.png" width="144" />
        </NuxtLink>
      </div>
    </div>
    <!-- Main -->
    <div class="flex flex-col gap-y-6">
      <template v-for="(item, i) of items" :key="i">
        <nav>
          <ul class="flex flex-col gap-y-2">
            <li v-for="subitem of item">
              <NuxtLink
                :to="subitem.link"
                class="select-none flex items-center border-transparent gap-3 px-4 rounded-full py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 [&.router-link-active]:bg-blue-500 [&.router-link-active]:text-white transition-colors"
              >
                <Icon :name="subitem.icon" size="16" />
                {{ subitem.name }}
              </NuxtLink>
            </li>
          </ul>
        </nav>
      </template>
    </div>
  </div>
</template>

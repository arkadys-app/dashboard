<script setup lang="ts">
const items = [
  [
    {
      name: 'Accueil',
      icon: 'ri:home-5-fill',
      link: '/dashboard'
    },
    {
      name: 'Jeux',
      icon: 'ri:gamepad-fill',
      link: '/games'
    },
    {
      name: 'Paramètres',
      icon: 'ri:settings-2-fill',
      link: '/settings'
    }
  ]
] satisfies { name: string; icon: string; link: string }[][]
</script>

<template>
  <div class="flex flex-col w-64 px-4 border-r-2 border-r-zinc-200">
    <!-- Top -->
    <div class="px-4 py-7">
      <!-- Logo -->
      <div class="flex items-center gap-x-2">
        <NuxtLink to="/" class="text-[28px] leading-11 font-black">
          arkadys
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
                class="uppercase select-none flex items-center border-transparent gap-3 px-4 rounded-xl h-12 text-sm font-bold text-zinc-500 hover:bg-zinc-100 [&.router-link-active]:bg-blue-500 [&.router-link-active]:text-white"
              >
                <Icon :name="subitem.icon" size="18" />
                {{ subitem.name }}
              </NuxtLink>
            </li>
          </ul>
        </nav>
      </template>
    </div>
  </div>
</template>

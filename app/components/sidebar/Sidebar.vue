<script setup lang="ts">
const open = defineModel<boolean>('open')
</script>

<template>
  <div class="hidden md:block">
    <div
      :class="open ? 'left-0' : '-left-(--sidebar-width)'"
      class="fixed inset-y-0 z-10 hidden md:flex flex-col h-svh w-(--sidebar-width) bg-white border-r border-slate-300 transition-[left] duration-200 ease-linear"
    >
      <header class="flex items-center h-(--header-height)">
        <div class="flex items-center w-full px-4">
          <NuxtLink to="/" class="inline-flex">
            <Icon name="arkadys:logo" class="w-24 h-6" />
          </NuxtLink>
        </div>
      </header>

      <div class="flex flex-col gap-1 w-full px-2 py-4">
        <SidebarItem
          href="/"
          label="Tableau de bord"
          icon="hugeicons:dashboard-speed-02"
        />
        <SidebarItem
          href="/games"
          label="Liste des jeux"
          icon="hugeicons:game-controller-03"
        />
        <SidebarItem
          href="/customizations"
          label="Personnalisations"
          icon="hugeicons:sliders-horizontal"
        />
        <SidebarItem
          href="/settings"
          label="Paramètres"
          icon="hugeicons:settings-03"
        />
      </div>

      <div class="mt-auto p-2">
        <SidebarUser />
      </div>
    </div>
    <div
      :class="open ? 'w-(--sidebar-width)' : 'w-0'"
      class="relative bg-transparent transition-[width] duration-200 ease-linear"
    />
  </div>
</template>

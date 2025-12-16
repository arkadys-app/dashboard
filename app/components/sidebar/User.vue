<script setup lang="ts">
const { user, signOut } = useAuth()
</script>

<template>
  <UiDropdownMenu
    :items="[
      {
        label: 'Paramètres du compte',
        icon: 'hugeicons:user-settings-01',
        href: '/settings/account'
      },
      {
        label: 'Se déconnecter',
        icon: 'hugeicons:logout-01',
        onSelect: () => signOut({ redirectTo: '/logout' })
      }
    ]"
  >
    <UiButton
      variant="ghost"
      class="flex items-center w-full h-fit gap-2 p-2 rounded-lg overflow-hidden data-[state=open]:bg-slate-100"
    >
      <span
        class="flex shrink-0 items-center justify-center rounded-lg border shadow-xs border-slate-300 size-9 bg-white"
      >
        <Icon name="hugeicons:user" class="size-5" />
      </span>
      <div class="flex flex-col items-start overflow-hidden">
        <span class="truncate">
          {{ user?.name }}
        </span>
        <span class="text-xs text-slate-500 truncate">
          {{ user?.email }}
        </span>
      </div>
      <Icon name="hugeicons:more-vertical" class="ml-auto shrink-0" />
    </UiButton>
  </UiDropdownMenu>
</template>

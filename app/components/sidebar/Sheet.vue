<template>
  <DialogRoot>
    <DialogTrigger as-child>
      <slot />
    </DialogTrigger>

    <DialogPortal>
      <DialogOverlay
        class="fixed inset-0 z-50 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:fade-in-0"
      />
      <DialogContent
        class="fixed z-50 gap-4 bg-white shadow-lg inset-y-0 left-0 h-full w-(--sidebar-width) border-r border-slate-300 data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500"
      >
        <VisuallyHidden>
          <DialogTitle>Sidebar</DialogTitle>
          <DialogDescription>Displays the mobile sidebar.</DialogDescription>
        </VisuallyHidden>
        <header class="flex items-center h-(--header-height)">
          <div class="flex items-center w-full px-4">
            <NuxtLink to="/" class="inline-flex">
              <Icon name="arkadys:logo" class="w-24 h-6" />
            </NuxtLink>
          </div>
        </header>
        <div class="flex flex-col gap-1 w-full p-4">
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
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

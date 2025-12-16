<script setup lang="ts">
import { createReusableTemplate } from '@vueuse/core'

const isMobile = useMediaQuery('(max-width: 768px)')

const open = ref(true)
const route = useRoute()
const title = computed(() => route.meta.title || 'Tableau de bord')

const [DefineTemplate, ReuseTemplate] = createReusableTemplate()
</script>

<template>
  <DefineTemplate>
    <UiButton variant="ghost" class="w-8 -ml-2">
      <Icon name="hugeicons:layout-left" class="size-4 text-slate-500" />
    </UiButton>
  </DefineTemplate>
  <div class="flex min-h-svh w-full bg-slate-50">
    <Sidebar v-model:open="open" />
    <main class="w-full">
      <div class="@container/main flex flex-1 flex-col">
        <header
          class="flex h-(--header-height) border-b items-center border-b-slate-300 bg-white"
        >
          <div class="flex w-full items-center px-4 lg:px-6 gap-2">
            <ClientOnly>
              <SidebarSheet v-if="isMobile">
                <ReuseTemplate />
              </SidebarSheet>
              <UiTooltip
                v-else
                :text="open ? 'Cacher le menu' : 'Afficher le menu'"
                :content="{ side: open ? 'bottom' : 'right' }"
              >
                <ReuseTemplate @click="open = !open" />
              </UiTooltip>
              <template #fallback>
                <ReuseTemplate />
              </template>
            </ClientOnly>
            <UiSeparator orientation="vertical" class="h-6 mx-1 lg:mx-2" />
            <h1 class="font-semibold mx-1">
              {{ title }}
            </h1>
            <ChildSwitcher />
          </div>
        </header>
        <slot />
      </div>
    </main>
  </div>
</template>

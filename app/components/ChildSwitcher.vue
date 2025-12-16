<script setup lang="ts">
const { children, currentChild, setCurrentChild } = useChild()

const isDesktop = useMediaQuery('(min-width: 768px)')

const NuxtLink = resolveComponent('NuxtLink')

const availableChildren = computed(() => {
  return (
    children?.value?.filter((child) => child.id !== currentChild.value?.id) ||
    []
  )
})
</script>

<template>
  <div class="flex items-center gap-4 ml-auto">
    <ClientOnly>
      <div v-if="children?.length" class="flex flex-col">
        <span class="text-sm font-medium leading-none">
          {{ currentChild?.firstname }}
        </span>
        <span class="text-xs font-medium text-slate-500">
          {{ currentChild ? getAge(currentChild?.birthdate) : '0' }} ans
        </span>
      </div>
      <UiButton
        v-else
        :as="NuxtLink"
        to="/new-child"
        variant="outline"
        icon="hugeicons:user-add-01"
      >
        Ajouter un enfant
      </UiButton>
    </ClientOnly>
    <ClientOnly v-if="children?.length">
      <UiDropdownMenu
        v-if="isDesktop"
        :items="[
          {
            label: 'Ajouter un enfant',
            icon: 'hugeicons:user-add-01',
            href: '/new-child'
          }
        ]"
        :content="{ align: 'end' }"
      >
        <UiButton variant="outline" class="w-8">
          <Icon name="hugeicons:user-switch" class="text-slate-500" />
        </UiButton>

        <template #content>
          <DropdownMenuGroup v-if="availableChildren.length">
            <DropdownMenuLabel class="text-xs font-medium text-slate-500 p-2">
              Changer l'enfant
            </DropdownMenuLabel>
            <DropdownMenuItem
              v-for="child in availableChildren"
              :key="child.id"
              class="flex items-center gap-2 text-sm font-medium h-7 px-2 rounded-md cursor-pointer select-none data-[highlighted]:bg-slate-100 outline-none"
              @select="setCurrentChild(child.id)"
            >
              <Icon name="hugeicons:child" class="text-slate-500" />
              {{ child.firstname }}
              <span class="ml-auto text-xs text-slate-500">
                {{ getAge(child.birthdate) }} ans
              </span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator
            v-if="availableChildren.length"
            class="border-t border-slate-300 -mx-1 my-1"
          />
          <DropdownMenuItem
            :as="NuxtLink"
            to="/new-child"
            class="flex items-center text-sm font-medium h-7 px-2 rounded-md select-none data-[highlighted]:bg-slate-100 transition-colors outline-none"
          >
            <Icon name="hugeicons:user-add-01" class="text-slate-500 mr-2" />
            Ajouter un enfant
          </DropdownMenuItem>
        </template>
      </UiDropdownMenu>
      <UiDrawer v-else>
        <UiButton variant="outline" class="w-8">
          <Icon name="hugeicons:user-switch" class="text-slate-500" />
        </UiButton>

        <template v-if="availableChildren.length" #content>
          <span class="font-medium text-sm text-slate-500">
            Changer d'enfant
          </span>
          <div class="flex flex-col gap-2">
            <UiButton
              v-for="child in availableChildren"
              variant="ghost"
              icon="hugeicons:child"
              class="justify-start"
            >
              <div class="flex flex-1 justify-between items-center font-medium">
                {{ child.firstname }}
                <span class="text-xs text-slate-500">
                  {{ getAge(child.birthdate) }} ans
                </span>
              </div>
            </UiButton>
          </div>
          <UiButton
            :as="NuxtLink"
            to="/new-child"
            variant="outline"
            icon="hugeicons:user-add-01"
          >
            Ajouter un enfant
          </UiButton>
        </template>
        <template #content>
          <UiButton
            :as="NuxtLink"
            to="/new-child"
            variant="outline"
            icon="hugeicons:user-add-01"
          >
            Ajouter un enfant
          </UiButton>
        </template>
      </UiDrawer>
    </ClientOnly>
  </div>
</template>

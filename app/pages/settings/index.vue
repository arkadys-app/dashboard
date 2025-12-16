<script setup lang="ts">
const { setCurrentChild, children } = useChild()

const NuxtLink = resolveComponent('NuxtLink')
</script>

<template>
  <div class="flex flex-col gap-6 px-4 py-6 xl:px-6">
    <UiCard class="relative gap-0 py-0 w-full max-w-2xl mx-auto">
      <div class="font-medium px-6 py-4 border-b border-b-slate-300">
        Gestion des enfants
      </div>
      <template v-if="children?.length">
        <ul class="flex flex-col gap-4 px-6 py-4">
          <li
            v-for="child in children"
            :key="child.id"
            class="flex items-center justify-between"
          >
            <div class="flex items-center gap-2">
              <Icon name="hugeicons:child" class="text-slate-500" />
              <span class="text-sm font-medium">
                {{ child.firstname }}
              </span>
              <span class="text-xs font-medium text-slate-500">
                {{ getAge(child.birthdate) }} ans
              </span>
            </div>
            <ul class="flex gap-2">
              <li>
                <EditChild :child="child" />
              </li>
              <li>
                <UiTooltip text="Changer d'enfant actif">
                  <UiButton
                    variant="ghost"
                    icon="hugeicons:user-switch"
                    class="size-6"
                    @click="setCurrentChild(child.id)"
                  />
                </UiTooltip>
              </li>
            </ul>
          </li>
        </ul>
        <div class="flex px-6 py-4 border-t border-t-slate-300">
          <UiButton
            :as="NuxtLink"
            to="/new-child"
            type="submit"
            variant="outline"
            class="text-xs h-7 px-2.5 ml-auto"
          >
            Ajouter un enfant
          </UiButton>
        </div>
      </template>
      <div v-else class="flex flex-col items-center p-6">
        <Icon name="hugeicons:child" class="size-6 text-slate-500" />
        <div class="text-sm font-medium text-slate-500 mt-4">
          Vous n'avez pas encore ajouté d'enfant.
        </div>
        <div class="mt-4">
          <UiButton
            :as="NuxtLink"
            to="/new-child"
            type="submit"
            variant="outline"
            class="text-xs h-7 px-2.5"
          >
            Ajouter un enfant
          </UiButton>
        </div>
      </div>
    </UiCard>
    <UiCard class="relative gap-0 py-0 w-full max-w-2xl mx-auto">
      <div class="font-medium px-6 py-4 border-b border-b-slate-300">
        Zone de danger
      </div>
      <div class="px-4 py-4">
        <DeleteChild />
      </div>
    </UiCard>
  </div>
</template>

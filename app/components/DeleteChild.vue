<script setup lang="ts">
const { children, fetchChildren } = useChild()
const { add } = useToast()

const modalOpen = ref(false)
const selectedChild = ref<string | undefined>(undefined)

async function deleteChild(id: string) {
  try {
    await $fetch(`/api/children/${id}`, { method: 'delete' })

    modalOpen.value = false
    add({
      title: 'Enfant retiré',
      description: "L'enfant a été retiré avec succès de la plateforme."
    })
    await fetchChildren()
  } catch (err: any) {
    add({
      variant: 'destructive',
      title: "Erreur lors du retrait de l'enfant",
      description: err.data.message
    })
  }
}
</script>

<template>
  <div class="flex gap-2 p-2 rounded-lg border border-rose-300 bg-rose-100">
    <span
      class="shrink-0 flex items-center justify-center size-5 bg-rose-500 rounded"
    >
      <Icon name="tabler:alert-triangle-filled" class="text-white size-3" />
    </span>
    <div class="flex flex-col gap-2">
      <div class="text-sm font-medium">Retrait d'un enfant</div>
      <p class="text-sm text-slate-500">
        Retirer définitivement un enfant et toutes ses données de la plateforme
        Arkadys. Cette action est irréversible. Veuillez procéder avec prudence.
      </p>
      <UiModal v-model:open="modalOpen" title="Retirer un enfant">
        <UiButton
          variant="destructive"
          class="text-xs h-7 px-2.5 ml-auto"
          :disabled="!children?.length"
          @click="selectedChild = undefined"
        >
          Retirer un enfant
        </UiButton>

        <template #body>
          <div class="px-6 py-4">
            <UiRadioGroup
              v-model="selectedChild"
              legend="Choisissez l'enfant que vous souhaitez retirer de la plateforme. "
              required
              :items="
                children?.map((child) => {
                  return {
                    value: child.id,
                    label: child.firstname,
                    description: `${getAge(child.birthdate)} ans`
                  }
                })
              "
            />
          </div>
        </template>
        <template #footer="{ close }">
          <div class="flex gap-2 px-6 py-4">
            <UiButton
              variant="ghost"
              label="Annuler"
              @click="close"
              class="ml-auto"
            />
            <UiButton
              type="submit"
              variant="destructive"
              loading-auto
              :disabled="!selectedChild"
              @click="deleteChild(selectedChild!)"
            >
              Retirer l'enfant sélectionné
            </UiButton>
          </div>
        </template>
      </UiModal>
    </div>
  </div>
</template>

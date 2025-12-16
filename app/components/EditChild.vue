<script setup lang="ts">
import { getLocalTimeZone, today } from '@internationalized/date'
import { ChildSchemaClient } from '#shared/utils/validation'
import { z } from 'zod'

const { fetchChildren } = useChild()
const { add } = useToast()

const props = defineProps<{ child: Children[number] }>()

type Schema = z.output<typeof ChildSchemaClient>

const state = shallowReactive<Partial<Schema>>({
  firstname: props.child.firstname,
  birthdate: toCalendarDate(props.child.birthdate)
})

function resetState() {
  state.firstname = props.child.firstname
  state.birthdate = toCalendarDate(props.child.birthdate)
}

const modalOpen = ref(false)
const loading = ref(false)

const isModified = computed(() => {
  return (
    state.firstname !== props.child.firstname ||
    state.birthdate?.toString() !==
      toCalendarDate(props.child.birthdate).toString()
  )
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  loading.value = true

  try {
    await $fetch(`/api/children/${props.child.id}`, {
      method: 'put',
      body: {
        firstname: event.data.firstname,
        birthdate: event.data.birthdate.toDate(getLocalTimeZone())
      }
    })

    await fetchChildren()
    add({
      title: 'Enfant modifié',
      description: "Les informations de l'enfant ont été modifiées avec succès."
    })
    modalOpen.value = false
  } catch (err: any) {
    add({
      variant: 'destructive',
      title: "Erreur lors de la modification de l'enfant",
      description: err.data.message
    })
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <UiModal
    v-model:open="modalOpen"
    :title="`Modifier les informations de ${props.child.firstname}`"
  >
    <UiButton
      variant="ghost"
      icon="hugeicons:edit-03"
      class="size-6"
      @click="resetState"
    />

    <template #body="{ close }">
      <UiForm
        class="py-4"
        :schema="ChildSchemaClient"
        :state="state"
        @submit.prevent="onSubmit"
      >
        <div class="flex flex-col gap-2">
          <UiFormField label="Prénom" name="firstname" class="px-6">
            <UiInput v-model="state.firstname" class="w-full" />
          </UiFormField>
          <UiFormField label="Date de naissance" name="birthdate" class="px-6">
            <UiDatePicker
              v-model="state.birthdate"
              :is-date-unavailable="
                (d) => d.compare(today(getLocalTimeZone())) > 0
              "
            />
          </UiFormField>
        </div>
        <div class="flex gap-2 px-6 border-t border-t-slate-300 pt-4 mt-4">
          <UiButton
            variant="ghost"
            label="Annuler"
            class="ml-auto"
            @click="close"
          />
          <UiButton type="submit" :loading="loading" :disabled="!isModified">
            Modifier les informations
          </UiButton>
        </div>
      </UiForm>
    </template>
  </UiModal>
</template>

<script setup lang="ts">
import { getLocalTimeZone, today } from '@internationalized/date'
import { ChildSchemaClient } from '#shared/utils/validation'
import { z } from 'zod'

const NuxtLink = resolveComponent('NuxtLink')

const { add } = useToast()
const keys = useMagicKeys()
const router = useRouter()

whenever(
  () => keys.escape?.value,
  () => {
    router.push('/')
  }
)

definePageMeta({
  title: 'Ajouter un enfant',
  layout: false
})

type Schema = z.output<typeof ChildSchemaClient>

const state = shallowReactive<Partial<Schema>>({
  firstname: undefined,
  birthdate: undefined
})

const loading = ref(false)

async function onSubmit(event: FormSubmitEvent<Schema>) {
  loading.value = true

  try {
    await $fetch('/api/children', {
      method: 'post',
      body: {
        firstname: event.data.firstname,
        birthdate: event.data.birthdate.toDate(getLocalTimeZone())
      }
    })

    add({
      title: 'Enfant ajouté',
      description: "L'enfant a été ajouté avec succès à la plateforme."
    })
    await navigateTo('/settings')
  } catch (err: any) {
    add({
      variant: 'destructive',
      title: "Erreur lors de l'ajout de l'enfant",
      description: err.data.message
    })
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="relative">
    <header class="absolute top-0 inset-x-0 px-4 lg:px-6 py-6">
      <UiTooltip text="Retour au tableau de bord" :kbds="['Esc']">
        <UiButton
          :as="NuxtLink"
          variant="ghost"
          icon="hugeicons:arrow-turn-backward"
          to="/"
          class="has-[>svg]:pl-2 hover:bg-slate-100 text-slate-500 hover:text-slate-800 hover:[&>svg]:text-slate-800"
        >
          Retour au tableau de bord
        </UiButton>
      </UiTooltip>
    </header>
    <div
      class="flex flex-col flex-1 items-center justify-center min-h-screen gap-6 py-12 px-4 lg:px-6 shrink-0 bg-slate-50"
    >
      <h2 class="text-center text-2xl font-semibold">
        Ajouter un nouvel enfant
      </h2>
      <p class="text-center text-slate-500 font-medium">
        Commencez à suivre les progrès d'un nouvel enfant.
      </p>
      <UiForm
        :schema="ChildSchemaClient"
        :state="state"
        @submit.prevent="onSubmit"
        class="flex flex-col items-center gap-6 w-full max-w-lg"
      >
        <UiCard class="bg-white w-full divide-slate-300">
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
          <div class="px-6">
            <UiButton type="submit" class="w-full" :loading="loading">
              Ajouter un enfant
            </UiButton>
          </div>
        </UiCard>
      </UiForm>
    </div>
  </div>
</template>

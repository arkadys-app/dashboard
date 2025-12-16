<script setup lang="ts">
import { z } from 'zod'

const { client } = useAuth()
const { add } = useToast()

type Schema = z.output<typeof DeleteAccountSchema>

const state = reactive<Partial<Schema>>({
  confirmation: '',
  password: ''
})

const loading = ref(false)

async function onSubmit(event: FormSubmitEvent<Schema>) {
  loading.value = true
  const { error } = await client.deleteUser({ password: event.data.password })

  if (error) {
    add({
      variant: 'destructive',
      title: 'Erreur de suppression du compte',
      description: getErrorMessage(error.code)
    })
  } else {
    add({
      title: 'Compte supprimé',
      description: 'Votre compte a été supprimé avec succès.'
    })
    await navigateTo('/login')
  }

  loading.value = false
}

function resetState() {
  state.confirmation = ''
  state.password = ''
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
      <div class="text-sm font-medium">Supression du compte</div>
      <p class="text-sm text-slate-500">
        Supprimer définitivement votre compte et tout son contenu de la
        plateforme Arkadys. Cette action est irréversible, veuillez donc
        procéder avec prudence.
      </p>
      <UiModal title="Supprimer le compte">
        <UiButton
          variant="destructive"
          class="text-xs h-7 px-2.5 ml-auto"
          @click="resetState"
        >
          Supprimer le compte
        </UiButton>

        <template #body="{ close }">
          <UiForm
            v-slot="{ errors }"
            :schema="DeleteAccountSchema"
            :state="state"
            @submit.prevent="onSubmit"
          >
            <div class="flex flex-col gap-4 px-6 py-4">
              <p class="text-sm text-slate-500">
                Êtes-vous sûr de vouloir supprimer votre compte ? Cette action
                est irréversible et entraînera la perte de toutes vos données.
              </p>
              <UiFormField
                name="confirmation"
                label='Pour confirmer, veuillez saisir "Supprimer" :'
              >
                <UiInput
                  v-model="state.confirmation"
                  type="text"
                  class="w-full"
                  required
                />
              </UiFormField>
              <UiFormField name="password" label="Mot de passe">
                <UiInput
                  v-model="state.password"
                  type="password"
                  class="w-full"
                  toggle-visibility
                  required
                />
              </UiFormField>
            </div>
            <div class="flex gap-2 px-6 py-4 border-t border-slate-300">
              <UiButton
                variant="ghost"
                label="Annuler"
                @click="close"
                class="ml-auto"
              />
              <UiButton
                type="submit"
                variant="destructive"
                :loading="loading"
                :disabled="errors.length > 0"
              >
                Supprimer mon compte
              </UiButton>
            </div>
          </UiForm>
        </template>
      </UiModal>
    </div>
  </div>
</template>

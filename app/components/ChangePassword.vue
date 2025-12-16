<script setup lang="ts">
import { z } from 'zod'

const { client } = useAuth()
const { add } = useToast()

const props = defineProps<{
  refresh: () => Promise<void>
}>()

type Schema = z.output<typeof ChangePasswordSchema>

const state = reactive<Partial<Schema>>({
  oldPassword: undefined,
  newPassword: undefined,
  confirmNewPassword: undefined,
  revokeOtherSessions: undefined
})

const modalOpen = ref(false)
const loading = ref(false)

async function onSubmit(event: FormSubmitEvent<Schema>) {
  loading.value = true
  const { error } = await client.changePassword({
    currentPassword: event.data.oldPassword,
    newPassword: event.data.newPassword,
    revokeOtherSessions: event.data.revokeOtherSessions
  })

  if (error) {
    add({
      variant: 'destructive',
      title: 'Erreur de mise à jour du mot de passe',
      description: getErrorMessage(error.code)
    })
  } else {
    await props.refresh()
    add({
      title: 'Mot de passe mis à jour',
      description: 'Votre mot de passe a été mis à jour avec succès.'
    })

    modalOpen.value = false
  }

  loading.value = false
}

function resetState() {
  state.oldPassword = undefined
  state.newPassword = undefined
  state.confirmNewPassword = undefined
  state.revokeOtherSessions = undefined
}
</script>

<template>
  <div class="flex items-center justify-between px-6 h-[46px]">
    <label for="email" class="text-sm font-medium text-slate-500">
      Mot de passe
    </label>
    <div class="flex items-center gap-2 text-sm font-medium">
      <UiModal v-model:open="modalOpen" title="Modifier le mot de passe">
        <UiButton
          variant="outline"
          class="justify-start w-56"
          label="●●●●●●●●"
          @click="resetState"
        />

        <template #body="{ close }">
          <UiForm
            :schema="ChangePasswordSchema"
            :state="state"
            class="flex flex-col"
            @submit.prevent="onSubmit"
          >
            <div class="flex flex-col gap-2 px-6 py-4">
              <UiFormField name="oldPassword" label="Mot de passe actuel">
                <UiInput
                  v-model="state.oldPassword"
                  type="password"
                  required
                  class="w-full"
                />
              </UiFormField>
              <UiFormField name="newPassword" label="Nouveau mot de passe">
                <UiInput
                  v-model="state.newPassword"
                  type="password"
                  required
                  class="w-full"
                />
              </UiFormField>
              <UiFormField
                name="confirmNewPassword"
                label="Confirmation du nouveau mot de passe"
              >
                <UiInput
                  v-model="state.confirmNewPassword"
                  type="password"
                  required
                  class="w-full"
                />
              </UiFormField>
              <UiFormField>
                <UiCheckbox
                  v-model="state.revokeOtherSessions"
                  label="Révoquer les autres sessions"
                />
              </UiFormField>
            </div>
            <div class="flex gap-2 border-t border-slate-300 px-6 py-4">
              <UiButton
                variant="ghost"
                label="Annuler"
                class="ml-auto"
                @click="close"
              />
              <UiButton
                variant="primary"
                type="submit"
                label="Mettre à jour le mot de passe"
                :loading="loading"
              />
            </div>
          </UiForm>
        </template>
      </UiModal>
    </div>
  </div>
</template>

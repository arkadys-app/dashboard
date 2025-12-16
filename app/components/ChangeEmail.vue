<script setup lang="ts">
const { user } = useAuth()
const { add } = useToast()

const newEmail = ref('')

const sendLink = async () => {
  add({
    variant: 'secondary',
    title: 'Prochainement',
    description: 'Cette fonctionnalité sera disponible prochainement.'
  })
}
</script>

<template>
  <div class="flex items-center justify-between px-6 mt-2 h-[46px]">
    <label for="email" class="text-sm font-medium text-slate-500">
      Adresse e-mail
    </label>
    <div class="flex items-center gap-2 text-sm font-medium">
      {{ user?.email }}
      <UiModal title="Modifier l'adresse e-mail">
        <UiButton variant="ghost" icon="hugeicons:edit-03" class="size-6" />

        <template #body>
          <div class="px-6 py-4">
            <p class="text-sm text-slate-500">
              Si vous souhaitez modifier l'adresse e-mail de votre compte, nous
              vous enverrons un lien de vérification à votre nouvelle adresse
              e-mail.
            </p>
            <div class="flex flex-col gap-2 mt-4">
              <label for="new-email" class="block text-sm font-medium">
                Nouvelle adresse e-mail
              </label>
              <UiInput
                id="new-email"
                type="email"
                class="w-full"
                v-model="newEmail"
              />
            </div>
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
            <UiButton type="submit" @click="sendLink">
              Envoyer le lien de vérification
            </UiButton>
          </div>
        </template>
      </UiModal>
    </div>
  </div>
</template>

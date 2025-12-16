<script setup lang="ts">
import { z } from 'zod'

const { client, user, session: currentSession, fetchSession } = useAuth()
const { add } = useToast()

type Schema = z.output<typeof EditUserSchema>

const state = reactive<Partial<Schema>>({
  firstname: user.value?.firstname,
  lastname: user.value?.lastname
})

const { data: sessions, refresh: _refresh } = await useAsyncData(
  'sessions',
  () => client.listSessions()
)

const otherSessions = computed(() => {
  return (
    sessions.value?.data?.filter((s) => s.id !== currentSession.value?.id) || []
  )
})

const isModified = computed(() => {
  return (
    state.firstname !== user.value?.firstname ||
    state.lastname !== user.value?.lastname
  )
})

const loading = ref(false)
const revokeLoading = ref(false)

async function onSubmit(event: FormSubmitEvent<Schema>) {
  loading.value = true
  await client.updateUser({
    name: `${event.data.firstname} ${event.data.lastname}`,
    firstname: event.data.firstname,
    lastname: event.data.lastname
  })
  await fetchSession()
  add({
    title: 'Profil mis à jour',
    description: 'Vos informations ont été mises à jour avec succès.'
  })

  loading.value = false
}

async function revokeOtherSessions() {
  revokeLoading.value = true
  const { error } = await client.revokeOtherSessions()

  if (error) {
    add({
      variant: 'destructive',
      title: 'Erreur de révocation des sessions',
      description: getErrorMessage(error.code)
    })
  } else {
    await refresh()
    add({
      title: 'Sessions révoquées',
      description: 'Toutes les autres sessions ont été révoquées avec succès.'
    })
  }
}

async function refresh() {
  await _refresh()
  await fetchSession()
}
</script>

<template>
  <div class="flex flex-col gap-6 px-4 py-6 xl:px-6">
    <UiCard class="relative gap-0 py-0 w-full max-w-2xl mx-auto">
      <div class="font-medium px-6 py-4 border-b border-b-slate-300">
        Informations du compte
      </div>
      <ChangeEmail />
      <ChangePassword :refresh="refresh" />
      <UiForm
        :schema="EditUserSchema"
        :state="state"
        @submit.prevent="onSubmit"
      >
        <UiFormField
          label="Prénom"
          name="firstname"
          class="flex justify-between px-6 [&_label]:text-slate-500"
        >
          <UiInput
            v-model.trim="state.firstname"
            :placeholder="user?.firstname"
            type="text"
            class="w-56"
          />
        </UiFormField>
        <UiFormField
          label="Nom de famille"
          name="lastname"
          class="flex justify-between px-6 [&_label]:text-slate-500"
        >
          <UiInput
            v-model.trim="state.lastname"
            :placeholder="user?.lastname"
            type="text"
            class="w-56"
          />
        </UiFormField>
        <div class="flex px-6 py-4 border-t border-t-slate-300 mt-2">
          <UiButton
            type="submit"
            label="Enregistrer les modifications"
            class="text-xs h-7 px-2.5 ml-auto"
            :disabled="!isModified"
            :loading="loading"
          />
        </div>
      </UiForm>
    </UiCard>
    <UiCard class="relative gap-0 pt-0 pb-2 w-full max-w-2xl mx-auto">
      <div
        class="flex items-center justify-between font-medium px-6 py-4 border-b border-b-slate-300"
      >
        Sessions
        <UiButton
          v-if="otherSessions.length > 0"
          variant="outline"
          label="Révoquer les autres sessions"
          class="text-xs h-7 px-2.5"
          :loading="revokeLoading"
          @click="revokeOtherSessions"
        />
      </div>
      <ul class="flex flex-col gap-4 px-6 py-2 mt-2">
        <SessionItem
          v-if="currentSession"
          :key="currentSession.id"
          :session="currentSession"
          :is-current="true"
        />
        <SessionItem
          v-for="session in otherSessions"
          :key="session.id"
          :session="session"
          @revoked="refresh"
        />
      </ul>
    </UiCard>
    <UiCard class="relative gap-0 py-0 w-full max-w-2xl mx-auto">
      <div class="font-medium px-6 py-4 border-b border-b-slate-300">
        Zone de danger
      </div>
      <div class="p-4">
        <DeleteAccount />
      </div>
    </UiCard>
  </div>
</template>

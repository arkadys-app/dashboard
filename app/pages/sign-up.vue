<script setup lang="ts">
import { z } from 'zod'

definePageMeta({
  layout: false,
  auth: {
    only: 'guest',
    redirectUserTo: '/',
    redirectGuestTo: '/sign-up'
  }
})

const { signUp } = useAuth()
const { add } = useToast()

type Schema = z.output<typeof SignUpSchema>

const state = reactive<Partial<Schema>>({
  email: undefined,
  password: undefined
})

const show = ref(false)
const loading = ref(false)

async function onSubmit(event: FormSubmitEvent<Schema>) {
  loading.value = true
  const { error } = await signUp.email({
    email: event.data.email,
    password: event.data.password,
    name: `${event.data.firstname} ${event.data.lastname}`,
    firstname: event.data.firstname,
    lastname: event.data.lastname
  })

  if (error) {
    add({
      variant: 'destructive',
      title: "Erreur d'inscription",
      description: getErrorMessage(error.code)
    })
    loading.value = false
    return
  }

  loading.value = false
  await navigateTo('/')
}
</script>

<template>
  <div class="relative flex gap-6 p-6 min-h-screen">
    <div class="flex-1 flex">
      <div class="flex flex-col gap-6 m-auto w-full max-w-96">
        <h2 class="text-center text-2xl font-medium">Créer un compte</h2>
        <p class="text-center text-sm font-medium text-slate-500">
          Entrez vos informations personnelles pour créer un compte.
        </p>
        <UiForm
          :schema="SignUpSchema"
          :state="state"
          class="flex flex-col gap-4 mx-auto w-full"
          @submit="onSubmit"
        >
          <div class="flex gap-4">
            <UiFormField name="firstname" label="Prénom">
              <UiInput
                v-model.trim="state.firstname"
                type="text"
                placeholder="Jean"
                class="w-full"
              />
            </UiFormField>
            <UiFormField name="lastname" label="Nom">
              <UiInput
                v-model.trim="state.lastname"
                type="text"
                placeholder="Dupont"
                class="w-full"
              />
            </UiFormField>
          </div>
          <UiFormField name="email" label="Adresse e-mail">
            <UiInput
              v-model.trim="state.email"
              type="email"
              placeholder="you@example.com"
              class="w-full"
            />
          </UiFormField>
          <UiFormField name="password" label="Mot de passe">
            <UiInput
              v-model="state.password"
              type="password"
              placeholder="●●●●●●●●"
              toggle-visibility
              class="w-full"
            />
          </UiFormField>
          <UiButton type="submit" :loading="loading">S'inscrire</UiButton>
        </UiForm>
        <div class="text-center text-xs text-slate-500 font-medium">
          Vous avez déjà un compte ?
          <UiLink to="/login" class="text-teal-500">Connectez-vous</UiLink>.
        </div>
      </div>
    </div>
    <div class="flex-1 relative">
      <NuxtImg
        src="/images/sign-up.jpeg"
        class="absolute inset-0 w-full h-full object-cover rounded-xl"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { z } from 'zod'

definePageMeta({
  layout: false,
  auth: {
    only: 'guest',
    redirectUserTo: '/'
  }
})

const { signIn } = useAuth()
const { add } = useToast()

type Schema = z.output<typeof LoginSchema>

const state = reactive<Partial<Schema>>({
  email: undefined,
  password: undefined
})

const loading = ref(false)

async function onSubmit(event: FormSubmitEvent<Schema>) {
  loading.value = true
  const { error } = await signIn.email({
    email: event.data.email,
    password: event.data.password,
    callbackURL: '/'
  })

  if (error) {
    add({
      variant: 'destructive',
      title: 'Erreur de connexion',
      description: getErrorMessage(error.code)
    })
  }

  loading.value = false
}
</script>

<template>
  <div class="flex gap-6 p-6 min-h-screen">
    <div class="relative flex-1 flex">
      <div class="flex flex-col gap-6 m-auto w-full max-w-sm">
        <h2 class="text-center text-2xl font-medium">Bon retour parmis nous</h2>
        <p class="text-center text-sm font-medium text-slate-500">
          Entrez vos identifiants pour accéder à votre compte.
        </p>
        <UiForm
          :schema="LoginSchema"
          :state="state"
          class="flex flex-col gap-4 mx-auto w-full"
          @submit="onSubmit"
        >
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
          <UiButton type="submit" :loading="loading">Se connecter</UiButton>
        </UiForm>
        <div class="text-center text-xs text-slate-500 font-medium">
          Vous n'avez pas encore de compte ?
          <UiLink to="/sign-up" class="text-teal-500">Inscrivez-vous</UiLink>.
        </div>
      </div>
    </div>
    <div class="flex-1 relative">
      <NuxtImg
        src="/images/login.jpeg"
        class="absolute inset-0 w-full h-full object-cover rounded-xl"
      />
    </div>
  </div>
</template>

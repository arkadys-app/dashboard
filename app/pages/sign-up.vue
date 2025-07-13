<script setup lang="ts">
definePageMeta({
  layout: false
})

const supabase = useSupabaseClient()
const user = useSupabaseUser()

watchEffect(() => {
  if (user.value) {
    return navigateTo('/')
  }
})

const form = useForm({
  validationSchema: toTypedSchema(SignUpSchema),
  initialValues: {
    firstname: '',
    lastname: '',
    email: '',
    password: ''
  }
})

const onSubmit = form.handleSubmit(async (values) => {
  const { error } = await supabase.auth.signUp({
    email: values.email,
    password: values.password,
    options: {
      data: {
        firstname: values.firstname,
        lastname: values.lastname
      }
    }
  })
})
</script>

<template>
  <div class="h-screen p-4 grid grid-cols-1 lg:grid-cols-2">
    <div class="relative flex items-center justify-center h-full">
      <NuxtLink>
        <NuxtImg src="/logo.png" width="144" class="absolute top-4 left-4" />
      </NuxtLink>
      <form
        @submit.prevent="onSubmit"
        class="flex flex-col gap-4 max-w-sm mx-auto"
      >
        <div>
          <h1
            class="text-center text-3xl font-semibold tracking-tight text-teal-800"
          >
            Créer un Compte
          </h1>
          <p class="text-center text-sm text-gray-600 mt-6 mb-2">
            Rejoignez-nous maintenant pour pouvoir suivre la progression de vos
            enfants.
          </p>
        </div>
        <div class="flex gap-4">
          <FormField
            name="firstname"
            type="text"
            label="Prénom"
            placeholder="Jean"
          />
          <FormField
            name="lastname"
            type="text"
            label="Nom de famille"
            placeholder="Claude"
          />
        </div>
        <FormField
          name="email"
          type="email"
          label="Adresse e-mail"
          placeholder="toi@exemple.com"
        />
        <FormField
          name="password"
          type="password"
          label="Mot de passe"
          placeholder="●●●●●●●●"
        />
        <UiButton type="submit" variant="primary" class="w-full">
          S'inscrire
        </UiButton>
        <p class="text-center text-xs text-gray-600">
          Vous avez déjà un compte ?
          <NuxtLink
            to="/login"
            class="font-medium text-teal-500 hover:underline"
            >Connectez-vous.</NuxtLink
          >
        </p>
      </form>
    </div>
    <div class="hidden lg:block bg-teal-400 rounded-xl"></div>
  </div>
</template>

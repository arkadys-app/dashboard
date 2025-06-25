<script setup lang="ts">
definePageMeta({
  layout: false
})
</script>

<template>
  <div class="relative h-screen flex">
    <p class="absolute left-4 bottom-4 text-sm text-gray-600">
      © Arkadys 2025
    </p>
    <div class="flex flex-col px-28 py-20">
      <NuxtLink to="/">
        <NuxtImg src="/logo.png" width="144" />
      </NuxtLink>
      <div class="mt-16">
        <form class="min-w-sm max-w-sm">
          <div class="space-y-4">
            <h1 class="text-4xl font-bold">Connexion</h1>
            <p class="text-gray-600">
              Bon retour parmis nous, veuillez saisir vos informations.
            </p>
          </div>
          <div class="flex flex-col gap-y-4 mt-10">
            <UiInput placeholder="Entrez votre e-mail" />
            <UiInput type="password" placeholder="●●●●●●●●" />
            <UiButton>Se connecter</UiButton>
          </div>
        </form>
        <p class="mt-10 text-sm text-gray-600 text-center">
          Vous n'avez pas de compte ?
          <NuxtLink
            to="/register"
            class="font-semibold text-blue-500 hover:text-blue-400 transition-colors"
            >Inscrivez-vous</NuxtLink
          >
        </p>
      </div>
    </div>
    <div class="px-20 py-20 bg-gray-100 flex-1"></div>
  </div>
</template>

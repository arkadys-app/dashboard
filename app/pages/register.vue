<script setup lang="ts">
definePageMeta({
  layout: false
})
</script>

<template>
  <div class="min-h-screen p-6">
    <div class="flex justify-between">
      <NuxtLink to="/" class="text-zinc-500 hover:text-zinc-950">
        <Icon name="ri:close-fill" size="24" />
      </NuxtLink>
      <NuxtLink to="/login">
        <UiButton variant="secondary" class="uppercase">Connexion</UiButton>
      </NuxtLink>
    </div>
    <div class="mt-16">
      <form class="max-w-sm mx-auto">
        <h1 class="text-2xl font-bold text-center">Crée un ton compte</h1>
        <div class="flex flex-col gap-y-6 mt-10">
          <UiInput placeholder="Nom complet" />
          <UiInput placeholder="Adresse e-mail" />
          <UiInput placeholder="Mot de passe" />
          <UiButton class="uppercase">Créer mon compte</UiButton>
        </div>
      </form>
    </div>
    <p
      class="mt-10 mx-auto max-w-sm text-center text-xs font-semibold text-zinc-500"
    >
      En te connectant à Arkadys, tu acceptes nos Conditions d'utilisation et
      notre Politique de confidentialité.
    </p>
  </div>
</template>

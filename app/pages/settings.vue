<script setup lang="ts"></script>

<template>
  <div class="mx-auto max-w-3xl">
    <div class="w-full py-7">
      <h1 class="text-3xl font-bold">Compte</h1>
    </div>
    <div class="flex flex-col gap-y-4">
      <div class="flex flex-col gap-y-2">
        <label for="name" class="font-bold">Nom complet</label>
        <UiInput id="name" />
      </div>
      <div class="flex flex-col gap-y-2">
        <label for="email" class="font-bold">Adresse e-mail</label>
        <UiInput id="email" />
      </div>
      <div class="flex flex-col gap-y-2">
        <label for="password" class="font-bold">Mot de passe</label>
        <UiInput id="password" />
      </div>
      <UiButton class="w-fit uppercase">Enregistrer les modifications</UiButton>
      <UiButton
        variant="link"
        class="w-fit uppercase text-red-500 hover:text-red-400"
      >
        Supprimer mon compte
      </UiButton>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  title: 'Personnalisation'
})

const { data, refresh } = await useFetch(
  `/api/wordlists/${useRoute().params.id}`
)

const NuxtLink = resolveComponent('NuxtLink')
</script>

<template>
  <div class="flex flex-col gap-6 py-6 px-4 lg:px-6">
    <div class="relative flex flex-col gap-6 w-full max-w-2xl mx-auto">
      <UiTooltip text="Retour aux personnalisations">
        <UiButton
          variant="outline"
          icon="hugeicons:arrow-left-02"
          to="/customizations"
          class="absolute top-3 -left-12 size-8"
          :as="NuxtLink"
        />
      </UiTooltip>
      <UiCard class="flex-row justify-between p-4 w-full">
        <h4 class="font-medium">{{ data?.name }}</h4>
        <div class="flex gap-2">
          <UiBadge v-if="data?.isGlobal" variant="success" label="Arkadys" />
          <UiBadge v-else>
            {{ data?.user?.firstname }} {{ data?.user?.lastname }}
          </UiBadge>
          <WordlistActions v-if="data" :data="data" :refresh="refresh" />
        </div>
      </UiCard>
      <UiCard v-if="data?.description" class="p-4 gap-4 w-full">
        <p class="text-sm font-medium">Description</p>
        <p class="text-sm font-medium text-slate-500">{{ data.description }}</p>
      </UiCard>
      <UiCard class="p-4 gap-4 w-full">
        <p class="text-sm font-medium">Jeu associé</p>
        <UiLink
          :to="`/games/${data?.game.slug}`"
          class="inline-flex gap-2 w-fit text-sm"
        >
          <span
            class="flex items-center justify-center size-5 rounded-md border border-slate-300 shadow-xs"
          >
            <Icon name="hugeicons:game-controller-03" class="size-3" />
          </span>
          {{ data?.game.name }}
        </UiLink>
      </UiCard>
      <UiCard class="p-4 gap-4 w-full">
        <div class="flex items-baseline gap-2">
          <p class="text-sm font-medium">Liste de mots</p>
          <p class="text-xs font-medium text-slate-500">
            {{ data?.words.length }} mots
          </p>
        </div>
        <ul class="grid gap-2 grid-cols-6">
          <UiBadge
            v-for="word in data?.words"
            as="li"
            class="block w-full text-sm text-center font-medium text-slate-500 py-1"
            :key="word"
          >
            {{ word }}
          </UiBadge>
        </ul>
      </UiCard>
      <div v-if="data && !data.isGlobal" class="flex justify-between w-full">
        <div class="text-sm font-medium italic text-slate-500">
          Créé le
          <NuxtTime
            day="numeric"
            month="short"
            year="numeric"
            hour="2-digit"
            minute="2-digit"
            :datetime="data.createdAt"
          />
        </div>
        <div
          v-if="data.updatedAt !== data.createdAt && !data.isGlobal"
          class="text-sm font-medium italic text-slate-500"
        >
          Modifié le
          <NuxtTime
            day="numeric"
            month="short"
            year="numeric"
            hour="2-digit"
            minute="2-digit"
            :datetime="data.updatedAt"
          />
        </div>
      </div>
    </div>
  </div>
</template>

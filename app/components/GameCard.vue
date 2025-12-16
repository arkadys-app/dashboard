<script setup lang="ts">
const props = defineProps<{
  title: string
  image: string
  tags?: string[]
  link: string
  favorite?: boolean
}>()
</script>

<template>
  <NuxtLink
    :to="props.link"
    class="focus-visible:ring-4 ring-slate-200 rounded-xl outline-none"
  >
    <UiCard
      as="article"
      class="relative group/game-card rounded-xl gap-0 p-0 h-full bg-white overflow-hidden transition"
    >
      <UiBadge
        v-if="props.favorite"
        class="absolute top-2 right-2 z-10 bg-teal-400 text-white shadow-lg"
      >
        <Icon name="hugeicons:star" class="size-3" />
        Jeu préféré
      </UiBadge>
      <div
        class="relative overflow-hidden aspect-[3/1] w-full pointer-events-none"
      >
        <NuxtImg
          :src="props.image"
          class="object-cover object-top w-full h-full transform transition-transform duration-200 group-hover/game-card:scale-110"
        />
      </div>

      <div class="flex flex-col gap-3 p-4 sm:p-6">
        <h2 class="text-lg font-semibold">{{ props.title }}</h2>
        <div class="flex items-center gap-2">
          <div class="flex gap-1 flex-wrap">
            <UiBadge v-for="tag in props.tags?.slice(0, 3)">{{ tag }}</UiBadge>
            <UiBadge v-if="(props.tags?.length || 0) > 3">
              +{{ (props.tags?.length || 0) - 3 }}
            </UiBadge>
          </div>
        </div>
      </div>
    </UiCard>
  </NuxtLink>
</template>

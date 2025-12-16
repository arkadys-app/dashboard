<script setup lang="ts">
import type { NuxtLinkProps } from '#app'

const props = defineProps<NuxtLinkProps & { class?: any }>()

const delegatedProps = computed(() => {
  const { class: _class, noPrefetch: _noPrefetch, ...rest } = props

  return rest
})
</script>

<template>
  <NuxtLink
    v-bind="delegatedProps"
    :class="
      cn(
        'font-medium hover:underline decoration-1 decoration-slate-500 decoration-dashed',
        props.class
      )
    "
  >
    <slot />
  </NuxtLink>
</template>

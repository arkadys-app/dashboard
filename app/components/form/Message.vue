<script setup lang="ts">
const { formMessageId, error } = useFormField()
</script>

<template>
  <AnimatePresence>
    <Motion
      v-if="!!error"
      as="p"
      role="alert"
      :id="formMessageId"
      :initial="{ opacity: 0, y: -8 }"
      :animate="{ opacity: 1, y: 0 }"
      :exit="{ opacity: 0, y: -8 }"
      :transition="{
        duration: 0.3,
        ease: 'easeInOut'
      }"
      class="text-xs text-red-400/80"
    >
      {{ error }}
    </Motion>
  </AnimatePresence>
</template>

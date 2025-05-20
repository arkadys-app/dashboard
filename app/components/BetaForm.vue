<script setup lang="ts">
import { motion } from 'motion-v'

const isHovered = ref(false)
const email = ref('')
const success = ref(false)

const join = async () => {
  try {
    await $fetch('/api/join-beta', {
      method: 'POST',
      body: { email: email.value }
    })

    success.value = true
    email.value = ''
  } catch {
    console.log('Error while joining the beta')
  }
}
</script>

<template>
  <form
    @submit.prevent="join()"
    class="flex items-center justify-center gap-4 mx-auto"
  >
    <UiInput
      placeholder="Votre adresse e-mail"
      container-class="w-full max-w-sm"
      v-model="email"
    />
    <button
      v-if="success"
      class="flex items-center justify-center relative w-[140px] h-10 bg-emerald-400 text-white rounded-full cursor-pointer overflow-hidden"
    >
      <Icon name="lucide:check" size="16" />
    </button>
    <motion.button
      v-else
      type="submit"
      @submit.prevent="join()"
      @hover-start="() => (isHovered = true)"
      @hover-end="() => (isHovered = false)"
      class="relative w-[140px] h-10 bg-violet-400 text-white rounded-full cursor-pointer overflow-hidden"
    >
      <motion.span
        class="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 whitespace-nowrap font-medium"
        :initial="{ x: 0 }"
        :animate="isHovered ? { x: -10 } : { x: 0 }"
        :transition="{ type: 'tween', duration: 0.3 }"
      >
        Je m'inscris
      </motion.span>

      <motion.span
        class="absolute right-4 top-1/2 -translate-y-1/2 flex items-center"
        :initial="{ opacity: 0, x: 10 }"
        :animate="isHovered ? { opacity: 1, x: 0 } : { opacity: 0, x: 10 }"
        :transition="{ type: 'tween', duration: 0.3 }"
        :style="{ pointerEvents: isHovered ? 'auto' : 'none' }"
      >
        <Icon name="lucide:arrow-right" size="16" />
      </motion.span>
    </motion.button>
  </form>
</template>

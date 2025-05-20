<script setup lang="ts">
import { motion } from 'motion-v'

const isHovered = ref(false)
</script>

<template>
  <div class="w-fit">
    <motion.a
      href="/#join-beta"
      @hover-start="() => (isHovered = true)"
      @hover-end="() => (isHovered = false)"
    >
      <UiShimmerButton
        class="shadow-2xl flex flex-col w-48 h-12 relative"
        shimmer-size="2px"
      >
        <AnimatePresence>
          <motion.span
            v-if="!isHovered"
            :initial="{ opacity: 0, y: -40 }"
            :animate="{ opacity: 1, y: 0 }"
            :exit="{ opacity: 0, y: -40 }"
            class="flex items-center justify-center absolute top-1/2 -translate-y-1/2 inset-0 whitespace-pre-wrap text-center font-medium leading-none tracking-tight text-white text-lg"
          >
            Bientôt disponible
          </motion.span>
          <motion.span
            v-else
            :initial="{ opacity: 0, y: 40 }"
            :animate="{ opacity: 1, y: 0 }"
            :exit="{ opacity: 0, y: 40 }"
            class="flex items-center justify-center absolute top-1/2 -translate-y-1/2 inset-0 whitespace-pre-wrap text-center font-medium leading-none tracking-tight text-white text-lg"
          >
            Rejoindre la bêta
          </motion.span>
        </AnimatePresence>
      </UiShimmerButton>
    </motion.a>
  </div>
</template>

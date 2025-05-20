<template>
  <div class="mx-auto w-full max-w-3xl text-center">
    <div class="relative h-32">
      <div
        class="pointer-events-none absolute left-1/2 top-0 size-[480px] -translate-x-1/2 before:absolute before:inset-0 before:-z-10 before:rounded-full before:bg-gradient-to-b before:from-violet-500/25 before:via-violet-500/5 before:via-25% before:to-violet-500/0 before:to-75%"
      >
        <div
          class="h-32 [mask-image:_linear-gradient(0deg,transparent,var(colors.white)_20%,theme(colors.white))]"
        >
          <div class="absolute inset-0 -z-10 flex h-full flex-col">
            <Icon
              name="bxs:quote-left"
              size="60"
              class="text-violet-300 relative left-1/2 top-11 -translate-x-1/2"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- Text -->
    <div class="mb-8 transition-all delay-300 duration-150 ease-in-out">
      <div ref="testimonialsRef" class="relative flex flex-col">
        <div class="w-full">
          <div
            class="text-2xl font-semibold text-foreground before:content-['\201C'] after:content-['\201D'] dark:text-zinc-100"
          >
            Apprendre en s'amusant, c'est la meilleure façon de progresser.
          </div>
        </div>
      </div>
    </div>
    <div
      class="mt-4 flex w-full items-center justify-center gap-4 pt-12 md:pt-0"
    >
      <div class="flex flex-col items-center gap-1">
        <span class="text-base italic text-zinc-600">L'équipe Arkadys </span>
        <span class="text-sm italic text-zinc-400"
          >Une conviction partagée par tous nos partenaires éducatifs.
        </span>
      </div>
    </div>
  </div>
</template>

<style>
/* Testimonial image transitions */
.testimonial-image-enter-active {
  transition: all 700ms cubic-bezier(0.68, -0.3, 0.32, 1);
}
.testimonial-image-leave-active {
  transition: all 700ms cubic-bezier(0.68, -0.3, 0.32, 1);
}
.testimonial-image-enter-from {
  opacity: 0;
  transform: rotate(-60deg);
}
.testimonial-image-enter-to {
  opacity: 1;
  transform: rotate(0deg);
}
.testimonial-image-leave-from {
  opacity: 1;
  transform: rotate(0deg);
}
.testimonial-image-leave-to {
  opacity: 0;
  transform: rotate(60deg);
}

/* Testimonial text transitions */
.testimonial-text-enter-active {
  transition: all 500ms ease-in-out 200ms;
}
.testimonial-text-leave-active {
  transition: all 300ms ease-out 300ms;
  position: absolute;
}
.testimonial-text-enter-from {
  opacity: 0;
  transform: translateX(-1rem);
}
.testimonial-text-enter-to {
  opacity: 1;
  transform: translateX(0);
}
.testimonial-text-leave-from {
  opacity: 1;
  transform: translateX(0);
}
.testimonial-text-leave-to {
  opacity: 0;
  transform: translateX(1rem);
}
</style>

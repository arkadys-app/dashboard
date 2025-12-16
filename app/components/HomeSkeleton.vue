<template>
  <div class="flex flex-col gap-6 py-6 px-4 lg:px-6">
    <div class="grid gap-4 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <UiSkeleton class="h-36 w-full rounded-xl" />
      <UiSkeleton class="h-36 w-full rounded-xl" />
      <UiSkeleton class="h-36 w-full rounded-xl" />
      <UiSkeleton class="h-36 w-full rounded-xl" />
    </div>
    <UiSkeleton class="h-96 w-full rounded-xl" />
    <div class="flex flex-col gap-4">
      <div class="flex justify-between">
        <UiSkeleton class="h-6 w-32 rounded-lg" />
        <UiSkeleton class="h-6 w-32 rounded-lg" />
      </div>
      <UiSkeleton class="h-96 w-full rounded-xl" />
      <UiSkeleton class="h-8 w-1/2 rounded-lg ml-auto" />
    </div>
  </div>
</template>

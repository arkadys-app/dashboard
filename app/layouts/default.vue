<template>
  <div class="flex min-h-screen">
    <Sidebar />
    <div class="h-screen flex-1 py-4">
      <main class="h-full overflow-auto">
        <slot />
      </main>
    </div>
  </div>
</template>

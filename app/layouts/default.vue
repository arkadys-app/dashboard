<template>
  <div class="flex min-h-screen">
    <Sidebar />
    <div class="flex-1 px-16 py-12">
      <main>
        <slot />
      </main>
    </div>
  </div>
</template>

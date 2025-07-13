<script setup lang="ts">
const { auth } = useSupabaseClient()
const user = useSupabaseUser()

const signOut = async () => {
  const { error } = await auth.signOut()

  navigateTo('/login')
}
</script>

<template>
  <aside class="flex h-screen w-64 flex-col gap-4 py-4 bg-gray-50">
    <div class="flex items-center p-4">
      <NuxtLink to="/" class="flex w-fit items-center">
        <NuxtImg src="/logo.png" width="144" />
      </NuxtLink>
    </div>
    <SidebarNav />
    <div class="flex flex-col gap-4 mt-auto px-4">
      <SidebarUser
        :data="{
          firstname: user?.user_metadata.firstname,
          lastname: user?.user_metadata.lastname,
          email: user?.email
        }"
      />
      <button
        @click="signOut()"
        class="flex w-full h-9 items-center rounded-md px-3 text-sm font-medium text-gray-600 transition-colors select-none hover:text-gray-800 hover:bg-gray-100"
      >
        <Icon name="lucide:log-out" size="16" class="mr-2" />
        Déconnexion
      </button>
    </div>
  </aside>
</template>

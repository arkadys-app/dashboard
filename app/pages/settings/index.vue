<script setup lang="ts">
const supabase = useSupabaseClient<Database>()
const user = useSupabaseUser()

const { data: children } = await useAsyncData('children', async () => {
  const { data } = await supabase
    .from('children')
    .select('*')
    .eq('user_id', user.value!.id)

  return data ?? []
})

const firstname = ref<string>(user.value?.user_metadata?.firstname ?? '')
const lastname = ref<string>(user.value?.user_metadata?.lastname ?? '')
const email = ref<string>(user.value?.email ?? '')
</script>

<template>
  <div class="flex flex-col h-full px-4">
    <div class="flex flex-col md:flex-row md:items-end justify-between">
      <div class="py-3">
        <h1 class="text-teal-800 text-2xl font-bold">Paramètres</h1>
      </div>
    </div>
    <div class="flex items-center gap-2 mt-4">
      <Icon name="lucide:user" size="16" class="text-gray-600" />
      <span class="text-sm text-gray-600 font-medium">Général</span>
    </div>
    <div class="mt-2 space-y-2">
      <UiInput v-model="firstname" placeholder="Prénom" class="w-full" />
      <UiInput v-model="lastname" placeholder="Nom de famille" class="w-full" />
      <UiInput v-model="email" placeholder="Adresse e-mail" class="w-full" />
    </div>
    <div class="flex items-center gap-2 mt-4">
      <Icon name="lucide:baby" size="16" class="text-gray-600" />
      <span class="text-sm text-gray-600 font-medium">Enfants</span>
    </div>
    <div class="px-4 py-2 mt-2 rounded-lg border border-gray-200">
      <ul v-if="!children || children.length > 0">
        <li v-for="child of children" :key="child.id" class="py-2">
          <div class="flex items-center justify-between">
            <div class="space-x-2">
              <span class="font-medium text-sm text-gray-800">{{
                child.firstname
              }}</span>
              <span class="text-xs text-gray-500"
                >{{ getAge(child.birthdate) }} ans</span
              >
            </div>
            <NuxtLink
              :to="`/settings/${child.id}/manage`"
              class="font-medium text-teal-500 hover:underline text-sm"
            >
              Gérer
            </NuxtLink>
          </div>
        </li>
      </ul>
      <p v-else class="text-gray-600 text-sm py-4">Aucun enfant ajouté.</p>
    </div>
  </div>
</template>

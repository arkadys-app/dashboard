<script setup lang="ts">
const user = useSupabaseUser()
const supabase = useSupabaseClient<Database>()

const { data: children } = await useAsyncData('children', async () => {
  const { data } = await supabase.from('children').select('*')

  return data ?? []
})

const selectedChild = ref<string | undefined>()

const setChildId = (childId: string) => {
  localStorage.setItem('childId', childId)
}

onMounted(() => {
  const storedChildId = localStorage.getItem('childId')

  if (storedChildId && children.value) {
    const match = children.value.find((c) => c.id === storedChildId)

    if (match) {
      selectedChild.value = match.firstname
    } else {
      selectedChild.value = children.value[0]?.firstname ?? undefined
    }
  } else {
    selectedChild.value = children.value?.[0]?.firstname ?? undefined
  }
})
</script>

<template>
  <div class="flex flex-col h-full px-4">
    <div class="flex flex-col md:flex-row md:items-end justify-between">
      <div class="py-3">
        <h1 class="text-teal-800 text-2xl font-bold">
          Bienvenue {{ user?.user_metadata.firstname }} 👋
        </h1>
        <p class="text-gray-600">
          Suivez la progression de {{ selectedChild }} ici !
        </p>
      </div>
      <div class="py-3">
        <ClientOnly>
          <ChildSwitcher
            v-model="selectedChild"
            :children="children!"
            @child-selected="(child) => setChildId(child.id)"
          />
        </ClientOnly>
      </div>
    </div>
    <MainStats />
    <div class="mt-4 flex-1">
      <UiCard class="flex flex-col pt-3 h-full">
        <h2 class="text-2xl font-bold text-teal-800">Performances</h2>
        <PerformanceChart />
      </UiCard>
    </div>
  </div>
</template>

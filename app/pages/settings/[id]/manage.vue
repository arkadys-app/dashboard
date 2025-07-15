<script setup lang="ts">
import type { DateValue } from 'reka-ui'
import { CalendarDate } from '@internationalized/date'

const supabase = useSupabaseClient<Database>()
const route = useRoute()

const { data: child } = await useAsyncData(
  `child-${route.params.id}`,
  async () => {
    const { data } = await supabase
      .from('children')
      .select('*')
      .eq('id', route.params.id as string)
      .single()

    return data
  }
)

const form = useForm({
  validationSchema: toTypedSchema(AddChildSchema),
  initialValues: {
    firstname: child.value?.firstname ?? '',
    birthdate: undefined
  }
})
const onSubmit = form.handleSubmit(async ({ firstname, birthdate }) => {
  const { error } = await supabase
    .from('children')
    .update({
      firstname,
      birthdate: birthdate ? birthdate.toISOString() : undefined
    })
    .eq('id', route.params.id as string)
})

const deleteChild = async () => {
  const { error } = await supabase
    .from('children')
    .delete()
    .eq('id', route.params.id as string)

  if (!error) {
    navigateTo('/settings')
  }
}
</script>

<template>
  <div class="flex flex-col h-full px-4">
    <h2 class="inline-flex items-center font-bold text-2xl py-3">
      <NuxtLink
        to="/settings"
        class="text-teal-800/60 hover:text-teal-800 transition-colors"
      >
        Paramètres
      </NuxtLink>
      <Icon
        name="lucide:chevron-right"
        class="text-teal-600 inline-block mx-1"
      />
      <span class="text-teal-800">{{ child?.firstname }}</span>
    </h2>
    <div>
      <form @submit.prevent="onSubmit" class="flex flex-col gap-4 mt-5">
        <FormField
          name="firstname"
          type="text"
          label="Prénom"
          placeholder="Lucas"
        />
        <FormField name="birthdate" type="date" label="Date de naissance" />
        <UiButton type="submit" variant="primary" class="w-full">
          Modifier
        </UiButton>
      </form>
      <UiButton
        @click="deleteChild()"
        type="submit"
        variant="destructive"
        class="w-full mt-4"
      >
        Supprimer
      </UiButton>
    </div>
  </div>
</template>

<script setup lang="ts">
const supabase = useSupabaseClient<Database>()
const user = useSupabaseUser()

interface Child {
  birthdate: string
  created_at: string
  firstname: string
  id: string
  user_id: string
}

const value = defineModel<string>()

const props = defineProps<{
  children: Child[]
}>()

const form = useForm({
  validationSchema: toTypedSchema(AddChildSchema),
  initialValues: {
    firstname: '',
    birthdate: undefined
  }
})

const onSubmit = form.handleSubmit(async ({ firstname, birthdate }) => {
  const { error } = await supabase.from('children').insert({
    firstname,
    birthdate: birthdate.toISOString(),
    user_id: user.value!.id
  })

  open.value = false
})

const emit = defineEmits<{
  'child-selected': [child: Child]
}>()

const open = ref(false)
</script>

<template>
  <DialogRoot v-model:open="open">
    <DropdownMenuRoot>
      <DropdownMenuTrigger
        class="h-9 inline-flex min-w-40 items-center justify-between rounded-lg px-3 text-sm font-medium text-teal-800 bg-gray-50 hover:bg-gray-100 transition-colors"
      >
        <div class="flex items-center gap-2">
          <Icon name="lucide:baby" />
          {{ value ?? 'Sélectionner un enfant' }}
        </div>
        <Icon name="lucide:chevron-down" class="size-4 ml-2" />
      </DropdownMenuTrigger>

      <DropdownMenuPortal>
        <DropdownMenuContent
          :side-offset="6"
          class="w-(--reka-dropdown-menu-trigger-width) p-1 bg-gray-50 rounded-lg border border-gray-200"
        >
          <DropdownMenuRadioGroup v-model="value">
            <template v-if="props.children.length > 0">
              <DropdownMenuRadioItem
                v-for="(child, index) of props.children"
                :key="index"
                :value="child.firstname"
                @select="emit('child-selected', child)"
                class="flex items-center px-2 h-8 text-sm select-none text-teal-800 data-[highlighted]:bg-gray-100 rounded-md transition-colors"
              >
                <DropdownMenuItemIndicator
                  class="absolute flex items-center justify-center"
                >
                  <Icon name="lucide:check" size="16" class="text-teal-800" />
                </DropdownMenuItemIndicator>
                <span class="ml-[22px] font-medium">
                  {{ child.firstname }}
                </span>
              </DropdownMenuRadioItem>
            </template>
            <p
              v-else
              class="inline-flex items-center px-2 h-8 text-sm text-gray-600"
            >
              Aucun enfant trouvé
            </p>
          </DropdownMenuRadioGroup>
          <DropdownMenuSeparator class="my-1 h-px -mx-1 bg-gray-200" />
          <DialogTrigger as-child>
            <DropdownMenuItem
              class="flex items-center px-2 h-8 text-sm font-medium select-none text-gray-600 hover:bg-gray-100 hover:text-gray-800 rounded-md transition-colors"
            >
              <Icon name="lucide:plus" class="mr-2" />
              Ajouter
            </DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenuRoot>
    <DialogPortal>
      <DialogOverlay class="fixed inset-0 z-30 bg-black/10" />
      <DialogContent
        class="fixed top-1/2 left-1/2 max-h-[85vh] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg z-40"
      >
        <DialogTitle class="font-bold text-teal-800">
          Ajouter un enfant
        </DialogTitle>
        <DialogDescription class="text-sm text-gray-600 mt-2.5">
          Entrez les informations de l'enfant que vous souhaitez ajouter.
        </DialogDescription>
        <form @submit.prevent="onSubmit" class="flex flex-col gap-4 mt-5">
          <FormField
            name="firstname"
            type="text"
            label="Prénom"
            placeholder="Lucas"
          />
          <FormField name="birthdate" type="date" label="Date de naissance" />
          <UiButton type="submit" variant="primary" class="w-full">
            Ajouter
          </UiButton>
        </form>
        <DialogClose
          class="text-teal-800 hover:bg-gray-100 absolute top-6 right-6 inline-flex size-6 appearance-none items-center cursor-pointer transition-colors justify-center rounded-full"
          aria-label="Close"
        >
          <Icon name="lucide:x" />
        </DialogClose>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

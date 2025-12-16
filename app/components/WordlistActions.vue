<script setup lang="ts">
import { z } from 'zod'

import type { InternalApi } from 'nitropack'

const props = defineProps<{
  data: InternalApi['/api/wordlists/:id']['get']
  refresh: () => Promise<void>
}>()

const { add } = useToast()

const { data: games } = await useFetch('/api/games')

type Schema = z.output<typeof WordlistSchemaClient>

const state = reactive<Partial<Schema>>({
  name: props.data?.name,
  description: props.data?.description || undefined,
  game: props.data?.gameId,
  wordlist: props.data?.words.join('\n') || undefined
})

const wordsCount = computed(() => {
  if (!state.wordlist) return 0

  return state.wordlist
    .split('\n')
    .map((word) => word.trim())
    .filter((word) => word.length > 0).length
})

const modalOpen = ref(false)
const loading = ref(false)

async function onSubmit(event: FormSubmitEvent<Schema>) {
  loading.value = true

  try {
    const wordlist = await $fetch(`/api/wordlists/${props.data?.id}`, {
      method: 'put',
      body: {
        name: event.data.name,
        description: event.data.description,
        gameId: event.data.game,
        words: event.data.wordlist
          .split('\n')
          .map((word) => word.trim())
          .filter((word) => word.length > 0)
      }
    })

    if (props.data?.slug !== wordlist.data.slug) {
      add({
        title: 'Liste de mots modifiée',
        description: 'La liste de mots a été modifiée avec succès.'
      })
      await navigateTo(`/customizations/${wordlist.data.slug}`)
    } else {
      await props.refresh()
      add({
        title: 'Liste de mots modifiée',
        description: 'La liste de mots a été modifiée avec succès.'
      })
      modalOpen.value = false
    }
  } catch (err: any) {
    add({
      variant: 'destructive',
      title: 'Erreur lors de la modification de la liste de mots',
      description: err.data.message
    })
  } finally {
    loading.value = false
  }
}

async function deleteWordlist() {
  try {
    await $fetch(`/api/wordlists/${props.data?.id}`, {
      method: 'delete'
    })

    add({
      title: 'Liste de mots supprimée',
      description: 'La liste de mots a été supprimée avec succès.'
    })
    await navigateTo('/customizations')
  } catch (err: any) {
    add({
      variant: 'destructive',
      title: 'Erreur lors de la suppression de la liste de mots',
      description: err.data.message
    })
  }
}

function resetState() {
  state.name = props.data?.name
  state.description = props.data?.description || undefined
  state.game = props.data?.gameId
  state.wordlist = props.data?.words.join('\n') || undefined
}
</script>

<template>
  <UiDropdownMenu
    :content="{ align: 'end' }"
    :items="[
      {
        label: 'Modifier',
        slot: 'edit',
        icon: 'hugeicons:edit-03',
        disabled: data?.isGlobal,
        class: 'h-6 ps-1.5 text-xs'
      },
      {
        label: 'Supprimer',
        slot: 'delete',
        icon: 'hugeicons:delete-02',
        disabled: data?.isGlobal,
        class: 'h-6 ps-1.5 text-xs'
      }
    ]"
  >
    <UiButton
      variant="ghost"
      icon="hugeicons:more-vertical"
      class="size-6 data-[state=open]:bg-slate-100"
    />

    <template #edit="{ item }">
      <UiModal v-model:open="modalOpen" title="Modifier la liste de mots">
        <DropdownMenuItem
          :disabled="item.disabled"
          :text-value="item.label"
          :class="
            cn(
              'flex items-center text-sm font-medium cursor-pointer data-[highlighted]:text-slate-800 data-[state=checked]:text-slate-800 h-7 px-2 rounded-md select-none data-[highlighted]:bg-slate-100 data-disabled:opacity-50 data-disabled:pointer-events-none outline-none',
              item.class
            )
          "
          @select="(e) => e.preventDefault()"
          @click="resetState"
        >
          <Icon
            v-if="!!item.icon"
            :name="item.icon"
            class="text-slate-500 mr-2"
          />
          {{ item.label }}
        </DropdownMenuItem>

        <template #body="{ close }">
          <UiForm
            class="flex flex-col gap-4 mx-auto w-full"
            :schema="WordlistSchemaClient"
            :state="state"
            @submit="onSubmit"
          >
            <div class="flex flex-col gap-2 px-6 pt-4">
              <UiFormField name="name" label="Nom de la liste">
                <UiInput
                  v-model="state.name"
                  type="text"
                  placeholder="Liste XYZ"
                  class="w-full"
                />
              </UiFormField>
              <UiFormField name="description" label="Description">
                <UiInput
                  v-model="state.description"
                  type="text"
                  class="w-full"
                />
              </UiFormField>
              <UiFormField name="game" label="Jeu associé">
                <UiSelect
                  v-model="state.game"
                  placeholder="Aucun jeu sélectionné"
                  class="w-full"
                  :items="
                    games?.map((game) => ({
                      label: game.name,
                      value: game.id
                    })) || []
                  "
                />
              </UiFormField>
              <UiFormField
                name="wordlist"
                label="Liste de mots"
                :description="`${wordsCount} mots`"
              >
                <UiTextarea
                  v-model="state.wordlist"
                  placeholder="Saisissez un mot par ligne…"
                  class="w-full"
                  :rows="6"
                />
              </UiFormField>
            </div>
            <div class="flex gap-2 border-t border-slate-300 px-6 py-4">
              <UiButton
                variant="ghost"
                label="Annuler"
                class="ml-auto"
                @click="close"
              />
              <UiButton
                variant="primary"
                type="submit"
                label="Modifier la liste"
                :loading="loading"
              />
            </div>
          </UiForm>
        </template>
      </UiModal>
    </template>
    <template #delete="{ item }">
      <UiModal title="Supprimer la liste de mots">
        <DropdownMenuItem
          :disabled="item.disabled"
          :text-value="item.label"
          :class="
            cn(
              'flex items-center text-sm font-medium cursor-pointer data-[highlighted]:text-slate-800 data-[state=checked]:text-slate-800 h-7 px-2 rounded-md select-none data-[highlighted]:bg-slate-100 data-disabled:opacity-50 data-disabled:pointer-events-none outline-none',
              item.class
            )
          "
          @select="(e) => e.preventDefault()"
        >
          <Icon
            v-if="!!item.icon"
            :name="item.icon"
            class="text-slate-500 mr-2"
          />
          {{ item.label }}
        </DropdownMenuItem>

        <template #body>
          <div class="flex flex-col gap-4 px-6 py-4">
            <p class="text-sm text-slate-500">
              Êtes-vous sûr de vouloir supprimer cette liste de mots ? Cette
              action est irréversible et entraînera la perte de toutes les
              données associées à cette liste.
            </p>
          </div>
        </template>
        <template #footer="{ close }">
          <div class="flex gap-2 px-6 py-4">
            <UiButton
              variant="ghost"
              label="Annuler"
              @click="close"
              class="ml-auto"
            />
            <UiButton
              type="submit"
              variant="destructive"
              label="Supprimer la liste"
              loading-auto
              @click="deleteWordlist"
            />
          </div>
        </template>
      </UiModal>
    </template>
  </UiDropdownMenu>
</template>

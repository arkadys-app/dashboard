<script setup lang="ts">
import { UAParser } from 'ua-parser-js'

const { client, signOut } = useAuth()
const { add } = useToast()

const props = defineProps<{
  session: {
    id: string
    createdAt: Date
    updatedAt: Date
    userId: string
    expiresAt: Date
    token: string
    ipAddress?: string | null | undefined
    userAgent?: string | null | undefined
  }
  isCurrent?: boolean
}>()

const emit = defineEmits<{
  revoked: []
}>()

const { data: location } = await useFetch(
  `/api/ip-lookup/${props.session.ipAddress}`
)

const userAgent = computed(() => {
  return new UAParser(props.session.userAgent || '').getResult()
})

const browserInfo = computed(() => {
  return getBrowserInfo(userAgent.value.browser.name || '')
})

const modalOpen = ref(false)

const revokeSession = async () => {
  await client.revokeSession({ token: props.session.token })

  emit('revoked')
  add({
    title: 'Session révoquée',
    description: 'La session a été révoquée avec succès.'
  })

  modalOpen.value = false
}
</script>

<template>
  <li class="group/item flex gap-4 items-center justify-between">
    <span
      class="flex items-center justify-center size-8 rounded-lg shadow-xs border border-slate-300"
    >
      <Icon
        :name="browserInfo?.icon || 'hugeicons:globe-02'"
        size="16"
        class="text-slate-500 size-4"
      />
    </span>
    <div class="flex flex-1 flex-col justify-between h-8">
      <UiModal>
        <UiButton variant="link" class="w-fit text-sm font-medium leading-none">
          {{ browserInfo?.name ?? userAgent.browser.name }} sur
          {{ userAgent.os.name }}
        </UiButton>

        <template #header="{ close }">
          <div class="flex items-center gap-4 -ml-2">
            <span
              class="flex items-center justify-center size-8 rounded-lg shadow-xs border border-slate-300"
            >
              <Icon
                :name="browserInfo?.icon ?? 'hugeicons:globe-02'"
                size="16"
                class="text-slate-500"
              />
            </span>
            <h2 class="font-medium">
              {{ browserInfo?.name ?? userAgent.browser.name }} sur
              {{ userAgent.os.name }}
            </h2>
          </div>
          <UiButton
            variant="ghost"
            icon="hugeicons:cancel-01"
            class="absolute top-5 end-4 size-6"
            @click="close"
          />
        </template>
        <template #body>
          <ul class="flex flex-col gap-4 px-6 py-4 text-sm font-medium">
            <li class="flex">
              <div class="flex-1 text-slate-500">Navigateur</div>
              <div class="flex-1">
                {{ browserInfo?.name ?? userAgent.browser.name }}
              </div>
            </li>
            <li class="flex">
              <div class="flex-1 text-slate-500">Système d'exploitation</div>
              <div class="flex-1">
                {{ userAgent.os.name }} {{ userAgent.os.version }}
              </div>
            </li>
            <li class="flex">
              <div class="flex-1 text-slate-500">Adresse IP</div>
              <div class="flex-1">{{ props.session.ipAddress }}</div>
            </li>
            <li class="flex">
              <div class="flex-1 text-slate-500">
                Dernière localisation
                <UiTooltip text="La localisation peut être approximative">
                  <Icon
                    name="tabler:info-circle-filled"
                    size="14"
                    class="inline-block ml-1 cursor-pointer"
                  />
                </UiTooltip>
              </div>
              <div class="flex-1">
                {{
                  location
                    ? `${location.city}, ${location.country}`
                    : 'Inconnue'
                }}
              </div>
            </li>
            <li class="flex">
              <div class="flex-1 text-slate-500">Connexion initiale</div>
              <div class="flex-1">
                <NuxtTime
                  :datetime="props.session.createdAt"
                  date-style="medium"
                  time-style="short"
                />
              </div>
            </li>
          </ul>
        </template>
        <template #footer>
          <div class="flex justify-end px-6 py-4">
            <UiButton
              v-if="isCurrent"
              variant="destructive"
              loading-auto
              @click="signOut({ redirectTo: '/login' })"
            >
              Se déconnecter
            </UiButton>
            <UiButton
              v-else
              variant="destructive"
              loading-auto
              @click="revokeSession"
            >
              Révoquer la session
            </UiButton>
          </div>
        </template>
      </UiModal>
      <div v-if="isCurrent" class="flex items-center gap-2">
        <span class="block rounded-full size-1.5 bg-teal-500" />
        <span class="text-xs font-medium text-teal-500 leading-none">
          Session actuelle
        </span>
      </div>
      <div v-else>
        <span class="text-xs font-medium text-slate-500 leading-none">
          Dernière connexion
          <NuxtTime :datetime="props.session.updatedAt" :relative="true" />
        </span>
      </div>
    </div>
    <UiButton
      v-if="isCurrent"
      variant="ghost"
      class="group-hover/item:flex hidden h-7 text-xs px-2.5"
      loading-auto
      @click="signOut({ redirectTo: '/login' })"
    >
      Se déconnecter
    </UiButton>
    <UiButton
      v-else
      variant="ghost"
      class="group-hover/item:flex hidden h-7 text-xs px-2.5"
      loading-auto
      @click="revokeSession"
    >
      Révoquer
    </UiButton>
  </li>
</template>

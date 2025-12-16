import type { InternalApi } from 'nitropack'

export type Children = NonNullable<InternalApi['/api/children']['get']>

export function useChild() {
  const childCookie = useCookie<string | null>('child')
  const children = useState<Children>('child:all', () => [])
  const currentChild = useState<Children[number] | null>(
    'child:current',
    () => null
  )

  const headers = import.meta.server ? useRequestHeaders() : undefined

  const fetchChildren = async () => {
    try {
      const data = await $fetch('/api/children', { headers })

      children.value = data || []
      if (
        currentChild.value &&
        !children.value.find((c) => c.id === currentChild.value?.id)
      ) {
        currentChild.value = children.value[0] || null
        childCookie.value = currentChild.value?.id || null
      }
    } catch {
      children.value = []
    }
  }

  fetchChildren()

  const childId = computed(() => childCookie.value || children.value?.[0]?.id)

  watchEffect(async () => {
    if (!childId.value) return

    try {
      currentChild.value = await $fetch<Children[number]>(
        `/api/children/${childId.value}`,
        { headers }
      )
    } catch {
      childCookie.value = null
    }
  })

  const setCurrentChild = async (childId: string) => {
    childCookie.value = childId

    await navigateTo('/')
  }

  return {
    children,
    currentChild,
    fetchChildren,
    setCurrentChild
  }
}

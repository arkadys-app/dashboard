import type { ToastProps } from '~/components/ui/Toast.vue'

export interface Toast extends ToastProps {
  id: string
  onClick?: (toast: Toast) => void
}

export function useToast() {
  const toasts = useState<Toast[]>('toasts', () => [])
  const queue: Toast[] = []
  const running = ref(false)

  const generateId = () =>
    `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`

  async function processQueue() {
    if (running.value || queue.length === 0) return
    running.value = true

    while (queue.length > 0) {
      const toast = queue.shift()!

      await nextTick()
      toasts.value = [...toasts.value, toast].slice(-5)
    }

    running.value = false
  }

  function add(toast: Partial<Toast>) {
    const body: Toast = {
      id: generateId(),
      open: true,
      duration: toast.duration ?? 5000,
      ...toast
    }

    queue.push(body)
    processQueue()

    return body
  }

  function remove(id: string) {
    const t = toasts.value.find((x) => x.id === id)

    if (!t) return
    t.open = false

    setTimeout(() => {
      toasts.value = toasts.value.filter((x) => x.id !== id)
    }, 300)
  }

  function clear() {
    toasts.value = []
    queue.splice(0, queue.length)
  }

  return {
    toasts,
    add,
    remove,
    clear
  }
}

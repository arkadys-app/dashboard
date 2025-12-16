<script setup lang="ts" generic="S extends import('zod').ZodType">
import { z } from 'zod'

interface FormProps<S extends z.ZodType> {
  id?: string
  schema?: S
  state?: Partial<z.input<S>>
  disabled?: boolean
  loadingAuto?: boolean
  class?: any
}

const props = withDefaults(defineProps<FormProps<S>>(), { loadingAuto: true })
const emit = defineEmits<{
  submit: [event: FormSubmitEvent<z.output<S>>]
  reset: []
  error: [errors: FormError[]]
}>()

const formId = props.id || useId()
const bus = useEventBus<FormEvent>(`form-${formId}`)
const errors = ref<FormError[]>([])
const disabled = computed(() => props.disabled)

function issuesToErrors(issues: z.core.$ZodIssue[]): FormError[] {
  return issues.map((i) => ({
    name: i.path?.length ? i.path.join('.') : undefined,
    message: i.message
  }))
}

function upsertErrorsFor(names: string[], newErrors: FormError[]) {
  const nameSet = new Set(names)
  const rest = errors.value.filter((e) => !e.name || !nameSet.has(e.name))
  const next = newErrors.filter((e) => !e.name || nameSet.has(e.name))
  errors.value = [...rest, ...next]
}

function clearErrorsFor(names: string[]) {
  const nameSet = new Set(names)
  errors.value = errors.value.filter((e) => !e.name || !nameSet.has(e.name))
}

async function validate(targetNames?: string[]) {
  const s = props.schema as S | undefined
  if (!s) {
    clearErrorsFor(targetNames ?? [])
    return { ok: true as const, data: props.state as any as z.output<S> }
  }

  const res = s.safeParse(props.state)
  if (res.success) {
    if (targetNames) clearErrorsFor(targetNames)
    else errors.value = []
    return { ok: true as const, data: res.data as z.output<S> }
  }

  const all = issuesToErrors(res.error.issues)
  if (targetNames?.length) {
    const set = new Set(targetNames)
    const filtered = all.filter((e) => e.name && set.has(e.name))
    upsertErrorsFor(targetNames, filtered)
  } else {
    errors.value = all
  }
  return { ok: false as const, errors: all }
}

bus.on(async (evt) => {
  if (evt.type === 'blur' && evt.name) {
    await validate([evt.name])
  }
})

const loading = ref(false)

async function onSubmitWrapper(e: SubmitEvent) {
  loading.value = true
  const res = await validate()

  if (res.ok) {
    const ev = e as FormSubmitEvent<z.output<S>>

    ev.data = res.data
    emit('submit', ev)
  } else {
    emit('error', errors.value)
  }

  loading.value = false
}

provideFormContext({ id: formId, bus, errors, disabled })
</script>

<template>
  <form
    :id="formId"
    :class="props.class"
    @submit.prevent="onSubmitWrapper"
    @reset.prevent="emit('reset')"
  >
    <slot :errors="errors" />
  </form>
</template>

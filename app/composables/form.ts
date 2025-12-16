import { createContext } from 'reka-ui'

import type { UseEventBusReturn } from '@vueuse/core'

export interface FormEvent {
  type: 'blur'
  name?: string
}
export type FormError = { name?: string; message: string }

export interface FormContext {
  id: string
  bus: UseEventBusReturn<FormEvent, string>
  errors: Ref<FormError[]>
  disabled: ComputedRef<boolean>
}

export interface FormFieldContext {
  id: Ref<string>
  name: Ref<string | undefined>
  error: ComputedRef<string | undefined>
}

export type FormSubmitEvent<T> = SubmitEvent & { data: T }

export const [useFormContext, provideFormContext] =
  createContext<FormContext>('Form')
export const [useFormFieldContext, provideFormFieldContext] = createContext<
  FormFieldContext | undefined
>('FormField', undefined)

export function useFormField() {
  try {
    const form = useFormContext()
    const field = useFormFieldContext()

    const id = field?.id || ref(undefined)

    function emitFormBlur() {
      const name = field?.name.value
      if (name) {
        form.bus.emit({ type: 'blur', name })
      }
    }

    return {
      id,
      name: field?.name,
      disabled: form.disabled,
      invalid: computed(() => !!field?.error.value),
      emitFormBlur
    }
  } catch {
    return {
      id: ref(undefined),
      name: ref(undefined),
      disabled: computed(() => false),
      invalid: computed(() => false),
      emitFormBlur: () => {}
    }
  }
}

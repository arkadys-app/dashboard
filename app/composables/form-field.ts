import {
  FieldContextKey,
  useFieldError,
  useIsFieldDirty,
  useIsFieldTouched,
  useIsFieldValid
} from 'vee-validate'

export const FORM_ITEM_INJECTION_KEY = Symbol() as InjectionKey<string>

export const useFormField = () => {
  const fieldContext = inject(FieldContextKey)
  const fieldItemContext = inject(FORM_ITEM_INJECTION_KEY)

  if (!fieldContext) {
    throw new Error('useFormField must be used within a Field context')
  }

  const { name } = fieldContext
  const id = fieldItemContext

  const fieldState = {
    valid: useIsFieldValid(name),
    dirty: useIsFieldDirty(name),
    touched: useIsFieldTouched(name),
    error: useFieldError(name)
  }

  return {
    id,
    name,
    formItemId: `form-item-${id}`,
    formDescriptionId: `form-item-description-${id}`,
    formMessageId: `form-item-message-${id}`,
    ...fieldState
  }
}

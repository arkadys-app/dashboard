<script setup lang="ts">
const { error, formItemId, formDescriptionId, formMessageId } = useFormField()
</script>

<template>
  <Slot
    :id="formItemId"
    :aria-describedby="
      !error ? formDescriptionId : `${formDescriptionId} ${formMessageId}`
    "
    :aria-invalid="!!error"
  >
    <slot />
  </Slot>
</template>

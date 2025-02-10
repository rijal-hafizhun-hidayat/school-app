<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue'

defineProps({
  modelValue: {
    type: Boolean,
    required: false,
  },
})

const emit = defineEmits(['update:modelValue'])

const input: Ref<HTMLInputElement | null> = ref(null)

onMounted(() => {
  if (input.value?.hasAttribute('autofocus')) {
    input.value?.focus()
  }
})

defineExpose({ focus: () => input.value?.focus() })

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement | null
  if (target) {
    // Emit the updated value safely
    emit('update:modelValue', target.value)
  }
}
</script>

<template>
  <input
    :value="modelValue"
    @input="handleInput"
    ref="input"
    type="radio"
    class="w-4 h-4 text-blue-600 border-gray-600 focus:ring-blue-500 focus:ring-2"
  />
</template>

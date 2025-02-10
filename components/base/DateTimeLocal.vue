<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue'

defineProps({
  modelValue: {
    type: Object as () => Date | null, // Allow Date or null
    required: true,
  },
})

const emit = defineEmits(['update:modelValue'])

const input: Ref<HTMLInputElement | null> = ref(null)

onMounted(() => {
  if (input.value?.hasAttribute('autofocus')) {
    input.value.focus()
  }
})

defineExpose({ focus: () => input.value?.focus() })

// Format a Date object as YYYY-MM-DDTHH:MM or return an empty string if null
const formatDateTime = (date: Date | null): string => {
  if (!date) return ''
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${year}-${month}-${day}T${hours}:${minutes}`
}

// Parse a YYYY-MM-DDTHH:MM string into a Date object or return null if invalid
const parseDateTime = (dateString: string): Date | null => {
  const [datePart, timePart] = dateString.split('T')
  const [year, month, day] = datePart.split('-').map(Number)
  const [hours, minutes] = timePart.split(':').map(Number)
  return year && month && day && hours !== undefined && minutes !== undefined
    ? new Date(year, month - 1, day, hours, minutes)
    : null
}

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const parsedDate = parseDateTime(target.value)
  emit('update:modelValue', parsedDate) // Emit null if parsing fails
}
</script>

<template>
  <input
    type="datetime-local"
    class="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
    :value="formatDateTime(modelValue)"
    @input="handleInput"
    ref="input"
  />
</template>

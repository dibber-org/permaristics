<script setup lang="ts">
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useCatalogLabels } from '@/composables/useCatalogLabels'

export interface SelectOption {
  id: string
  slug: string
}

const props = defineProps<{
  options: readonly SelectOption[]
  kind: 'flow' | 'element'
}>()

const model = defineModel<string[]>({ default: () => [] })

const { t } = useI18n()
const { flowLabel, elementLabel } = useCatalogLabels()

/** One row per slot; empty string means “not chosen yet”. */
const slots = ref<string[]>([''])

function labelFor(option: SelectOption): string {
  return props.kind === 'element'
    ? elementLabel(option.slug)
    : flowLabel(option.slug)
}

function sortedOptions(): { id: string; label: string }[] {
  return [...props.options]
    .map((option) => ({ id: option.id, label: labelFor(option) }))
    .sort((a, b) => a.label.localeCompare(b.label, undefined, { sensitivity: 'base' }))
}

function syncModelFromSlots() {
  model.value = slots.value.filter(Boolean)
}

function onSlotChange(index: number, value: string) {
  slots.value[index] = value
  if (index === slots.value.length - 1 && value) {
    slots.value.push('')
  }
  while (slots.value.length > 1 && !slots.value[slots.value.length - 1] && !slots.value[slots.value.length - 2]) {
    slots.value.pop()
  }
  syncModelFromSlots()
}

watch(
  () => props.options,
  () => {
    slots.value = ['']
    syncModelFromSlots()
  },
  { deep: true },
)
</script>

<template>
  <div class="select-list">
    <select
      v-for="(_, index) in slots"
      :key="index"
      class="select-row"
      :value="slots[index]"
      @change="onSlotChange(index, ($event.target as HTMLSelectElement).value)"
    >
      <option value="">{{ t('select.placeholder') }}</option>
      <option v-for="opt in sortedOptions()" :key="opt.id" :value="opt.id">
        {{ opt.label }}
      </option>
    </select>
  </div>
</template>

<style scoped>
.select-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.select-row {
  min-width: 12rem;
  font-family: system-ui, sans-serif;
  font-size: 0.95rem;
  padding: 0.25rem;
}
</style>

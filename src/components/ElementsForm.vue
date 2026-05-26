<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { synergyService } from '@/services/synergyService'
import { useAppStore } from '@/stores/appStore'
import SelectList from './SelectList.vue'

const { t } = useI18n()
const appStore = useAppStore()

const elementIds = ref<string[]>([])
const selectedElements = ref<string[]>([])

onMounted(async () => {
  const catalog = await synergyService.loadCatalog()
  elementIds.value = Object.keys(catalog).sort()
})

const sortedElementIds = computed(() => elementIds.value)

function submit() {
  if (!selectedElements.value.length) {
    return
  }
  appStore.search({ names: selectedElements.value })
}
</script>

<template>
  <section id="elements" class="form-section">
    <h2>{{ t('elementsScreen.heading') }}</h2>
    <div class="column center-block">
      <h3>{{ t('elementsScreen.label') }}</h3>
      <SelectList
        v-model="selectedElements"
        :option-ids="sortedElementIds"
        kind="element"
      />
    </div>
    <div class="center actions">
      <button
        type="button"
        class="primary"
        :disabled="appStore.loading || !selectedElements.length"
        @click="submit"
      >
        {{ t('elementsScreen.find') }}
      </button>
    </div>
  </section>
</template>

<style scoped>
.form-section {
  scroll-margin-top: 1rem;
}

.center-block {
  max-width: 360px;
  margin: 0 auto;
  border: 1px solid #000;
  padding: 1rem;
  background: #fff;
}

.actions {
  margin-top: 1.5rem;
}

.primary {
  margin: 1rem;
  background: lightgray;
  border: 1px solid #000;
  padding: 1rem 1.5rem;
  font-size: 1.5rem;
  font-weight: bold;
  font-family: inherit;
  cursor: pointer;
}

.primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>

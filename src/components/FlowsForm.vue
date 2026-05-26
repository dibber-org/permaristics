<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import type { SelectOption } from '@/components/SelectList.vue'
import { synergyService } from '@/services/synergyService'
import { useAppStore } from '@/stores/appStore'
import SelectList from './SelectList.vue'

const { t } = useI18n()
const appStore = useAppStore()

const flowOptions = ref<SelectOption[]>([])
const selectedNeeds = ref<string[]>([])
const selectedProducts = ref<string[]>([])

onMounted(async () => {
  const { flows } = await synergyService.loadCatalog()
  flowOptions.value = flows.map((flow) => ({ id: flow.id, slug: flow.slug }))
})

const sortedFlowOptions = computed(() =>
  [...flowOptions.value].sort((a, b) => a.slug.localeCompare(b.slug)),
)

function submit() {
  appStore.search({
    needs: selectedNeeds.value.length ? selectedNeeds.value : undefined,
    products: selectedProducts.value.length ? selectedProducts.value : undefined,
  })
}
</script>

<template>
  <section id="flows" class="form-section">
    <h2>{{ t('flowsScreen.heading') }}</h2>
    <div class="columns">
      <div class="column">
        <h3>{{ t('flowsScreen.needs') }}</h3>
        <SelectList v-model="selectedNeeds" :options="sortedFlowOptions" kind="flow" />
      </div>
      <div class="column">
        <h3>{{ t('flowsScreen.products') }}</h3>
        <SelectList v-model="selectedProducts" :options="sortedFlowOptions" kind="flow" />
      </div>
    </div>
    <div class="center actions">
      <button type="button" class="primary" :disabled="appStore.loading" @click="submit">
        {{ t('flowsScreen.find') }}
      </button>
    </div>
  </section>
</template>

<style scoped>
.form-section {
  scroll-margin-top: 1rem;
}

.columns {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
}

.column {
  flex: 1 1 200px;
  max-width: 320px;
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
  cursor: wait;
}
</style>

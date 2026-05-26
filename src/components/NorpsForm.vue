<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { CONNECTION_IDS } from '@/repositories/inMemory/connectionIds'
import { useAppStore } from '@/stores/appStore'
import SelectList from './SelectList.vue'

const { t } = useI18n()
const appStore = useAppStore()

const selectedNeeds = ref<string[]>([])
const selectedProducts = ref<string[]>([])

function submit() {
  appStore.search({
    needs: selectedNeeds.value.length ? selectedNeeds.value : undefined,
    products: selectedProducts.value.length ? selectedProducts.value : undefined,
  })
}
</script>

<template>
  <section id="norps" class="form-section">
    <h2>{{ t('norps.heading') }}</h2>
    <div class="columns">
      <div class="column">
        <h3>{{ t('norps.needs') }}</h3>
        <SelectList v-model="selectedNeeds" :option-ids="CONNECTION_IDS" kind="connection" />
      </div>
      <div class="column">
        <h3>{{ t('norps.products') }}</h3>
        <SelectList v-model="selectedProducts" :option-ids="CONNECTION_IDS" kind="connection" />
      </div>
    </div>
    <div class="center actions">
      <button type="button" class="primary" :disabled="appStore.loading" @click="submit">
        {{ t('norps.find') }}
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

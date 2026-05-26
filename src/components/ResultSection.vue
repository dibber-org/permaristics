<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { useAppStore } from '@/stores/appStore'
import SynergyGraph from './SynergyGraph.vue'

const { t } = useI18n()
const appStore = useAppStore()
const { graphResult } = storeToRefs(appStore)
</script>

<template>
  <section id="result" class="result">
    <h2>{{ t('result.heading') }}</h2>
    <SynergyGraph :graph="graphResult" />
    <div class="center">
      <button type="button" class="back" @click="appStore.goTo('home')">
        {{ t('result.back') }}
      </button>
    </div>
  </section>
</template>

<style scoped>
.result {
  scroll-margin-top: 1rem;
}

.back {
  margin-top: 1.5rem;
  font-family: system-ui, sans-serif;
  padding: 0.5rem 1rem;
  border: 1px solid #333;
  background: #fff;
  cursor: pointer;
}
</style>

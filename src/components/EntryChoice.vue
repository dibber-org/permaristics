<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useAppStore } from '@/stores/appStore'

const { t } = useI18n()
const appStore = useAppStore()
</script>

<template>
  <section id="choice">
    <h2>{{ t('entry.heading') }}</h2>
    <div class="blocks">
      <button type="button" class="block right" @click="appStore.goTo('norps')">
        <h3>{{ t('entry.norpsTitle') }}</h3>
        <p>{{ t('entry.norpsDescription') }}</p>
      </button>
      <button type="button" class="block" @click="appStore.goTo('elements')">
        <h3>{{ t('entry.elementsTitle') }}</h3>
        <p>{{ t('entry.elementsDescription') }}</p>
      </button>
    </div>
    <div class="clear" />
  </section>
</template>

<style scoped>
.blocks {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
}

.block {
  display: block;
  color: inherit;
  text-align: left;
  border: 1px solid #000;
  width: min(280px, 100%);
  min-height: 120px;
  padding: 0.75rem;
  background: #fff;
  cursor: pointer;
  font: inherit;
}

.block:hover h3 {
  text-shadow: 2px 2px lightgray;
}

.block p {
  margin: 0;
}
</style>

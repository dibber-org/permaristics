<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useAppStore } from '@/stores/appStore'
import LanguageSwitcher from './LanguageSwitcher.vue'

const { t } = useI18n()
const appStore = useAppStore()
</script>

<template>
  <header class="header">
    <LanguageSwitcher />
    <h1>
      <button type="button" class="title-link" @click="appStore.goHome()">
        {{ t('app.title') }}
      </button>
    </h1>
  </header>
</template>

<style scoped>
.header {
  position: relative;
  margin-bottom: 2rem;
}

.title-link {
  background: none;
  border: none;
  padding: 0;
  font: inherit;
  color: inherit;
  cursor: pointer;
  text-decoration: none;
}

.title-link:hover {
  text-decoration: underline;
}
</style>

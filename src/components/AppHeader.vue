<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import LanguageSwitcher from './LanguageSwitcher.vue'

const { t } = useI18n()
</script>

<template>
  <header class="header">
    <LanguageSwitcher />
    <h1>{{ t('app.title') }}</h1>
  </header>
</template>

<style scoped>
.header {
  position: relative;
  margin-bottom: 2rem;
}
</style>

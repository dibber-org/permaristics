<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { setAppLocale, type AppLocale } from '@/i18n'

const { t, locale } = useI18n()

function changeLocale(next: AppLocale) {
  setAppLocale(next)
}
</script>

<template>
  <div class="lang" role="group" :aria-label="t('language.label')">
    <button
      type="button"
      class="lang-btn"
      :class="{ active: locale === 'fr' }"
      @click="changeLocale('fr')"
    >
      {{ t('language.fr') }}
    </button>
    <button
      type="button"
      class="lang-btn"
      :class="{ active: locale === 'en' }"
      @click="changeLocale('en')"
    >
      {{ t('language.en') }}
    </button>
  </div>
</template>

<style scoped>
.lang {
  display: flex;
  justify-content: flex-end;
  gap: 0.35rem;
  margin-bottom: 0.5rem;
}

.lang-btn {
  font-family: system-ui, sans-serif;
  font-size: 0.85rem;
  padding: 0.25rem 0.6rem;
  border: 1px solid #333;
  background: #fff;
  cursor: pointer;
}

.lang-btn.active {
  background: #333;
  color: #fff;
}
</style>

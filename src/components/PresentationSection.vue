<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <section id="presentation">
    <h2>{{ t('presentation.heading') }}</h2>
    <p>{{ t('presentation.p1') }}</p>
    <p>{{ t('presentation.p2') }}</p>
  </section>
</template>

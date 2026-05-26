<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'
import AppHeader from '@/components/AppHeader.vue'
import EntryChoice from '@/components/EntryChoice.vue'
import PresentationSection from '@/components/PresentationSection.vue'
import NorpsForm from '@/components/NorpsForm.vue'
import ElementsForm from '@/components/ElementsForm.vue'
import ResultSection from '@/components/ResultSection.vue'
import { useAppStore } from '@/stores/appStore'

const { t } = useI18n()
const appStore = useAppStore()
const { step } = storeToRefs(appStore)

watchEffect(() => {
  document.title = t('app.title')
})
</script>

<template>
  <AppHeader />
  <EntryChoice v-if="step === 'home'" />
  <PresentationSection v-if="step === 'home'" />
  <NorpsForm v-else-if="step === 'norps'" />
  <ElementsForm v-else-if="step === 'elements'" />
  <ResultSection v-else-if="step === 'result'" />
</template>

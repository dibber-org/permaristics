<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'
import AppHeader from '@/components/AppHeader.vue'
import HomeView from '@/components/HomeView.vue'
import FlowsForm from '@/components/FlowsForm.vue'
import ElementsForm from '@/components/ElementsForm.vue'
import ResultView from '@/components/ResultView.vue'
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
  <HomeView v-if="step === 'home'" />
  <FlowsForm v-else-if="step === 'flows'" />
  <ElementsForm v-else-if="step === 'elements'" />
  <ResultView v-else-if="step === 'result'" />
</template>

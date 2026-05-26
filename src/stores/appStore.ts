import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { SearchRestrictions, SynergyGraphResult } from '@/domain/types'
import { synergyService } from '@/services/synergyService'

export type AppStep = 'home' | 'norps' | 'elements' | 'result'

export const useAppStore = defineStore('app', () => {
  const step = ref<AppStep>('home')
  const restrictions = ref<SearchRestrictions>({})
  const graphResult = ref<SynergyGraphResult | null>(null)
  const loading = ref(false)

  function goTo(stepName: AppStep) {
    step.value = stepName
    if (stepName === 'norps' || stepName === 'elements') {
      graphResult.value = null
      restrictions.value = {}
    }
  }

  async function search(nextRestrictions: SearchRestrictions) {
    loading.value = true
    restrictions.value = nextRestrictions
    try {
      graphResult.value = await synergyService.findCombinations(nextRestrictions)
      step.value = 'result'
    } finally {
      loading.value = false
    }
  }

  return {
    step,
    restrictions,
    graphResult,
    loading,
    goTo,
    search,
  }
})

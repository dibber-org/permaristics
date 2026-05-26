import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { SynergyGraphResult, SynergySearchCriteria } from '@/domain/types'
import { synergyService } from '@/services/synergyService'

/** Wizard steps: home and result are distinct end screens; flows/elements are search forms. */
export type AppStep = 'home' | 'flows' | 'elements' | 'result'

export const useAppStore = defineStore('app', () => {
  const step = ref<AppStep>('home')
  const searchCriteria = ref<SynergySearchCriteria>({})
  const graphResult = ref<SynergyGraphResult | null>(null)
  const loading = ref(false)

  function goTo(stepName: AppStep) {
    step.value = stepName
    if (stepName === 'flows' || stepName === 'elements') {
      graphResult.value = null
      searchCriteria.value = {}
    }
  }

  function goHome() {
    step.value = 'home'
    graphResult.value = null
    searchCriteria.value = {}
  }

  async function search(criteria: SynergySearchCriteria) {
    loading.value = true
    searchCriteria.value = criteria
    try {
      graphResult.value = await synergyService.findSynergies(criteria)
      step.value = 'result'
    } finally {
      loading.value = false
    }
  }

  return {
    step,
    searchCriteria,
    graphResult,
    loading,
    goTo,
    goHome,
    search,
  }
})

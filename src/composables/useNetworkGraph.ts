import { computed, type Ref } from 'vue'
import type { SynergyGraphResult } from '@/domain/types'
import { useCatalogLabels } from './useCatalogLabels'

export function useNetworkGraph(graphResult: Ref<SynergyGraphResult | null>) {
  const { elementLabel, connectionLabel } = useCatalogLabels()

  const nodes = computed(() => {
    const result = graphResult.value
    if (!result) {
      return {}
    }
    const nodeMap: Record<string, { name: string }> = {}
    for (const id of result.elementIds) {
      nodeMap[id] = { name: elementLabel(id) }
    }
    for (const link of result.links) {
      if (!nodeMap[link.source]) {
        nodeMap[link.source] = { name: elementLabel(link.source) }
      }
      if (!nodeMap[link.target]) {
        nodeMap[link.target] = { name: elementLabel(link.target) }
      }
    }
    return nodeMap
  })

  const edges = computed(() => {
    const result = graphResult.value
    if (!result) {
      return {}
    }
    const edgeMap: Record<
      string,
      { source: string; target: string; label?: string }
    > = {}
    result.links.forEach((link, index) => {
      edgeMap[`e${index}`] = {
        source: link.source,
        target: link.target,
        label: connectionLabel(link.type),
      }
    })
    return edgeMap
  })

  return { nodes, edges }
}

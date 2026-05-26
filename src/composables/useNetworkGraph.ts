import { computed, type Ref } from 'vue'
import type { Catalog, SynergyGraphResult } from '@/domain/types'
import { useCatalogLabels } from './useCatalogLabels'

export function useNetworkGraph(
  graphResult: Ref<SynergyGraphResult | null>,
  catalog: Ref<Catalog | null>,
) {
  const { elementLabel, flowLabel } = useCatalogLabels()

  function slugForElementId(id: string): string {
    const element = catalog.value?.elements.find((e) => e.id === id)
    return element?.slug ?? id
  }

  const nodes = computed(() => {
    const result = graphResult.value
    if (!result) {
      return {}
    }
    const nodeMap: Record<string, { name: string }> = {}
    for (const id of result.elementIds) {
      nodeMap[id] = { name: elementLabel(slugForElementId(id)) }
    }
    for (const link of result.links) {
      if (!nodeMap[link.source]) {
        nodeMap[link.source] = { name: elementLabel(slugForElementId(link.source)) }
      }
      if (!nodeMap[link.target]) {
        nodeMap[link.target] = { name: elementLabel(slugForElementId(link.target)) }
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
        label: flowLabel(link.flow.slug),
      }
    })
    return edgeMap
  })

  return { nodes, edges }
}

import { propertyValues } from './designElement'
import type {
  DesignElement,
  PropertyKind,
  SynergyGraphResult,
  SynergyLink,
  SynergySearchCriteria,
} from './types'

export function mergeUnique<T>(first: T[], second: T[]): T[] {
  const result = [...first]
  for (const item of second) {
    if (!result.includes(item)) {
      result.push(item)
    }
  }
  return result
}

export function sortById<T extends { id: string }>(items: T[]): T[] {
  return [...items].sort((a, b) => a.id.localeCompare(b.id))
}

function elementHasAny(
  element: DesignElement,
  kind: PropertyKind,
  values: string[],
): boolean {
  const list = propertyValues(element, kind)
  if (!list.length) {
    return false
  }
  return values.some((value) => list.includes(value))
}

export function filterElements(
  elements: Record<string, DesignElement>,
  criteria: SynergySearchCriteria,
): Record<string, DesignElement> {
  const filtered: Record<string, DesignElement> = {}

  for (const element of Object.values(elements)) {
    let matches = false

    if (criteria.elementIds?.length) {
      matches = criteria.elementIds.includes(element.id) || matches
    }

    for (const kind of ['needs', 'products', 'behaviors'] as const) {
      const values = criteria[kind]
      if (values?.length) {
        matches = elementHasAny(element, kind, values) || matches
      }
    }

    if (matches) {
      filtered[element.id] = element
    }
  }

  return filtered
}

export function propertiesFromElements(
  elements: Record<string, DesignElement>,
  kinds: PropertyKind[] = ['needs', 'products', 'behaviors'],
): Record<PropertyKind, string[]> {
  const result = Object.fromEntries(
    kinds.map((kind) => [kind, [] as string[]]),
  ) as Record<PropertyKind, string[]>

  for (const element of Object.values(elements)) {
    for (const kind of kinds) {
      result[kind] = mergeUnique(result[kind], propertyValues(element, kind))
    }
  }

  return result
}

export function combineSynergyLinks(
  elements: Record<string, DesignElement>,
): SynergyLink[] {
  const producersByFlowId: Record<string, string[]> = {}

  for (const element of Object.values(elements)) {
    for (const product of element.products) {
      const flowId = product.flow.id
      if (!producersByFlowId[flowId]) {
        producersByFlowId[flowId] = []
      }
      producersByFlowId[flowId].push(element.id)
    }
  }

  const links: SynergyLink[] = []

  for (const element of Object.values(elements)) {
    for (const need of element.needs) {
      const producers = producersByFlowId[need.flow.id]
      if (!producers) {
        continue
      }
      for (const source of producers) {
        if (source === element.id) {
          continue
        }
        links.push({ source, target: element.id, flow: need.flow })
      }
    }
  }

  return links.sort((a, b) => {
    if (a.source !== b.source) {
      return a.source.localeCompare(b.source)
    }
    if (a.target !== b.target) {
      return a.target.localeCompare(b.target)
    }
    return a.flow.id.localeCompare(b.flow.id)
  })
}

export function resolveElementsForGraph(
  catalog: Record<string, DesignElement>,
  criteria: SynergySearchCriteria,
): Record<string, DesignElement> {
  let selected: Record<string, DesignElement> = {}
  const remaining: SynergySearchCriteria = { ...criteria }

  if (remaining.elementIds?.length) {
    selected = {
      ...selected,
      ...filterElements(catalog, { elementIds: remaining.elementIds }),
    }
    delete remaining.elementIds
  }

  if (
    remaining.needs?.length ||
    remaining.products?.length ||
    remaining.behaviors?.length
  ) {
    selected = {
      ...selected,
      ...filterElements(catalog, remaining),
    }
  } else if (Object.keys(selected).length > 0) {
    const inverted = propertiesFromElements(selected, ['needs', 'products'])
    selected = {
      ...selected,
      ...filterElements(catalog, {
        needs: inverted.products,
        products: inverted.needs,
      }),
    }
  }

  return selected
}

export function buildSynergyGraph(
  catalog: Record<string, DesignElement>,
  criteria: SynergySearchCriteria,
): SynergyGraphResult {
  const elements = resolveElementsForGraph(catalog, criteria)
  const links = combineSynergyLinks(elements)

  return {
    elementIds: Object.keys(elements).sort(),
    links,
  }
}

import type {
  PermacultureElement,
  PropertyKind,
  SearchRestrictions,
  SynergyGraphResult,
  SynergyLink,
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
  element: PermacultureElement,
  kind: PropertyKind,
  values: string[],
): boolean {
  const list = element[kind]
  if (!list) {
    return false
  }
  return values.some((value) => list.includes(value))
}

export function filterElements(
  elements: Record<string, PermacultureElement>,
  restrictions: SearchRestrictions,
): Record<string, PermacultureElement> {
  const filtered: Record<string, PermacultureElement> = {}

  for (const element of Object.values(elements)) {
    let matches = false

    if (restrictions.names?.length) {
      matches = restrictions.names.includes(element.id) || matches
    }

    for (const kind of ['needs', 'products', 'behaviors'] as const) {
      const values = restrictions[kind]
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
  elements: Record<string, PermacultureElement>,
  kinds: PropertyKind[] = ['needs', 'products', 'behaviors'],
): Record<PropertyKind, string[]> {
  const result = Object.fromEntries(
    kinds.map((kind) => [kind, [] as string[]]),
  ) as Record<PropertyKind, string[]>

  for (const element of Object.values(elements)) {
    for (const kind of kinds) {
      const list = element[kind]
      if (list) {
        result[kind] = mergeUnique(result[kind], list)
      }
    }
  }

  return result
}

export function combineSynergyLinks(
  elements: Record<string, PermacultureElement>,
): SynergyLink[] {
  const producersByProduct: Record<string, string[]> = {}

  for (const element of Object.values(elements)) {
    for (const product of element.products) {
      if (!producersByProduct[product]) {
        producersByProduct[product] = []
      }
      producersByProduct[product].push(element.id)
    }
  }

  const links: SynergyLink[] = []

  for (const element of Object.values(elements)) {
    for (const need of element.needs) {
      const producers = producersByProduct[need]
      if (!producers) {
        continue
      }
      for (const source of producers) {
        if (source === element.id) {
          continue
        }
        links.push({ source, target: element.id, type: need })
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
    return a.type.localeCompare(b.type)
  })
}

export function resolveElementsForGraph(
  catalog: Record<string, PermacultureElement>,
  restrictions: SearchRestrictions,
): Record<string, PermacultureElement> {
  let selected: Record<string, PermacultureElement> = {}
  const remaining: SearchRestrictions = { ...restrictions }

  if (remaining.names?.length) {
    selected = {
      ...selected,
      ...filterElements(catalog, { names: remaining.names }),
    }
    delete remaining.names
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
  catalog: Record<string, PermacultureElement>,
  restrictions: SearchRestrictions,
): SynergyGraphResult {
  const elements = resolveElementsForGraph(catalog, restrictions)
  const links = combineSynergyLinks(elements)

  return {
    elementIds: Object.keys(elements).sort(),
    links,
  }
}

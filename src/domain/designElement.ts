import type { DesignElement, ElementCharacteristic, PropertyKind } from './types'

export function needFlowIds(element: DesignElement): string[] {
  return element.needs.map((need) => need.flow.id)
}

export function productFlowIds(element: DesignElement): string[] {
  return element.products.map((product) => product.flow.id)
}

export function behaviorIds(element: DesignElement): string[] {
  return element.behaviors?.map((behavior) => behavior.id) ?? []
}

export function propertyValues(
  element: DesignElement,
  kind: PropertyKind,
): string[] {
  switch (kind) {
    case 'needs':
      return needFlowIds(element)
    case 'products':
      return productFlowIds(element)
    case 'behaviors':
      return behaviorIds(element)
  }
}

export function characteristicsRecord(
  element: DesignElement,
): Record<string, string> | undefined {
  if (!element.characteristics?.length) {
    return undefined
  }
  return Object.fromEntries(
    element.characteristics.map((c) => [c.key, c.value]),
  )
}

export function characteristic(
  element: DesignElement,
  key: string,
): ElementCharacteristic | undefined {
  return element.characteristics?.find((c) => c.key === key)
}

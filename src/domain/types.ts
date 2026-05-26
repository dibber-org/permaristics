/**
 * Domain model for Permaristics.
 *
 * Flow vs Synergy:
 * - A Flow is a kind of exchange in the design vocabulary (water, manure…). It exists
 *   in the catalog whether or not two elements are linked.
 * - A Synergy is a directed relationship between two DesignElements: one produces a
 *   flow that satisfies another's need. SynergyLinks are derived, not stored.
 */

/** Stable technical identity; slug is the semantic key for i18n and URLs. */
export interface Identified {
  id: string
  slug: string
}

/** Catalog entry: a flow shared by needs and products. */
export interface Flow extends Identified {}

/** A need on an element: requirement for a given flow. */
export interface ElementNeed {
  flow: Flow
}

/** A product on an element: provision of a given flow. */
export interface ElementProduct {
  flow: Flow
}

/**
 * Observable or functional trait of an element (fly, deciduous…).
 * Used for filtering and future rules; not part of the core synergy matching (needs/products).
 */
export interface ElementBehavior extends Identified {}

/**
 * Descriptive attribute (breed, size…). Free-form metadata for display or advanced search.
 */
export interface ElementCharacteristic {
  key: string
  value: string
}

/**
 * Taxonomic category (poultry, tree, pond…). Groups elements for UI and future constraints.
 */
export interface ElementType extends Identified {}

export interface DesignElement extends Identified {
  needs: ElementNeed[]
  products: ElementProduct[]
  behaviors?: ElementBehavior[]
  type?: ElementType
  characteristics?: ElementCharacteristic[]
}

export type PropertyKind = 'needs' | 'products' | 'behaviors'

/** Criteria use technical ids (flow.id, element.id, behavior.id). */
export interface SynergySearchCriteria {
  elementIds?: string[]
  needs?: string[]
  products?: string[]
  behaviors?: string[]
}

/** Directed synergy: source produces flow, target needs flow. */
export interface SynergyLink {
  source: string
  target: string
  flow: Flow
}

export interface SynergyGraphResult {
  elementIds: string[]
  links: SynergyLink[]
}

export interface Catalog {
  elements: DesignElement[]
  flows: Flow[]
}

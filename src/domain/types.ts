export interface PermacultureElement {
  id: string
  needs: string[]
  products: string[]
  behaviors?: string[]
  type?: string
  characteristics?: Record<string, string>
}

export type PropertyKind = 'needs' | 'products' | 'behaviors'

export interface SearchRestrictions {
  names?: string[]
  needs?: string[]
  products?: string[]
  behaviors?: string[]
}

export interface SynergyLink {
  source: string
  target: string
  type: string
}

export interface SynergyGraphResult {
  elementIds: string[]
  links: SynergyLink[]
}

/** Shape returned by a future API — same contract as the in-memory catalog. */
export interface ElementCatalogDto {
  elements: PermacultureElement[]
}

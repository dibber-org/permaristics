import { buildSynergyGraph } from '@/domain/synergy'
import type {
  PermacultureElement,
  SearchRestrictions,
  SynergyGraphResult,
} from '@/domain/types'
import { getCatalogRepository } from '@/repositories'

export class SynergyService {
  private catalogCache: Record<string, PermacultureElement> | null = null

  async loadCatalog(): Promise<Record<string, PermacultureElement>> {
    if (this.catalogCache) {
      return this.catalogCache
    }
    const { elements } = await getCatalogRepository().fetchCatalog()
    this.catalogCache = Object.fromEntries(
      elements.map((element) => [element.id, element]),
    )
    return this.catalogCache
  }

  async findCombinations(
    restrictions: SearchRestrictions,
  ): Promise<SynergyGraphResult> {
    const catalog = await this.loadCatalog()
    return buildSynergyGraph(catalog, restrictions)
  }
}

export const synergyService = new SynergyService()

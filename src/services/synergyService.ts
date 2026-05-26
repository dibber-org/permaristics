import { buildSynergyGraph } from '@/domain/synergy'
import type {
  Catalog,
  DesignElement,
  SynergyGraphResult,
  SynergySearchCriteria,
} from '@/domain/types'
import { getCatalogRepository } from '@/repositories'

export class SynergyService {
  private catalogCache: Catalog | null = null

  async loadCatalog(): Promise<Catalog> {
    if (this.catalogCache) {
      return this.catalogCache
    }
    this.catalogCache = await getCatalogRepository().fetchCatalog()
    return this.catalogCache
  }

  async loadElements(): Promise<Record<string, DesignElement>> {
    const { elements } = await this.loadCatalog()
    return Object.fromEntries(elements.map((element) => [element.id, element]))
  }

  async findSynergies(
    criteria: SynergySearchCriteria,
  ): Promise<SynergyGraphResult> {
    const catalog = await this.loadElements()
    return buildSynergyGraph(catalog, criteria)
  }
}

export const synergyService = new SynergyService()

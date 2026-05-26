import type { ElementCatalogDto } from '@/domain/types'
import type { CatalogRepository } from '../catalogRepository'
import { CONNECTION_IDS } from './connectionIds'
import { IN_MEMORY_ELEMENTS } from './elements'

export class InMemoryCatalogRepository implements CatalogRepository {
  async fetchCatalog(): Promise<ElementCatalogDto> {
    return { elements: [...IN_MEMORY_ELEMENTS] }
  }

  /** Ids for needs/products dropdowns (stable list, API-ready). */
  getConnectionIds(): readonly string[] {
    return CONNECTION_IDS
  }
}

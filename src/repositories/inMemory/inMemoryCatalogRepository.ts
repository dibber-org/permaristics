import type { Catalog } from '@/domain/types'
import type { CatalogRepository } from '../catalogRepository'
import { mapInMemoryCatalog } from './catalogMapper'

export class InMemoryCatalogRepository implements CatalogRepository {
  async fetchCatalog(): Promise<Catalog> {
    return mapInMemoryCatalog()
  }
}

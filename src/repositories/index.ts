import type { CatalogRepository } from './catalogRepository'
import { InMemoryCatalogRepository } from './inMemory/inMemoryCatalogRepository'

let catalogRepository: CatalogRepository = new InMemoryCatalogRepository()

export function getCatalogRepository(): CatalogRepository {
  return catalogRepository
}

/** Swap implementation when an API backend is available. */
export function setCatalogRepository(repository: CatalogRepository): void {
  catalogRepository = repository
}

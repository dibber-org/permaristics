import type { Catalog } from '@/domain/types'

/** Abstraction over local data or a future HTTP API. */
export interface CatalogRepository {
  fetchCatalog(): Promise<Catalog>
}

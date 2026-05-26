import type { ElementCatalogDto } from '@/domain/types'

/** Abstraction over local data or a future HTTP API. */
export interface CatalogRepository {
  fetchCatalog(): Promise<ElementCatalogDto>
}

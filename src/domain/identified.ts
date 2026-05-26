import type { Flow, Identified } from './types'

/** In-memory and tests: id equals slug until a backend supplies UUIDs. */
export function identifiedFromSlug(slug: string): Identified {
  return { id: slug, slug }
}

export function flowFromSlug(slug: string): Flow {
  return identifiedFromSlug(slug)
}

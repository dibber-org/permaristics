import { flowFromSlug, identifiedFromSlug } from '@/domain/identified'
import type {
  Catalog,
  DesignElement,
  ElementBehavior,
  ElementNeed,
  ElementProduct,
  ElementType,
  Flow,
} from '@/domain/types'
import type { DesignElementSeed } from './seeds/elementSeeds'
import { ELEMENT_SEEDS } from './seeds/elementSeeds'
import { FLOW_SLUGS } from './seeds/flowSlugs'

function toElementType(slug: string): ElementType {
  return identifiedFromSlug(slug)
}

function toBehavior(slug: string): ElementBehavior {
  return identifiedFromSlug(slug)
}

function toNeed(flowSlug: string): ElementNeed {
  return { flow: flowFromSlug(flowSlug) }
}

function toProduct(flowSlug: string): ElementProduct {
  return { flow: flowFromSlug(flowSlug) }
}

export function mapFlowSeed(slug: string): Flow {
  return flowFromSlug(slug)
}

export function mapElementSeed(seed: DesignElementSeed): DesignElement {
  const base = identifiedFromSlug(seed.slug)
  return {
    ...base,
    needs: seed.needs.map(toNeed),
    products: seed.products.map(toProduct),
    behaviors: seed.behaviorSlugs?.map(toBehavior),
    type: seed.typeSlug ? toElementType(seed.typeSlug) : undefined,
    characteristics: seed.characteristics,
  }
}

export function mapInMemoryCatalog(): Catalog {
  return {
    flows: FLOW_SLUGS.map(mapFlowSeed),
    elements: ELEMENT_SEEDS.map(mapElementSeed),
  }
}

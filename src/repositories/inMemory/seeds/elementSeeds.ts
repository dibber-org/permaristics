/** In-memory seed rows — slugs only; mapped to domain entities in catalogMapper. */
export interface DesignElementSeed {
  slug: string
  needs: string[]
  products: string[]
  behaviorSlugs?: string[]
  typeSlug?: string
  characteristics?: { key: string; value: string }[]
}

export const ELEMENT_SEEDS: DesignElementSeed[] = [
  {
    slug: 'chicken',
    needs: [
      'insect',
      'air',
      'water',
      'shelter',
      'protection',
      'community',
      'grit',
      'dust',
      'disease-control',
    ],
    products: [
      'egg',
      'meat',
      'manure',
      'feather',
      'scraping',
      'co2',
      'heat',
      'deworming',
    ],
    typeSlug: 'poultry',
    characteristics: [
      { key: 'breed', value: '...' },
      { key: 'color', value: '...' },
      { key: 'layability', value: '...' },
      { key: 'meat', value: '...' },
      { key: 'climat', value: '...' },
    ],
    behaviorSlugs: ['fly', 'noise', 'fight'],
  },
  {
    slug: 'pond',
    needs: ['space'],
    products: ['water', 'micro-climate', 'insect'],
    characteristics: [
      { key: 'size', value: '...' },
      { key: 'deepness', value: '...' },
    ],
    behaviorSlugs: ['fills-up-with-rain'],
  },
  {
    slug: 'oak',
    needs: ['air', 'soil', 'water', 'sunlight', 'space'],
    products: [
      'oxygen',
      'wood',
      'shade',
      'windbreak',
      'leaf',
      'habitat',
      'acorn',
      'moisture',
    ],
    typeSlug: 'tree',
    characteristics: [
      { key: 'specie', value: '...' },
      { key: 'bark', value: '...' },
      { key: 'longevity', value: '...' },
      { key: 'leaf-shape', value: '...' },
      { key: 'size', value: '...' },
      { key: 'root-pattern', value: '...' },
    ],
    behaviorSlugs: [
      'growth-towards-light',
      'spreading-to-fill-space',
      'slow-growth',
      'deciduous',
    ],
  },
]

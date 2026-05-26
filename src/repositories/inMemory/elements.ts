import type { PermacultureElement } from '@/domain/types'

/** Catalog data without display labels — i18n keys use these ids. */
export const IN_MEMORY_ELEMENTS: PermacultureElement[] = [
  {
    id: 'chicken',
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
    type: 'poultry',
    characteristics: {
      breed: '...',
      color: '...',
      layability: '...',
      meat: '...',
      climat: '...',
    },
    behaviors: ['fly', 'noise', 'fight'],
  },
  {
    id: 'pond',
    needs: ['space'],
    products: ['water', 'micro-climate', 'insect'],
    characteristics: {
      size: '...',
      deepness: '...',
    },
    behaviors: ['fills-up-with-rain'],
  },
  {
    id: 'oak',
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
    type: 'tree',
    characteristics: {
      specie: '...',
      bark: '...',
      longevity: '...',
      'leaf-shape': '...',
      size: '...',
      'root-pattern': '...',
    },
    behaviors: [
      'growth-towards-light',
      'spreading-to-fill-space',
      'slow-growth',
      'deciduous',
    ],
  },
]

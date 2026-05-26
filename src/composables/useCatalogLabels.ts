import { useI18n } from 'vue-i18n'

export function useCatalogLabels() {
  const { t, te } = useI18n()

  function flowLabel(slug: string): string {
    const key = `flows.${slug}`
    return te(key) ? t(key) : slug
  }

  function elementLabel(slug: string): string {
    const key = `catalog.elements.${slug}`
    return te(key) ? t(key) : slug
  }

  return { flowLabel, elementLabel }
}

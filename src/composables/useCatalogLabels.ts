import { useI18n } from 'vue-i18n'

export function useCatalogLabels() {
  const { t, te } = useI18n()

  function connectionLabel(id: string): string {
    const key = `connections.${id}`
    return te(key) ? t(key) : id
  }

  function elementLabel(id: string): string {
    const key = `catalog.elements.${id}`
    return te(key) ? t(key) : id
  }

  return { connectionLabel, elementLabel }
}

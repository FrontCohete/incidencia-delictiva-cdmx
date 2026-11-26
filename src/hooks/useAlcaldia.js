import { useCallback, useEffect, useState } from 'react'
import { porSlug } from '../datos/indice.js'

const PARAMETRO = 'alcaldia'

export function useAlcaldia(inicial) {
  const [slug, setSlug] = useState(inicial)

  useEffect(() => {
    const desdeUrl = new URLSearchParams(window.location.search).get(PARAMETRO)
    if (desdeUrl && porSlug[desdeUrl]) setSlug(desdeUrl)
  }, [])

  const elegir = useCallback((nuevo) => {
    if (!porSlug[nuevo]) return
    setSlug(nuevo)
    const url = new URL(window.location.href)
    url.searchParams.set(PARAMETRO, nuevo)
    window.history.replaceState(null, '', url)
  }, [])

  return [slug, elegir]
}

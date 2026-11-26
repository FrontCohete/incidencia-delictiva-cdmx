import { useCallback, useSyncExternalStore } from 'react'
import { almacenamiento } from '../config/sitio.js'

const oyentes = new Set()

const leer = () => (document.documentElement.dataset.tema === 'claro' ? 'claro' : 'oscuro')

const suscribir = (oyente) => {
  oyentes.add(oyente)
  return () => oyentes.delete(oyente)
}

const guardar = (tema) => {
  try {
    localStorage.setItem(almacenamiento.tema, tema)
    localStorage.setItem(almacenamiento.temaPanelMapa, tema)
    if (localStorage.getItem(almacenamiento.temaMapa) !== 'calles') {
      localStorage.setItem(almacenamiento.temaMapa, tema)
    }
  } catch {
    return
  }
}

export function useTema() {
  const tema = useSyncExternalStore(suscribir, leer, () => 'oscuro')

  const alternar = useCallback(() => {
    const siguiente = leer() === 'oscuro' ? 'claro' : 'oscuro'
    document.documentElement.dataset.tema = siguiente
    guardar(siguiente)
    oyentes.forEach((oyente) => oyente())
  }, [])

  return { tema, alternar }
}

import { useEffect, useState } from 'react'

export function useSeccionActiva(ids) {
  const [activa, setActiva] = useState('')

  useEffect(() => {
    const elementos = ids.map((id) => document.getElementById(id)).filter(Boolean)
    if (elementos.length === 0 || !('IntersectionObserver' in window)) return undefined

    const observador = new IntersectionObserver(
      (entradas) => {
        const visible = entradas.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
        if (visible) setActiva(visible.target.id)
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 },
    )

    elementos.forEach((el) => observador.observe(el))
    return () => observador.disconnect()
  }, [ids])

  return activa
}

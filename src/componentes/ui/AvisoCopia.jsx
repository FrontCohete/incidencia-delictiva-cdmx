import { useEffect } from 'react'
import { sitio } from '../../config/sitio.js'
import estilos from './AvisoCopia.module.css'

const ESPERA_MS = 6000

export default function AvisoCopia({ original }) {
  useEffect(() => {
    if (!original) return undefined
    const temporizador = window.setTimeout(() => window.location.replace(original), ESPERA_MS)
    return () => window.clearTimeout(temporizador)
  }, [original])

  return (
    <main className={estilos.aviso}>
      <p className={estilos.etiqueta}>Copia no autorizada</p>
      <h1 className={estilos.titulo}>Este sitio es una copia de «{sitio.titulo}»</h1>
      {original ? (
        <p className={estilos.texto}>
          Te llevaremos a la versión original en unos segundos. También puedes ir ahora:{' '}
          <a href={original}>{original}</a>
        </p>
      ) : (
        <p className={estilos.texto}>Consulta la versión publicada por su autor.</p>
      )}
    </main>
  )
}

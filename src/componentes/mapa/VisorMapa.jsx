import { useEffect, useRef } from 'react'
import { rutaMapa } from '../../config/sitio.js'
import Icono from '../ui/Icono.jsx'
import estilos from './VisorMapa.module.css'

export default function VisorMapa({ slug, nombre, tema }) {
  const marco = useRef(null)
  const temaAplicado = useRef(tema)

  useEffect(() => {
    if (temaAplicado.current === tema) return
    temaAplicado.current = tema
    marco.current?.contentWindow?.postMessage({ tipo: 'tema', valor: tema }, window.location.origin)
  }, [tema])

  return (
    <div className={estilos.visor}>
      <div className={estilos.barra}>
        <p className={estilos.nombre}>
          <span className={estilos.etiqueta}>Mapa interactivo</span>
          {nombre}
        </p>
        <a className={estilos.abrir} href={rutaMapa(slug)} aria-label={`Abrir el mapa de ${nombre} en pantalla completa`}>
          <span>Pantalla completa</span>
          <Icono nombre="externo" tamano={16} />
        </a>
      </div>
      <div className={estilos.lienzo}>
        <p className={estilos.cargando} aria-hidden="true">
          Cargando el mapa de {nombre}…
        </p>
        <iframe
          key={slug}
          ref={marco}
          className={estilos.marco}
          src={rutaMapa(slug)}
          title={`Mapa interactivo de zonas de alta incidencia delictiva en ${nombre}`}
          loading="lazy"
          referrerPolicy="same-origin"
          allow="fullscreen"
        />
      </div>
    </div>
  )
}

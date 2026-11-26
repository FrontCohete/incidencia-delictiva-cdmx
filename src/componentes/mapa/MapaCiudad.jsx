import { useState } from 'react'
import { ciudad, porSlug } from '../../datos/indice.js'
import { radioZona } from '../../utilidades/formato.js'
import estilos from './MapaCiudad.module.css'

export default function MapaCiudad({ seleccionada, onElegir }) {
  const [enfocada, setEnfocada] = useState('')
  const visible = enfocada || seleccionada
  const contorno = ciudad.alcaldias.find((a) => a.slug === seleccionada)

  const alTeclear = (evento, slug) => {
    if (evento.key === 'Enter' || evento.key === ' ') {
      evento.preventDefault()
      onElegir(slug)
    }
  }

  return (
    <figure className={estilos.figura}>
      <svg
        className={estilos.plano}
        viewBox={`0 0 ${ciudad.ancho} ${ciudad.alto}`}
        role="group"
        aria-label="Plano de la Ciudad de México por alcaldía"
      >
        {ciudad.alcaldias.map(({ slug, nombre, d }) => (
          <path
            key={slug}
            d={d}
            role="button"
            tabIndex={0}
            aria-label={nombre}
            aria-pressed={slug === seleccionada}
            className={`${estilos.alcaldia} ${slug === seleccionada ? estilos.activa : ''}`}
            onClick={() => onElegir(slug)}
            onKeyDown={(evento) => alTeclear(evento, slug)}
            onMouseEnter={() => setEnfocada(slug)}
            onMouseLeave={() => setEnfocada('')}
            onFocus={() => setEnfocada(slug)}
            onBlur={() => setEnfocada('')}
          />
        ))}
        {contorno && <path d={contorno.d} className={estilos.contorno} aria-hidden="true" />}
        <g className={estilos.zonas} aria-hidden="true">
          {ciudad.zonas.map(([x, y, victimas, nivel, slug, codigo]) => (
            <circle
              key={`${slug}-${codigo}`}
              cx={x}
              cy={y}
              r={radioZona(victimas, 0.2, 2.4)}
              className={nivel === 1 ? estilos.muyAlta : estilos.alta}
            />
          ))}
        </g>
      </svg>
      <figcaption className={estilos.rotulo} aria-hidden="true">
        {porSlug[visible]?.alcaldia}
      </figcaption>
    </figure>
  )
}

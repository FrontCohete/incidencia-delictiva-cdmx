import { sitio } from '../../config/sitio.js'
import { ciudad } from '../../datos/indice.js'
import { radioZona } from '../../utilidades/formato.js'
import estilos from './Portada.module.css'

const TANDAS = 10

const zonas = [...ciudad.zonas].sort((a, b) => a[3] - b[3] || b[2] - a[2])

export default function Portada() {
  return (
    <section id="inicio" className={estilos.portada} aria-labelledby="titulo-sitio">
      <div className={estilos.escena} aria-hidden="true">
        <svg
          className={estilos.plano}
          viewBox={`0 0 ${ciudad.ancho} ${ciudad.alto}`}
          preserveAspectRatio="xMidYMid meet"
          focusable="false"
        >
          <g className={estilos.limites}>
            {ciudad.alcaldias.map(({ slug, d }) => (
              <path key={slug} d={d} />
            ))}
          </g>
          <g>
            {zonas.map(([x, y, victimas, nivel, slug, codigo], i) => (
              <circle
                key={`${slug}-${codigo}`}
                cx={x}
                cy={y}
                r={radioZona(victimas)}
                className={`${nivel === 1 ? estilos.muyAlta : estilos.alta} ${estilos[`t${Math.floor((i / zonas.length) * TANDAS)}`]}`}
              />
            ))}
          </g>
        </svg>
      </div>

      <div className={estilos.contenido}>
        <p className={estilos.etiqueta}>
          <span className={estilos.marca} aria-hidden="true" />
          {sitio.etiquetaCaso}
        </p>
        <h1 id="titulo-sitio" className={estilos.titulo}>
          {sitio.titulo}
        </h1>
      </div>
    </section>
  )
}

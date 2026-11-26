import { alcaldiasAlfabeticas, porSlug } from '../../datos/indice.js'
import { entero, oracion } from '../../utilidades/formato.js'
import Seccion from '../estructura/Seccion.jsx'
import MapaCiudad from '../mapa/MapaCiudad.jsx'
import VisorMapa from '../mapa/VisorMapa.jsx'
import estilos from './Explorador.module.css'

const INTRO =
  'Elige una alcaldía en el plano o en la lista. Dentro del mapa puedes encender y apagar capas, filtrar por año, gravedad o tipo de delito, y tocar una zona para leer su ficha.'

export default function Explorador({ alcaldia, onElegir, tema }) {
  const datos = porSlug[alcaldia]

  const ficha = [
    { clave: 'Zonas relevantes', valor: entero(datos.hotspots_relevantes) },
    { clave: 'De concentración muy alta', valor: entero(datos.hotspots_prioritarios) },
    { clave: 'Víctimas analizadas', valor: entero(datos.puntos_analizados) },
    { clave: 'Superficie', valor: `${entero(datos.area_km2)} km²` },
  ]

  return (
    <Seccion id="explorar" titulo="Explora una alcaldía" intro={INTRO}>
      <div className={estilos.disposicion}>
        <div className={estilos.selector} role="group" aria-label="Elegir alcaldía">
          <div className={estilos.plano}>
            <MapaCiudad seleccionada={alcaldia} onElegir={onElegir} />
          </div>

          <label className={estilos.campo}>
            <span className={estilos.campoEtiqueta}>Alcaldía</span>
            <select className={estilos.lista} value={alcaldia} onChange={(e) => onElegir(e.target.value)}>
              {alcaldiasAlfabeticas.map((a) => (
                <option key={a.slug} value={a.slug}>
                  {a.alcaldia}
                </option>
              ))}
            </select>
          </label>

          <dl className={estilos.ficha} aria-live="polite">
            {ficha.map(({ clave, valor }) => (
              <div key={clave} className={estilos.fichaFila}>
                <dt>{clave}</dt>
                <dd>{valor}</dd>
              </div>
            ))}
            <div className={`${estilos.fichaFila} ${estilos.fichaTexto}`}>
              <dt>Delito más frecuente</dt>
              <dd>{oracion(datos.delito_mas_frecuente)}</dd>
            </div>
          </dl>
        </div>

        <VisorMapa slug={alcaldia} nombre={datos.alcaldia} tema={tema} />
      </div>
    </Seccion>
  )
}

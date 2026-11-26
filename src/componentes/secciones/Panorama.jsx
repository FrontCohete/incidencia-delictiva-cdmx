import { alcaldias, meta, relevantes, totales } from '../../datos/indice.js'
import { entero, oracion, porcentaje } from '../../utilidades/formato.js'
import Seccion from '../estructura/Seccion.jsx'
import Barra from '../ui/Barra.jsx'
import Icono from '../ui/Icono.jsx'
import estilos from './Panorama.module.css'

const FRANJAS = ['Madrugada', 'Mañana', 'Tarde', 'Noche']
const HORARIOS = ['0 a 6 h', '6 a 12 h', '12 a 18 h', '18 a 24 h']

const cifras = [
  { valor: entero(totales.analizadas), texto: 'víctimas analizadas en las 16 alcaldías' },
  { valor: entero(totales.zonas), texto: 'zonas de concentración detectadas' },
  {
    valor: entero(totales.relevantes),
    texto: `zonas de concentración alta o muy alta; ${entero(totales.muyAltas)} son muy altas`,
  },
  { valor: porcentaje(totales.enZonas, totales.analizadas), texto: 'de las víctimas quedó dentro de alguna zona' },
]

const delitos = relevantes.delitos.slice(0, 6)
const maxDelitos = Math.max(...delitos.map(([, n]) => n))
const maxFranja = Math.max(...relevantes.franjas)
const totalFranjas = relevantes.franjas.reduce((a, b) => a + b, 0)
const entreSemana = relevantes.dias.slice(0, 5).reduce((a, b) => a + b, 0) / 5
const finDeSemana = relevantes.dias.slice(5).reduce((a, b) => a + b, 0) / 2
const caidaFinDeSemana = porcentaje(entreSemana - finDeSemana, entreSemana)
const maxRelevantes = Math.max(...alcaldias.map((a) => a.hotspots_relevantes))

export default function Panorama({ onExplorar }) {
  return (
    <Seccion
      id="panorama"
      titulo="La ciudad en cifras"
      tono="elevado"
      intro={`De ${meta.periodo} se analizaron las víctimas de delitos moderados, graves y muy graves con ubicación dentro de la ciudad. Así se reparten.`}
    >
      <dl className={estilos.cifras}>
        {cifras.map(({ valor, texto }) => (
          <div key={texto} className={estilos.cifra}>
            <dt className={estilos.cifraTexto}>{texto}</dt>
            <dd className={estilos.cifraValor}>{valor}</dd>
          </div>
        ))}
      </dl>

      <div className={estilos.paneles}>
        <figure className={estilos.panel}>
          <figcaption className={estilos.panelTitulo}>
            <h3>Qué predomina en las {entero(relevantes.zonas)} zonas relevantes</h3>
            <p>Número de zonas según el delito con más víctimas en cada una.</p>
          </figcaption>
          <ol className={estilos.barras}>
            {delitos.map(([delito, n]) => (
              <li key={delito} className={estilos.fila}>
                <span className={estilos.filaEtiqueta}>{oracion(delito)}</span>
                <span className={estilos.filaValor}>{entero(n)}</span>
                <Barra className={estilos.filaBarra} maximo={maxDelitos} segmentos={[{ valor: n, tono: 'zona' }]} />
              </li>
            ))}
          </ol>
        </figure>

        <figure className={estilos.panel}>
          <figcaption className={estilos.panelTitulo}>
            <h3>A qué hora ocurren</h3>
            <p>
              Reparto, según la hora del hecho, de las {entero(relevantes.victimas)} víctimas registradas dentro de
              esas zonas.
            </p>
          </figcaption>
          <ol className={estilos.barras}>
            {relevantes.franjas.map((n, i) => (
              <li key={FRANJAS[i]} className={estilos.fila}>
                <span className={estilos.filaEtiqueta}>
                  {FRANJAS[i]} <span className={estilos.horario}>{HORARIOS[i]}</span>
                </span>
                <span className={estilos.filaValor}>{porcentaje(n, totalFranjas)}</span>
                <Barra
                  className={estilos.filaBarra}
                  maximo={maxFranja}
                  segmentos={[{ valor: n, tono: n === maxFranja ? 'acento' : 'grafito' }]}
                />
              </li>
            ))}
          </ol>
          <p className={estilos.notaPanel}>
            En sábado y domingo se registran {caidaFinDeSemana} menos víctimas por día que entre semana.
          </p>
        </figure>
      </div>

      <div className={estilos.ranking}>
        <div className={estilos.rankingCabecera}>
          <h3 className={estilos.rankingTitulo}>Zonas relevantes por alcaldía</h3>
          <ul className={estilos.rankingLeyenda}>
            <li>
              <span className={`${estilos.clave} ${estilos.claveMuyAlta}`} aria-hidden="true" />
              Concentración muy alta
            </li>
            <li>
              <span className={`${estilos.clave} ${estilos.claveAlta}`} aria-hidden="true" />
              Concentración alta
            </li>
          </ul>
        </div>

        <table className={estilos.tabla}>
          <caption className="oculto">
            Zonas de concentración alta y muy alta, víctimas analizadas y delito más frecuente en cada alcaldía
          </caption>
          <thead>
            <tr>
              <th scope="col">Alcaldía</th>
              <th scope="col">Zonas relevantes</th>
              <th scope="col" className={estilos.numerica}>
                Víctimas analizadas
              </th>
              <th scope="col">Delito más frecuente</th>
              <th scope="col">
                <span className="oculto">Mapa</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {alcaldias.map((a) => (
              <tr key={a.slug}>
                <th scope="row" className={estilos.nombre}>
                  {a.alcaldia}
                </th>
                <td className={estilos.zonas}>
                  <span className={estilos.zonasCifra}>
                    <strong>{a.hotspots_relevantes}</strong>
                    <span>
                      {a.hotspots_prioritarios} muy {a.hotspots_prioritarios === 1 ? 'alta' : 'altas'}
                    </span>
                  </span>
                  <Barra
                    maximo={maxRelevantes}
                    segmentos={[
                      { valor: a.hotspots_prioritarios, tono: 'zona' },
                      { valor: a.hotspots_altos, tono: 'zonaTenue' },
                    ]}
                  />
                </td>
                <td className={`${estilos.numerica} ${estilos.dato}`} data-etiqueta="Víctimas analizadas">
                  {entero(a.puntos_analizados)}
                </td>
                <td className={estilos.delito} data-etiqueta="Delito más frecuente">
                  {oracion(a.delito_mas_frecuente)}
                </td>
                <td className={estilos.accion}>
                  <button type="button" className={estilos.ver} onClick={() => onExplorar(a.slug)}>
                    <span>
                      Ver mapa<span className="oculto"> de {a.alcaldia}</span>
                    </span>
                    <Icono nombre="flecha" tamano={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className={estilos.notaTabla}>
          Cada alcaldía se compara contra su propia densidad habitual, así que el número de zonas no mide cuál es más
          insegura: depende también de su tamaño, de cuánta gente la habita o la cruza y de cómo se reparte su
          territorio.
        </p>
      </div>
    </Seccion>
  )
}

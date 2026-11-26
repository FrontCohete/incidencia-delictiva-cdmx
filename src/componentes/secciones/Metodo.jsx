import { fichaTecnica, fuentes, herramientas, introMetodo, pasosMetodo } from '../../contenido/metodo.js'
import { meta, totales } from '../../datos/indice.js'
import Seccion from '../estructura/Seccion.jsx'
import Icono from '../ui/Icono.jsx'
import estilos from './Metodo.module.css'

const pasos = pasosMetodo(meta, totales)
const ficha = fichaTecnica(meta)

export default function Metodo() {
  return (
    <Seccion id="metodo" etiqueta="Nota metodológica" titulo="Cómo se obtuvieron los resultados" intro={introMetodo}>
      <div className={estilos.disposicion}>
        <ol className={estilos.pasos}>
          {pasos.map(({ titulo, texto }, i) => (
            <li key={titulo} className={estilos.paso}>
              <span className={estilos.numero} aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className={estilos.pasoTitulo}>{titulo}</h3>
                <p className={estilos.pasoTexto}>{texto}</p>
              </div>
            </li>
          ))}
        </ol>

        <aside className={estilos.lateral} aria-label="Ficha técnica y fuentes">
          <section className={estilos.caja} aria-labelledby="ficha-tecnica">
            <h3 id="ficha-tecnica" className={estilos.cajaTitulo}>
              Ficha técnica
            </h3>
            <dl className={estilos.ficha}>
              {ficha.map(({ clave, valor }) => (
                <div key={clave} className={estilos.fichaFila}>
                  <dt>{clave}</dt>
                  <dd>{valor}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className={estilos.caja} aria-labelledby="fuentes-datos">
            <h3 id="fuentes-datos" className={estilos.cajaTitulo}>
              Fuentes
            </h3>
            <ul className={estilos.fuentes}>
              {fuentes.map(({ nombre, detalle, url }) => (
                <li key={nombre}>
                  <a href={url} target="_blank" rel="noopener noreferrer" className={estilos.fuente}>
                    <span className={estilos.fuenteNombre}>
                      {nombre}
                      <Icono nombre="externo" tamano={14} />
                    </span>
                    <span className={estilos.fuenteDetalle}>{detalle}</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <section className={estilos.caja} aria-labelledby="herramientas">
            <h3 id="herramientas" className={estilos.cajaTitulo}>
              Herramientas
            </h3>
            <ul className={estilos.herramientas}>
              {herramientas.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </section>
        </aside>
      </div>
    </Seccion>
  )
}

import { controles, gravedades, introLectura } from '../../contenido/lectura.js'
import Seccion from '../estructura/Seccion.jsx'
import { Muestra } from '../ui/Glifo.jsx'
import estilos from './ComoLeer.module.css'

const niveles = [
  { clase: 'muyAlta', nombre: 'Concentración muy alta', detalle: 'El núcleo es 3 veces o más denso que lo habitual en la alcaldía.' },
  { clase: 'alta', nombre: 'Concentración alta', detalle: 'Entre 2 y 3 veces más denso.' },
  { clase: 'moderada', nombre: 'Concentración moderada', detalle: 'Agrupación real, pero menos de 2 veces más densa.' },
]

export default function ComoLeer() {
  return (
    <Seccion id="como-leer" titulo="Cómo leer un mapa" intro={introLectura} tono="elevado">
      <div className={estilos.disposicion}>
        <div className={estilos.leyenda}>
          <h3 className={estilos.subtitulo}>La leyenda</h3>

          <section className={estilos.bloque} aria-labelledby="leyenda-gravedad">
            <h4 id="leyenda-gravedad" className={estilos.bloqueTitulo}>
              Color de los puntos: gravedad del delito
            </h4>
            <ul className={estilos.items}>
              {gravedades.map(({ clase, nombre, ejemplos }) => (
                <li key={clase} className={estilos.item}>
                  <Muestra clase={clase} />
                  <span>
                    <strong>{nombre}.</strong> {ejemplos}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section className={estilos.bloque} aria-labelledby="leyenda-zonas">
            <h4 id="leyenda-zonas" className={estilos.bloqueTitulo}>
              Círculos: nivel de concentración
            </h4>
            <ul className={estilos.items}>
              {niveles.map(({ clase, nombre, detalle }) => (
                <li key={clase} className={estilos.item}>
                  <Muestra clase={clase} />
                  <span>
                    <strong>{nombre}.</strong> {detalle}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section className={estilos.bloque} aria-labelledby="leyenda-calor">
            <h4 id="leyenda-calor" className={estilos.bloqueTitulo}>
              Mapa de calor: densidad de víctimas
            </h4>
            <div className={estilos.gradiente} aria-hidden="true" />
            <div className={estilos.extremos}>
              <span>Baja</span>
              <span>Alta</span>
            </div>
          </section>
        </div>

        <div>
          <h3 className={estilos.subtitulo}>Los controles</h3>
          <dl className={estilos.controles}>
            {controles.map(({ nombre, opciones, texto }) => (
              <div key={nombre} className={estilos.control}>
                <dt className={estilos.controlNombre}>{nombre}</dt>
                <dd className={estilos.controlTexto}>
                  {opciones.length > 0 && (
                    <span className={estilos.opciones}>
                      {opciones.map((opcion) => (
                        <span key={opcion} className={estilos.opcion}>
                          {opcion}
                        </span>
                      ))}
                    </span>
                  )}
                  {texto}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Seccion>
  )
}

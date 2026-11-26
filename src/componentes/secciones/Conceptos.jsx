import { conceptos, introConceptos } from '../../contenido/conceptos.js'
import Seccion from '../estructura/Seccion.jsx'
import Glifo, { Muestra } from '../ui/Glifo.jsx'
import estilos from './Conceptos.module.css'

export default function Conceptos() {
  return (
    <Seccion id="que-muestran" titulo="Qué muestran los mapas" intro={introConceptos}>
      <ul className={estilos.rejilla}>
        {conceptos.map(({ id, titulo, texto, leyenda }) => (
          <li key={id} className={estilos.concepto}>
            <Glifo tipo={id} />
            <h3 className={estilos.titulo}>{titulo}</h3>
            <p className={estilos.texto}>{texto}</p>
            <ul className={estilos.leyenda} aria-label={`Leyenda de ${titulo.toLowerCase()}`}>
              {leyenda.map(({ clase, texto: etiqueta }) => (
                <li key={clase}>
                  <Muestra clase={clase} />
                  {etiqueta}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </Seccion>
  )
}

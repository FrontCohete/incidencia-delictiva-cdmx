import { introPrecauciones, precauciones } from '../../contenido/precauciones.js'
import Seccion from '../estructura/Seccion.jsx'
import estilos from './Precauciones.module.css'

export default function Precauciones() {
  return (
    <Seccion id="precauciones" titulo="Antes de sacar conclusiones" intro={introPrecauciones}>
      <ul className={estilos.rejilla}>
        {precauciones.map(({ titulo, texto }) => (
          <li key={titulo} className={estilos.tarjeta}>
            <h3 className={estilos.titulo}>{titulo}</h3>
            <p className={estilos.texto}>{texto}</p>
          </li>
        ))}
      </ul>
    </Seccion>
  )
}

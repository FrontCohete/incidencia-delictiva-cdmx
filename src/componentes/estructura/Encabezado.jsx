import { useEffect, useState } from 'react'
import { idsSecciones, secciones } from '../../contenido/navegacion.js'
import { useSeccionActiva } from '../../hooks/useSeccionActiva.js'
import BotonTema from '../ui/BotonTema.jsx'
import Icono from '../ui/Icono.jsx'
import estilos from './Encabezado.module.css'

export default function Encabezado({ tema, onAlternarTema }) {
  const activa = useSeccionActiva(idsSecciones)
  const [abierto, setAbierto] = useState(false)

  useEffect(() => {
    if (!abierto) return undefined
    const alPresionar = (evento) => {
      if (evento.key === 'Escape') setAbierto(false)
    }
    window.addEventListener('keydown', alPresionar)
    return () => window.removeEventListener('keydown', alPresionar)
  }, [abierto])

  return (
    <header className={estilos.encabezado}>
      <div className={estilos.barra}>
        <a href="#inicio" className={estilos.marca} aria-label="Ir al inicio">
          <span className={estilos.glifo} aria-hidden="true" />
          <span className={estilos.marcaTexto}>Alta incidencia delictiva</span>
          <span className={estilos.marcaDato}>CDMX</span>
        </a>

        <nav className={estilos.nav} aria-label="Secciones de la página">
          <button
            type="button"
            className={estilos.alternarMenu}
            aria-expanded={abierto}
            aria-controls="menu-secciones"
            onClick={() => setAbierto((valor) => !valor)}
          >
            <Icono nombre={abierto ? 'cerrar' : 'menu'} />
            <span>Secciones</span>
          </button>
          <ul id="menu-secciones" className={`${estilos.lista} ${abierto ? estilos.abierta : ''}`}>
            {secciones.map(({ id, etiqueta }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className={estilos.enlace}
                  aria-current={activa === id ? 'location' : undefined}
                  onClick={() => setAbierto(false)}
                >
                  {etiqueta}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <BotonTema tema={tema} onAlternar={onAlternarTema} />
      </div>
    </header>
  )
}

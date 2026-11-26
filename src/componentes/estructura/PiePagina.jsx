import { sitio } from '../../config/sitio.js'
import { fuentes } from '../../contenido/metodo.js'
import Icono from '../ui/Icono.jsx'
import estilos from './PiePagina.module.css'

const perfiles = [
  { nombre: 'LinkedIn', icono: 'linkedin', url: sitio.linkedin },
  { nombre: 'GitHub', icono: 'repositorio', url: sitio.repositorio },
]

const mapasBase = [
  { nombre: 'Esri', url: 'https://www.esri.com/' },
  { nombre: 'OpenStreetMap', url: 'https://www.openstreetmap.org/copyright' },
]

export default function PiePagina() {
  const anio = new Date().getFullYear()

  return (
    <footer className={estilos.pie}>
      <div className={estilos.contenedor}>
        <div className={estilos.identidad}>
          <p className={estilos.titulo}>{sitio.titulo}</p>
          <p className={estilos.nota}>
            Sitio informativo construido con datos abiertos. Los registros pertenecen a sus fuentes; el análisis y
            los mapas, a su autor.
          </p>
        </div>

        <nav className={estilos.columna} aria-label="Perfiles del autor">
          <h2 className={estilos.encabezado}>Autor</h2>
          <ul className={estilos.lista}>
            {perfiles.map(({ nombre, icono, url }) => (
              <li key={nombre}>
                {url ? (
                  <a className={estilos.perfil} href={url} target="_blank" rel="noopener noreferrer me">
                    <Icono nombre={icono} />
                    <span>{nombre}</span>
                    <Icono nombre="externo" tamano={14} className={estilos.externo} />
                  </a>
                ) : (
                  <span className={`${estilos.perfil} ${estilos.pendiente}`}>
                    <Icono nombre={icono} />
                    <span>{nombre}</span>
                    <span className={estilos.proximamente}>Próximamente</span>
                  </span>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className={estilos.columna}>
          <h2 className={estilos.encabezado}>Fuentes</h2>
          <ul className={estilos.lista}>
            {fuentes.slice(0, 2).map(({ nombre, url }) => (
              <li key={nombre}>
                <a className={estilos.enlace} href={url} target="_blank" rel="noopener noreferrer">
                  {nombre}
                </a>
              </li>
            ))}
            <li className={estilos.enlaceLinea}>
              Mapas base:{' '}
              {mapasBase.map(({ nombre, url }, i) => (
                <span key={nombre}>
                  {i > 0 && ' · '}
                  <a className={estilos.enlace} href={url} target="_blank" rel="noopener noreferrer">
                    {nombre}
                  </a>
                </span>
              ))}
            </li>
          </ul>
        </div>
      </div>

      <div className={estilos.legal}>
        <p>
          © {anio}
          {sitio.autor ? ` ${sitio.autor}` : ''}. Prohibida la reproducción total o parcial de este sitio sin
          autorización.
        </p>
        <a href="#inicio" className={estilos.subir}>
          Volver arriba
        </a>
      </div>
    </footer>
  )
}

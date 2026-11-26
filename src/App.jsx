import { useCallback } from 'react'
import Encabezado from './componentes/estructura/Encabezado.jsx'
import PiePagina from './componentes/estructura/PiePagina.jsx'
import Portada from './componentes/secciones/Portada.jsx'
import Conceptos from './componentes/secciones/Conceptos.jsx'
import Panorama from './componentes/secciones/Panorama.jsx'
import Explorador from './componentes/secciones/Explorador.jsx'
import ComoLeer from './componentes/secciones/ComoLeer.jsx'
import Precauciones from './componentes/secciones/Precauciones.jsx'
import Metodo from './componentes/secciones/Metodo.jsx'
import { sitio } from './config/sitio.js'
import { useAlcaldia } from './hooks/useAlcaldia.js'
import { useTema } from './hooks/useTema.js'

export default function App() {
  const { tema, alternar } = useTema()
  const [alcaldia, elegirAlcaldia] = useAlcaldia(sitio.alcaldiaInicial)

  const explorarAlcaldia = useCallback(
    (slug) => {
      elegirAlcaldia(slug)
      const destino = document.getElementById('explorar')
      const reducido = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      destino?.scrollIntoView({ behavior: reducido ? 'auto' : 'smooth', block: 'start' })
    },
    [elegirAlcaldia],
  )

  return (
    <>
      <a className="saltar" href="#contenido">
        Saltar al contenido
      </a>
      <Encabezado tema={tema} onAlternarTema={alternar} />
      <main id="contenido" tabIndex={-1}>
        <Portada />
        <Conceptos />
        <Panorama onExplorar={explorarAlcaldia} />
        <Explorador alcaldia={alcaldia} onElegir={elegirAlcaldia} tema={tema} />
        <ComoLeer />
        <Precauciones />
        <Metodo />
      </main>
      <PiePagina />
    </>
  )
}

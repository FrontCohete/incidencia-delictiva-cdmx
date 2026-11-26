import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import '@fontsource-variable/archivo/wdth.css'
import '@fontsource/public-sans/400.css'
import '@fontsource/public-sans/500.css'
import '@fontsource/public-sans/600.css'
import '@fontsource/public-sans/700.css'
import '@fontsource/ibm-plex-mono/400.css'
import '@fontsource/ibm-plex-mono/500.css'
import './estilos/tokens.css'
import './estilos/base.css'
import App from './App.jsx'
import AvisoCopia from './componentes/ui/AvisoCopia.jsx'
import { romperMarcoAjeno, verificarOrigen } from './seguridad/guardia.js'

romperMarcoAjeno()

const raiz = document.getElementById('raiz')
const { permitido, original } = verificarOrigen()

if (!permitido) {
  createRoot(raiz).render(<AvisoCopia original={original} />)
} else if (raiz.firstElementChild) {
  hydrateRoot(
    raiz,
    <StrictMode>
      <App />
    </StrictMode>,
  )
} else {
  createRoot(raiz).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}

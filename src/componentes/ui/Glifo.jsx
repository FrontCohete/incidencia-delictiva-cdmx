import estilos from './Glifo.module.css'

const ANCHO = 240
const ALTO = 132

function nube(semilla, cantidad, centros) {
  let estado = semilla
  const azar = () => {
    estado = (estado * 1664525 + 1013904223) % 4294967296
    return estado / 4294967296
  }
  return Array.from({ length: cantidad }, (_, i) => {
    const [cx, cy, dispersion] = centros[i % centros.length]
    const angulo = azar() * Math.PI * 2
    const distancia = Math.sqrt(azar()) * dispersion
    return {
      x: Math.round((cx + Math.cos(angulo) * distancia) * 10) / 10,
      y: Math.round((cy + Math.sin(angulo) * distancia * 0.8) * 10) / 10,
      tono: azar(),
    }
  })
}

const PUNTOS = nube(7, 90, [
  [70, 66, 44],
  [168, 58, 34],
  [126, 96, 60],
])

const FONDO_ZONAS = nube(11, 70, [
  [78, 64, 26],
  [168, 70, 22],
  [120, 70, 110],
])

const claseGravedad = (tono) => (tono < 0.62 ? estilos.moderado : tono < 0.93 ? estilos.grave : estilos.muyGrave)

function Puntos() {
  return PUNTOS.map(({ x, y, tono }, i) => <circle key={i} cx={x} cy={y} r="3" className={claseGravedad(tono)} />)
}

function Zonas() {
  return (
    <>
      {FONDO_ZONAS.map(({ x, y }, i) => (
        <circle key={i} cx={x} cy={y} r="2.2" className={estilos.tenue} />
      ))}
      <circle cx="78" cy="64" r="30" className={estilos.muyAlta} />
      <circle cx="168" cy="70" r="24" className={estilos.alta} />
      <circle cx="206" cy="30" r="13" className={estilos.moderada} />
    </>
  )
}

function Calor() {
  return (
    <>
      <defs>
        <radialGradient id="glifo-calor">
          <stop offset="0" stopColor="#d7191c" />
          <stop offset="0.25" stopColor="#fdae61" />
          <stop offset="0.5" stopColor="#ffffbf" />
          <stop offset="0.72" stopColor="#abd9e9" />
          <stop offset="0.9" stopColor="#2c7bb6" stopOpacity="0.55" />
          <stop offset="1" stopColor="#2c7bb6" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="84" cy="70" rx="70" ry="54" fill="url(#glifo-calor)" />
      <ellipse cx="172" cy="56" rx="46" ry="38" fill="url(#glifo-calor)" opacity="0.8" />
      <ellipse cx="190" cy="104" rx="30" ry="24" fill="url(#glifo-calor)" opacity="0.55" />
    </>
  )
}

const DIBUJOS = { puntos: Puntos, zonas: Zonas, calor: Calor }

export default function Glifo({ tipo }) {
  const Dibujo = DIBUJOS[tipo]
  return (
    <svg className={estilos.glifo} viewBox={`0 0 ${ANCHO} ${ALTO}`} aria-hidden="true" focusable="false">
      <rect className={estilos.lienzo} width={ANCHO} height={ALTO} rx="8" />
      <Dibujo />
    </svg>
  )
}

export function Muestra({ clase }) {
  return <span className={`${estilos.muestra} ${estilos[clase]}`} aria-hidden="true" />
}

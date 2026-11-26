import estilos from './Barra.module.css'

export default function Barra({ segmentos, maximo, className }) {
  let acumulado = 0

  return (
    <svg
      className={`${estilos.barra} ${className ?? ''}`}
      viewBox="0 0 100 10"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <rect className={estilos.fondo} width="100" height="10" />
      {segmentos.map(({ valor, tono }) => {
        const ancho = maximo ? (valor / maximo) * 100 : 0
        const x = acumulado
        acumulado += ancho
        return <rect key={tono} className={estilos[tono]} x={x} width={ancho} height="10" />
      })}
    </svg>
  )
}

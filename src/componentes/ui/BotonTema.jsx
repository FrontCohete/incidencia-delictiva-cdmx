import Icono from './Icono.jsx'
import estilos from './BotonTema.module.css'

export default function BotonTema({ tema, onAlternar }) {
  const siguiente = tema === 'oscuro' ? 'claro' : 'oscuro'

  return (
    <button
      type="button"
      className={estilos.boton}
      onClick={onAlternar}
      aria-label={`Cambiar a tema ${siguiente}`}
      title={`Cambiar a tema ${siguiente}`}
    >
      <span className={estilos.pista} aria-hidden="true">
        <span className={estilos.perilla}>
          <Icono nombre={tema === 'oscuro' ? 'luna' : 'sol'} tamano={14} />
        </span>
      </span>
      <span className={estilos.texto} aria-hidden="true">
        {tema === 'oscuro' ? 'Oscuro' : 'Claro'}
      </span>
    </button>
  )
}

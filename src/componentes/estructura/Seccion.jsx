import estilos from './Seccion.module.css'

export default function Seccion({ id, titulo, intro, etiqueta, children, tono = 'base' }) {
  const idTitulo = `${id}-titulo`

  return (
    <section id={id} aria-labelledby={idTitulo} className={`${estilos.seccion} ${estilos[tono]}`}>
      <div className={estilos.contenedor}>
        <header className={estilos.cabecera}>
          <div>
            {etiqueta && <p className={estilos.etiqueta}>{etiqueta}</p>}
            <h2 id={idTitulo} className={estilos.titulo}>
              {titulo}
            </h2>
          </div>
          {intro && <p className={estilos.intro}>{intro}</p>}
        </header>
        {children}
      </div>
    </section>
  )
}

import { entero } from '../utilidades/formato.js'

export const introMetodo =
  'Esta sección resume, sin entrar en código, el camino que siguieron los datos desde el registro original hasta los círculos que ves en cada mapa.'

export function pasosMetodo(meta, totales) {
  const { limpieza, catalogo, parametros } = meta
  const umbralAlto = String(parametros.umbral_alto).replace('.0', '')
  const umbralMuyAlto = String(parametros.umbral_prioritario).replace('.0', '')

  return [
    {
      titulo: 'Fuente',
      texto: `Se usaron los registros de víctimas en carpetas de investigación que la Fiscalía General de Justicia publica en el Portal de Datos Abiertos de la Ciudad de México, de enero de 2022 a julio de 2024: ${entero(limpieza.filas_leidas)} registros.`,
    },
    {
      titulo: 'Limpieza',
      texto: `Se descartaron ${entero(limpieza.descartadas.sin_coordenadas)} registros sin coordenadas y ${entero(limpieza.descartadas.sin_fecha_hecho)} sin fecha del hecho. Quedaron ${entero(limpieza.filas_validas)} registros utilizables.`,
    },
    {
      titulo: 'Ubicación en la alcaldía',
      texto: `Una víctima se asignó a una alcaldía solo si la alcaldía anotada en la denuncia coincidía con la posición del punto dentro de los límites oficiales del INEGI. Así se conservaron ${entero(totales.asignadas)} víctimas y se apartaron ${entero(totales.contradictorias)} cuyo registro y ubicación no concordaban.`,
    },
    {
      titulo: 'Selección por gravedad',
      texto: `Los ${entero(catalogo.total)} tipos de delito del registro se ordenaron en una escala de gravedad de 0 a 4. Para buscar zonas se usaron los de nivel ${parametros.peso_minimo} o más (moderados, graves y muy graves): ${entero(totales.analizadas)} víctimas.`,
    },
    {
      titulo: 'Búsqueda de zonas',
      texto: `Se aplicó HDBSCAN, un algoritmo que agrupa puntos por densidad. En lugar de dividir el mapa en cuadros fijos, mide qué tan cerca está cada víctima de sus vecinas y reconoce como zona cualquier grupo de al menos ${entero(parametros.min_cluster_size)} víctimas claramente más apretado que su alrededor. Las distancias se midieron en metros y cada alcaldía se analizó por separado.`,
    },
    {
      titulo: 'Centro y tamaño del círculo',
      texto:
        'El centro de cada zona es su víctima más central, la que tiene menor distancia total al resto del grupo. El radio alcanza al 90 % de las víctimas de la zona, de modo que unos pocos casos alejados no inflan el círculo.',
    },
    {
      titulo: 'Nivel de concentración',
      texto: `Se compara la densidad del núcleo de cada zona, la mitad de sus víctimas más cercana al centro, con la densidad habitual de la alcaldía en el territorio donde hay registros. ${umbralMuyAlto} veces o más es concentración muy alta; entre ${umbralAlto} y ${umbralMuyAlto} veces, alta; por debajo, moderada.`,
    },
    {
      titulo: 'Representación',
      texto:
        'Cada mapa combina tres lecturas del mismo dato: los puntos coloreados por gravedad, las zonas como círculos y un mapa de calor que suma víctimas cercanas. La ficha de cada zona resume sus delitos, horarios, días y la evolución por año.',
    },
  ]
}

export function fichaTecnica(meta) {
  const p = meta.parametros
  return [
    { clave: 'Algoritmo', valor: 'HDBSCAN, selección por exceso de masa' },
    { clave: 'Tamaño mínimo de zona', valor: `${entero(p.min_cluster_size)} víctimas` },
    { clave: 'Vecinas para formar núcleo', valor: entero(p.min_samples) },
    { clave: 'Tamaño máximo de zona', valor: `${entero(p.max_cluster_size)} víctimas` },
    { clave: 'Distancia', valor: 'Euclidiana en metros, UTM zona 14 N' },
    { clave: 'Umbrales de concentración', valor: `${p.umbral_alto}× alta · ${p.umbral_prioritario}× muy alta` },
    { clave: 'Celda del territorio con registros', valor: `${p.celda_zona_registros_m} m` },
  ]
}

export const fuentes = [
  {
    nombre: 'Víctimas en carpetas de investigación (FGJ)',
    detalle: 'Portal de Datos Abiertos de la Ciudad de México',
    url: 'https://datos.cdmx.gob.mx/dataset/victimas-en-carpetas-de-investigacion-fgj',
  },
  {
    nombre: 'Marco Geoestadístico 2022',
    detalle: 'INEGI, límites de las alcaldías',
    url: 'https://www.inegi.org.mx/temas/mg/',
  },
  {
    nombre: 'ENVIPE 2025',
    detalle: 'INEGI, cifra oculta de delitos',
    url: 'https://www.inegi.org.mx/programas/envipe/2025/',
  },
]

export const herramientas = ['Python', 'pandas', 'scikit-learn', 'Shapely', 'pyproj', 'Leaflet', 'Leaflet.heat', 'React', 'Vite']

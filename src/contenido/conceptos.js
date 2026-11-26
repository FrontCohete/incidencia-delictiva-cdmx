export const introConceptos =
  'Hay un mapa para cada una de las 16 alcaldías. Todos parten de las víctimas registradas en carpetas de investigación de la Fiscalía General de Justicia de la Ciudad de México y responden la misma pregunta: ¿en qué lugares se acumulan muchas más víctimas que en el resto de la alcaldía?'

export const conceptos = [
  {
    id: 'puntos',
    titulo: 'Puntos',
    texto:
      'Cada punto es una víctima registrada en el lugar donde ocurrió el hecho, según la denuncia. Su color indica qué tan grave fue el delito.',
    leyenda: [
      { clase: 'moderado', texto: 'Moderado' },
      { clase: 'grave', texto: 'Grave' },
      { clase: 'muyGrave', texto: 'Muy grave' },
    ],
  },
  {
    id: 'zonas',
    titulo: 'Zonas de concentración',
    texto:
      'Los círculos encierran agrupaciones de víctimas mucho más densas que su entorno. Su tamaño crece con el número de víctimas que reúnen.',
    leyenda: [
      { clase: 'muyAlta', texto: 'Muy alta' },
      { clase: 'alta', texto: 'Alta' },
      { clase: 'moderada', texto: 'Moderada' },
    ],
  },
  {
    id: 'calor',
    titulo: 'Mapa de calor',
    texto:
      'Colorea el territorio según cuántas víctimas hay cerca: azul donde hay pocas, rojo donde se concentran. Muestra cantidad, no gravedad.',
    leyenda: [
      { clase: 'calorBajo', texto: 'Pocas' },
      { clase: 'calorAlto', texto: 'Muchas' },
    ],
  },
]

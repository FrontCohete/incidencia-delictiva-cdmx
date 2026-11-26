export const introLectura =
  'Cada mapa tiene un panel de control y una leyenda. Estas son las piezas que conviene conocer antes de interpretar lo que ves.'

export const controles = [
  {
    nombre: 'Capas',
    opciones: ['Mapa de calor', 'Zonas', 'Nombres', 'Puntos', 'Límite'],
    texto: 'Enciende o apaga cada elemento del mapa. Con menos capas es más fácil leer una sola idea a la vez.',
  },
  {
    nombre: 'Zonas que mostrar',
    opciones: ['Relevantes', 'Muy altas', 'Todas'],
    texto:
      'Relevantes reúne las zonas de concentración alta y muy alta. Muy altas deja solo las más intensas. Todas añade las de concentración moderada.',
  },
  {
    nombre: 'Incluir lugares puntuales',
    opciones: [],
    texto:
      'Algunas zonas acumulan muchas víctimas en menos de 25 metros, casi siempre un mismo domicilio, oficina o comercio. Esta casilla las muestra u oculta.',
  },
  {
    nombre: 'Gravedad, tipo de delito y año',
    opciones: ['Muy graves', 'Graves', 'Moderados'],
    texto:
      'Filtran los puntos y el mapa de calor. Las zonas no cambian: se calcularon una sola vez con todas las víctimas del periodo.',
  },
  {
    nombre: 'Qué puntos mostrar',
    opciones: ['Todos', 'En zonas', 'Fuera de zonas'],
    texto: 'Separa las víctimas que quedaron dentro de alguna zona de las que están dispersas por la alcaldía.',
  },
  {
    nombre: 'Ficha de la zona',
    opciones: [],
    texto:
      'Al tocar un círculo se abre su ficha: colonias que abarca, delitos más frecuentes, qué tan graves son, en qué horario y qué días ocurren, sexo de las víctimas y promedio mensual.',
  },
  {
    nombre: 'Vista',
    opciones: ['Claro', 'Oscuro', 'Calles'],
    texto: 'Cambia el mapa base. Calles muestra nombres de vías y referencias para ubicarte.',
  },
]

export const gravedades = [
  {
    clase: 'muyGrave',
    nombre: 'Muy graves',
    ejemplos: 'Homicidio, feminicidio, violación, secuestro.',
  },
  {
    clase: 'grave',
    nombre: 'Graves',
    ejemplos: 'Robo con violencia, violencia familiar, abuso sexual, lesiones.',
  },
  {
    clase: 'moderado',
    nombre: 'Moderados',
    ejemplos: 'Robo sin violencia, fraude, amenazas.',
  },
]

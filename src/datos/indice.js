import portal from './portal.json'

const suma = (lista, clave) => lista.reduce((total, elemento) => total + elemento[clave], 0)

export const { meta, ciudad, relevantes } = portal

export const alcaldias = [...portal.alcaldias].sort(
  (a, b) => b.hotspots_relevantes - a.hotspots_relevantes || b.hotspots_prioritarios - a.hotspots_prioritarios,
)

export const alcaldiasAlfabeticas = [...portal.alcaldias].sort((a, b) => a.alcaldia.localeCompare(b.alcaldia, 'es'))

export const porSlug = Object.fromEntries(portal.alcaldias.map((a) => [a.slug, a]))

export const totales = {
  analizadas: suma(portal.alcaldias, 'puntos_analizados'),
  dispersas: suma(portal.alcaldias, 'ruido'),
  zonas: suma(portal.alcaldias, 'hotspots'),
  relevantes: suma(portal.alcaldias, 'hotspots_relevantes'),
  muyAltas: suma(portal.alcaldias, 'hotspots_prioritarios'),
  altas: suma(portal.alcaldias, 'hotspots_altos'),
  puntuales: suma(portal.alcaldias, 'relevantes_puntuales'),
  asignadas: suma(portal.alcaldias, 'victimas_validas'),
  contradictorias: suma(portal.alcaldias, 'fuera_del_poligono'),
}

totales.enZonas = totales.analizadas - totales.dispersas

import { readdirSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { perfiles } from '../src/config/perfiles.js'

const TITULO = 'Puntos de alta incidencia delictiva en Ciudad de México'
const DESCRIPCION =
  'Mapas interactivos de las zonas con mayor concentración de víctimas de delitos en las 16 alcaldías de la Ciudad de México, elaborados con datos abiertos de la Fiscalía General de Justicia de 2022 a 2024.'
const FUENTE = 'https://datos.cdmx.gob.mx/dataset/victimas-en-carpetas-de-investigacion-fgj'

const COPIADORES = [
  'HTTrack',
  'WebCopier',
  'WebZIP',
  'Offline Explorer',
  'Teleport',
  'TeleportPro',
  'SiteSnagger',
  'WebStripper',
  'WebReaper',
  'Website Downloader',
  'Wget',
]

const normalizarUrl = (url) => (!url ? '' : url.endsWith('/') ? url : `${url}/`)

function datosEstructurados(url, autor, enlaces) {
  const persona = autor ? { '@type': 'Person', name: autor, ...(enlaces.length && { sameAs: enlaces }) } : undefined
  const grafo = [
    {
      '@type': 'WebSite',
      '@id': `${url}#sitio`,
      url,
      name: TITULO,
      description: DESCRIPCION,
      inLanguage: 'es-MX',
      ...(persona && { author: persona }),
    },
    {
      '@type': 'Dataset',
      '@id': `${url}#datos`,
      name: 'Zonas de alta incidencia delictiva en la Ciudad de México, 2022–2024',
      description: DESCRIPCION,
      url,
      inLanguage: 'es-MX',
      isAccessibleForFree: true,
      temporalCoverage: '2022-01/2024-07',
      spatialCoverage: {
        '@type': 'Place',
        name: 'Ciudad de México, México',
        geo: { '@type': 'GeoShape', box: '19.0 -99.4 19.7 -98.9' },
      },
      isBasedOn: FUENTE,
      keywords: [
        'incidencia delictiva',
        'Ciudad de México',
        'alcaldías',
        'mapa de calor',
        'zonas de concentración',
        'HDBSCAN',
        'datos abiertos',
      ],
      variableMeasured: ['Víctimas registradas en carpetas de investigación', 'Gravedad del delito'],
      ...(persona && { creator: persona }),
    },
  ]
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': grafo })
}

function etiquetas(url, autor, enlaces) {
  const imagen = url ? `${url}og-imagen.png` : 'og-imagen.png'
  const meta = (attrs) => ({ tag: 'meta', attrs, injectTo: 'head' })
  return [
    url && { tag: 'link', attrs: { rel: 'canonical', href: url }, injectTo: 'head' },
    autor && meta({ name: 'author', content: autor }),
    meta({ property: 'og:type', content: 'website' }),
    meta({ property: 'og:locale', content: 'es_MX' }),
    meta({ property: 'og:site_name', content: TITULO }),
    meta({ property: 'og:title', content: TITULO }),
    meta({ property: 'og:description', content: DESCRIPCION }),
    url && meta({ property: 'og:url', content: url }),
    meta({ property: 'og:image', content: imagen }),
    meta({ property: 'og:image:width', content: '1200' }),
    meta({ property: 'og:image:height', content: '630' }),
    meta({
      property: 'og:image:alt',
      content: 'Silueta de la Ciudad de México con las zonas de alta incidencia delictiva marcadas en rojo',
    }),
    meta({ name: 'twitter:card', content: 'summary_large_image' }),
    meta({ name: 'twitter:title', content: TITULO }),
    meta({ name: 'twitter:description', content: DESCRIPCION }),
    meta({ name: 'twitter:image', content: imagen }),
    {
      tag: 'script',
      attrs: { type: 'application/ld+json' },
      children: datosEstructurados(url, autor, enlaces),
      injectTo: 'head',
    },
  ].filter(Boolean)
}

function robots(url) {
  const bloqueados = COPIADORES.map((agente) => `User-agent: ${agente}`).join('\n')
  return [
    'User-agent: *',
    'Allow: /',
    '',
    bloqueados,
    'Disallow: /',
    '',
    url ? `Sitemap: ${url}sitemap.xml` : '',
    '',
  ].join('\n')
}

function sitemap(url, mapas) {
  const hoy = new Date().toISOString().slice(0, 10)
  const entradas = [
    { loc: url, prioridad: '1.0' },
    ...mapas.map((archivo) => ({ loc: `${url}mapas/alcaldias/${archivo}`, prioridad: '0.7' })),
  ]
  const urls = entradas
    .map(
      ({ loc, prioridad }) =>
        `  <url><loc>${loc}</loc><lastmod>${hoy}</lastmod><priority>${prioridad}</priority></url>`,
    )
    .join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
}

export default function seo(entorno) {
  const url = normalizarUrl((entorno.VITE_SITE_URL || '').trim())
  const autor = (entorno.VITE_AUTOR || '').trim()
  const linkedin = (entorno.VITE_LINKEDIN_URL || '').trim() || perfiles.linkedin
  const repositorio = (entorno.VITE_REPO_URL || '').trim() || perfiles.github
  const enlaces = [linkedin, repositorio].filter(Boolean)
  let raiz = process.cwd()
  let esServidor = false

  return {
    name: 'seo',
    configResolved(config) {
      raiz = config.root
      esServidor = Boolean(config.build.ssr)
    },
    transformIndexHtml() {
      return etiquetas(url, autor, enlaces)
    },
    generateBundle() {
      if (esServidor) return
      let mapas = []
      try {
        mapas = readdirSync(resolve(join(raiz, 'public', 'mapas', 'alcaldias')))
          .filter((a) => a.endsWith('.html'))
          .sort()
      } catch {
        mapas = []
      }
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robots(url) })
      if (url) this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemap(url, mapas) })
    },
  }
}

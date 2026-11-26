import { createHash } from 'node:crypto'
import { readdir, readFile, writeFile } from 'node:fs/promises'
import { join, resolve } from 'node:path'

const LOCALES = ['localhost', '127.0.0.1']

const POLITICA = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self'",
  "img-src 'self' data:",
  "font-src 'self'",
  "frame-src 'self'",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'none'",
].join('; ')

const normalizarUrl = (url) => (!url ? '' : url.endsWith('/') ? url : `${url}/`)

const hostDe = (url) => {
  try {
    return new URL(url).hostname.toLowerCase()
  } catch {
    return ''
  }
}

export function configurarProteccion(entorno) {
  const original = normalizarUrl((entorno.VITE_SITE_URL || '').trim())
  const extra = (entorno.VITE_DOMINIOS || '')
    .split(',')
    .map((d) => d.trim().toLowerCase())
    .filter(Boolean)
  const dominios = [...new Set([hostDe(original), ...extra, ...LOCALES].filter(Boolean))]
  const huella = createHash('sha256').update(`${original}|${Date.now()}`).digest('hex').slice(0, 16)
  const codificados = Buffer.from(JSON.stringify(dominios)).toString('base64')
  return { original, dominios, huella, codificados }
}

const avisoMapa = (original, ruta) => {
  const destino = original ? `${original}${ruta}` : ''
  const enlace = destino
    ? `<a href="${destino}" style="color:#7C9BFF">${destino}</a>`
    : 'el sitio original'
  return `<main style="min-height:100vh;display:grid;place-content:center;gap:12px;padding:32px;background:#0F141B;color:#E4E9F0;font:16px/1.5 system-ui,sans-serif;text-align:center"><p style="margin:0;font:600 12px/1 ui-monospace,monospace;letter-spacing:.1em;text-transform:uppercase;color:#93A0B0">Copia no autorizada</p><h1 style="margin:0;font-size:24px">Este mapa pertenece a «Puntos de alta incidencia delictiva en Ciudad de México»</h1><p style="margin:0;color:#93A0B0">Consulta la versión original en ${enlace}</p></main>`
}

const guardiaMapa = ({ codificados, original }, ruta) =>
  `<script>(function(){var d=[];try{d=JSON.parse(atob(${JSON.stringify(codificados)}))}catch(e){}var h=location.hostname.toLowerCase();if(window.self!==window.top){var m=false;try{m=window.top.location.hostname.toLowerCase()===h}catch(e){}if(!m){try{window.top.location.replace(location.href)}catch(e){}}}if(d.indexOf(h)===-1){var s=document.createElement('style');s.textContent='body{visibility:hidden}';document.head.appendChild(s);document.addEventListener('DOMContentLoaded',function(){document.body.innerHTML=${JSON.stringify(avisoMapa(original, ruta))};s.remove()});var o=${JSON.stringify(original)};if(o){setTimeout(function(){location.replace(o+${JSON.stringify(ruta)})},6000)}}})();</script>`

async function protegerMapas(directorio, opciones) {
  const carpeta = join(directorio, 'mapas', 'alcaldias')
  let archivos = []
  try {
    archivos = (await readdir(carpeta)).filter((a) => a.endsWith('.html'))
  } catch {
    return 0
  }
  for (const archivo of archivos) {
    const ruta = `mapas/alcaldias/${archivo}`
    const slug = archivo.replace(/\.html$/, '')
    const camino = join(carpeta, archivo)
    let html = await readFile(camino, 'utf8')
    const nombre = (html.match(/<title>([^<·]+?)\s*·/) || [])[1]?.trim() || slug
    const cabecera = [
      guardiaMapa(opciones, ruta),
      `<meta name="huella" content="${opciones.huella}">`,
      `<meta name="description" content="Mapa interactivo de las zonas con mayor concentración de víctimas de delitos en ${nombre}, Ciudad de México, con datos de 2022 a 2024.">`,
      `<meta name="referrer" content="strict-origin-when-cross-origin">`,
      opciones.original ? `<link rel="canonical" href="${opciones.original}${ruta}">` : '',
    ].join('')
    html = html
      .replace(/<head>/i, `<head>${cabecera}`)
      .replace(/<title>[^<]*<\/title>/i, `<title>${nombre} · Zonas de alta incidencia delictiva</title>`)
      .replaceAll('href="../index.html"', `href="../../?alcaldia=${slug}#explorar"`)
    await writeFile(camino, html)
  }
  return archivos.length
}

export default function proteccion(entorno) {
  const opciones = configurarProteccion(entorno)
  let salida = 'dist'
  let esServidor = false
  let esConstruccion = false

  return {
    name: 'proteccion',
    config() {
      return {
        define: {
          __DOMINIOS__: JSON.stringify(opciones.codificados),
          __ORIGINAL__: JSON.stringify(opciones.original),
        },
      }
    },
    configResolved(config) {
      salida = resolve(config.root, config.build.outDir)
      esServidor = Boolean(config.build.ssr)
      esConstruccion = config.command === 'build'
    },
    transformIndexHtml: {
      order: 'post',
      handler() {
        if (!esConstruccion || esServidor) return []
        return [
          {
            tag: 'meta',
            attrs: { 'http-equiv': 'Content-Security-Policy', content: POLITICA },
            injectTo: 'head-prepend',
          },
          { tag: 'meta', attrs: { name: 'huella', content: opciones.huella }, injectTo: 'head' },
        ]
      },
    },
    async closeBundle() {
      if (!esConstruccion || esServidor) return
      const total = await protegerMapas(salida, opciones)
      this.info?.(`mapas protegidos: ${total} · dominios: ${opciones.dominios.join(', ')}`)
    },
  }
}

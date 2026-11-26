import { readFile, rm, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..')
const servidor = join(raiz, '.prerender', 'entrada-servidor.js')
const indice = join(raiz, 'dist', 'index.html')
const MARCADOR = '<!--contenido-->'

const { renderizar } = await import(pathToFileURL(servidor).href)
const html = await readFile(indice, 'utf8')

if (!html.includes(MARCADOR)) {
  throw new Error(`No se encontró ${MARCADOR} en dist/index.html`)
}

await writeFile(indice, html.replace(MARCADOR, renderizar()))
await rm(join(raiz, '.prerender'), { recursive: true, force: true })
console.log('dist/index.html prerenderizado')

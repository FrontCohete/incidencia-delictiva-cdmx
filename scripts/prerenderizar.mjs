import { readFile, rm, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..')
const servidor = join(raiz, '.prerender', 'entrada-servidor.js')
const indice = join(raiz, 'dist', 'index.html')
const CONTENEDOR = /<div id="raiz">(?:\s*<!--contenido-->\s*)?<\/div>/

const { renderizar } = await import(pathToFileURL(servidor).href)
const html = await readFile(indice, 'utf8')

if (!CONTENEDOR.test(html)) {
  throw new Error('No se encontró <div id="raiz"></div> en dist/index.html')
}

await writeFile(indice, html.replace(CONTENEDOR, () => `<div id="raiz">${renderizar()}</div>`))
await rm(join(raiz, '.prerender'), { recursive: true, force: true })
console.log('dist/index.html prerenderizado')

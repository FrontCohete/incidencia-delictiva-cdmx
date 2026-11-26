import { copyFile, mkdir, readdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..')
const origen = resolve(process.argv[2] ?? join(raiz, '..', 'demo_inc1_alcaldias', 'mapas_alcaldias'))
const destinoMapas = join(raiz, 'public', 'mapas', 'alcaldias')
const destinoDatos = join(raiz, 'src', 'datos', 'portal.json')

const mapas = (await readdir(join(origen, 'alcaldias'))).filter((a) => a.endsWith('.html'))
if (mapas.length === 0) throw new Error(`No hay mapas en ${join(origen, 'alcaldias')}`)

await mkdir(destinoMapas, { recursive: true })
await Promise.all(mapas.map((a) => copyFile(join(origen, 'alcaldias', a), join(destinoMapas, a))))

const portal = JSON.parse(await readFile(join(origen, 'datos', 'portal.json'), 'utf8'))
const { meta, alcaldias, ciudad, relevantes } = portal
if (!ciudad || !relevantes) throw new Error('portal.json no incluye «ciudad» o «relevantes»; vuelve a generar los mapas')
await writeFile(destinoDatos, JSON.stringify({ meta, alcaldias, ciudad, relevantes }))

console.log(`${mapas.length} mapas y portal.json sincronizados desde ${origen}`)

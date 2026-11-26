import { perfiles } from './perfiles.js'

const valor = (v) => (typeof v === 'string' ? v.trim() : '')

export const sitio = {
  titulo: 'Puntos de alta incidencia delictiva en Ciudad de México',
  marca: 'Alta incidencia CDMX',
  etiquetaCaso: 'Caso de estudio · Ciudad de México · 2022–2024',
  url: valor(import.meta.env.VITE_SITE_URL),
  autor: valor(import.meta.env.VITE_AUTOR),
  linkedin: valor(import.meta.env.VITE_LINKEDIN_URL) || perfiles.linkedin,
  repositorio: valor(import.meta.env.VITE_REPO_URL) || perfiles.github || valor(import.meta.env.VITE_REPO_URL_AUTO),
  alcaldiaInicial: 'cuauhtemoc',
}

export const almacenamiento = {
  tema: 'tema-sitio',
  temaMapa: 'hs-mapa',
  temaPanelMapa: 'hs-ui',
}

export const rutaMapa = (slug) => `mapas/alcaldias/${slug}.html`

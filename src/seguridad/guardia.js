const decodificar = (texto) => {
  try {
    return JSON.parse(atob(texto))
  } catch {
    return []
  }
}

export function romperMarcoAjeno() {
  if (window.self === window.top) return
  let mismoSitio = false
  try {
    mismoSitio = window.top.location.hostname === window.location.hostname
  } catch {
    mismoSitio = false
  }
  if (!mismoSitio) {
    try {
      window.top.location.replace(window.location.href)
    } catch {
      document.documentElement.replaceChildren()
    }
  }
}

export function verificarOrigen() {
  const original = __ORIGINAL__
  if (import.meta.env.DEV) return { permitido: true, original }
  const dominios = decodificar(__DOMINIOS__)
  const permitido = dominios.includes(window.location.hostname.toLowerCase())
  return { permitido, original }
}

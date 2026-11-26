const enteros = new Intl.NumberFormat('es-MX', { maximumFractionDigits: 0 })
const decimales = new Intl.NumberFormat('es-MX', { maximumFractionDigits: 1, minimumFractionDigits: 1 })

const ACENTOS = [
  [/\bvehiculo\b/g, 'vehículo'],
  [/\bvehiculos\b/g, 'vehículos'],
  [/\bvia publica\b/g, 'vía pública'],
  [/\btranseunte\b/g, 'transeúnte'],
  [/\btranseuntes\b/g, 'transeúntes'],
  [/\bdespues\b/g, 'después'],
  [/\bcamion\b/g, 'camión'],
  [/\bhabitacion\b/g, 'habitación'],
  [/\bmovil\b/g, 'móvil'],
  [/\bcdmx\b/g, 'CDMX'],
]

export const entero = (n) => enteros.format(n)

export const porcentaje = (parte, total, conDecimal = false) => {
  if (!total) return '0 %'
  const valor = (parte / total) * 100
  return `${conDecimal ? decimales.format(valor) : enteros.format(valor)} %`
}

export const oracion = (texto) => {
  const minusculas = ACENTOS.reduce((t, [patron, reemplazo]) => t.replace(patron, reemplazo), texto.toLocaleLowerCase('es-MX'))
  return minusculas.charAt(0).toLocaleUpperCase('es-MX') + minusculas.slice(1)
}

export const radioZona = (victimas, escala = 0.24, minimo = 2.2) => Math.max(minimo, Math.sqrt(victimas) * escala)

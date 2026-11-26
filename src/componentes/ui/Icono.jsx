const TRAZOS = {
  sol: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6" />
    </>
  ),
  luna: <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  cerrar: <path d="M6 6l12 12M18 6 6 18" />,
  externo: <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />,
  flecha: <path d="M5 12h14M13 6l6 6-6 6" />,
  linkedin: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M8 10.5V17M8 7.2v.1M11.5 17v-3.8a2.2 2.2 0 0 1 4.4 0V17M11.5 10.5V17" />
    </>
  ),
  repositorio: (
    <>
      <path d="M6 3.5h11a1 1 0 0 1 1 1V18H7a2 2 0 0 0-2 2V5a1.5 1.5 0 0 1 1-1.5Z" />
      <path d="M5 20a2 2 0 0 0 2 1h11v-3M9 7.5h5" />
    </>
  ),
}

export default function Icono({ nombre, tamano = 18, className }) {
  return (
    <svg
      className={className}
      width={tamano}
      height={tamano}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {TRAZOS[nombre]}
    </svg>
  )
}

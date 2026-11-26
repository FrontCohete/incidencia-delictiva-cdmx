(function () {
  var raiz = document.documentElement
  var tema = 'oscuro'
  try {
    var guardado = localStorage.getItem('tema-sitio')
    if (guardado === 'claro' || guardado === 'oscuro') tema = guardado
    localStorage.setItem('hs-ui', tema)
    if (localStorage.getItem('hs-mapa') !== 'calles') localStorage.setItem('hs-mapa', tema)
  } catch (e) {}
  raiz.setAttribute('data-tema', tema)
})()

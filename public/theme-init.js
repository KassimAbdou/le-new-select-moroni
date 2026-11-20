/* global window, document, localStorage */
// Applique le thème avant le premier rendu pour éviter tout flash de couleur.
(function () {
  try {
    var stored = localStorage.getItem('lns-theme');
    var dark =
      stored === 'dark' ||
      (stored !== 'light' &&
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches);
    if (dark) document.documentElement.classList.add('dark');
    document.documentElement.style.colorScheme = dark ? 'dark' : 'light';
  } catch {
    // Stockage ou matchMedia indisponible : on garde le thème par défaut.
  }
})();

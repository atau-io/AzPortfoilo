(function () {
  'use strict';

  function applySavedTheme() {
    try {
      document.body.classList.toggle('dark-mode', localStorage.getItem('theme') === 'dark');
    } catch (error) {
      console.warn('Could not read theme preference:', error);
    }
  }

  function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    try {
      localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
    } catch (error) {
      console.warn('Could not save theme preference:', error);
    }
  }

  async function loadNavbar() {
    const placeholder = document.getElementById('navbar-placeholder');
    if (!placeholder) return;

    try {
      const response = await fetch('navbar.html');
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      placeholder.innerHTML = await response.text();
      document.getElementById('toggleThemeBtn')?.addEventListener('click', toggleTheme);

      // Keep existing AJAX navigation for homepage-only showcase partials.
      placeholder.querySelectorAll('a.load-link[data-url]').forEach((link) => {
        link.addEventListener('click', (event) => {
          if (typeof window.loadPage !== 'function' || !document.getElementById('content')) return;
          event.preventDefault();
          const url = link.getAttribute('data-url');
          if (!url) return;
          window.loadPage(url);
          if (url.includes('rpgPage.html') && !document.querySelector('script[data-atau-dragon]')) {
            const script = document.createElement('script');
            script.src = 'dragon.js';
            script.defer = true;
            script.dataset.atauDragon = 'true';
            document.body.appendChild(script);
          }
        });
      });
    } catch (error) {
      console.error('Navigation could not be loaded:', error);
      placeholder.innerHTML = '<nav class="navbar" aria-label="Fallback navigation"><a href="index.html">Home</a><a href="scanner.html">Morning Market Scanner</a><a href="character-companion.html">Character Companion</a></nav>';
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    applySavedTheme();
    loadNavbar();
  });
})();

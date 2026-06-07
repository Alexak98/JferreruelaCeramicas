// Cerámicas Ferreruela — interacciones de UI
// Sitio estático, una sola página. Sin dependencias.

(function () {
  'use strict';

  // ---------------------------------------------------------------------------
  // Catálogo: fuente única de verdad. Para añadir un producto basta con
  // empujar una entrada nueva aquí; el grid se renderiza solo.
  // ---------------------------------------------------------------------------
  const CATALOGO = [
    { cat: 'jarras',     titulo: 'Jarra clásica',     desc: 'Decoración floral azul cobalto sobre fondo crema.' },
    { cat: 'platos',     titulo: 'Plato decorado',    desc: 'Plato de mesa pintado a mano, motivo central.' },
    { cat: 'tazas',      titulo: 'Taza de café',      desc: 'Cerámica esmaltada, asa cómoda. 250 ml.' },
    { cat: 'jarrones',   titulo: 'Jarrón alto',       desc: 'Pieza decorativa torneada a mano.' },
    { cat: 'platos',     titulo: 'Fuente honda',      desc: 'Ideal para servir. Apta para horno.' },
    { cat: 'decorativo', titulo: 'Azulejo decorativo', desc: 'Pintado a mano, motivo tradicional.' },
    { cat: 'tazas',      titulo: 'Juego de tazas',    desc: 'Set de 4. Decoración a juego.' },
    { cat: 'jarras',     titulo: 'Jarra para agua',   desc: '1,5 L. Pico vertedor. Esmalte mate interior.' },
  ];

  const CATEGORIAS = [
    { id: 'all',        label: 'Todo' },
    { id: 'jarras',     label: 'Jarras' },
    { id: 'platos',     label: 'Platos' },
    { id: 'tazas',      label: 'Tazas' },
    { id: 'jarrones',   label: 'Jarrones' },
    { id: 'decorativo', label: 'Decorativo' },
  ];

  // ---------------------------------------------------------------------------
  // Render del catálogo
  // ---------------------------------------------------------------------------
  function renderCatalogo() {
    const grid = document.querySelector('.catalog-grid');
    if (!grid) return;
    const html = CATALOGO.map(p => `
      <article class="card" data-cat="${p.cat}">
        <div class="card-img"><div class="img-placeholder" data-label="${p.titulo}"></div></div>
        <div class="card-body">
          <h3>${p.titulo}</h3>
          <p>${p.desc}</p>
        </div>
      </article>
    `).join('');
    grid.innerHTML = html;
  }

  function renderFiltros() {
    const wrap = document.querySelector('.filters');
    if (!wrap) return;
    wrap.innerHTML = CATEGORIAS.map((c, i) => `
      <button type="button" class="filter${i === 0 ? ' active' : ''}"
              data-filter="${c.id}" aria-pressed="${i === 0}">
        ${c.label}
      </button>
    `).join('');
  }

  // ---------------------------------------------------------------------------
  // Filtros del catálogo — O(1) en JS.
  // El click solo escribe `grid.dataset.filter`; las reglas CSS resuelven la
  // visibilidad. Escala a miles de cards sin coste extra en el handler.
  // ---------------------------------------------------------------------------
  function initFiltros() {
    const wrap = document.querySelector('.filters');
    const grid = document.querySelector('.catalog-grid');
    if (!wrap || !grid) return;

    grid.dataset.filter = 'all';
    let activeBtn = wrap.querySelector('.filter.active');

    wrap.addEventListener('click', (e) => {
      const btn = e.target.closest('.filter');
      if (!btn || btn === activeBtn) return;

      if (activeBtn) {
        activeBtn.classList.remove('active');
        activeBtn.setAttribute('aria-pressed', 'false');
      }
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');
      activeBtn = btn;

      grid.dataset.filter = btn.dataset.filter;
    });
  }

  // ---------------------------------------------------------------------------
  // Menú móvil
  // ---------------------------------------------------------------------------
  function initMenu() {
    const toggle = document.querySelector('.nav-toggle');
    const links = document.querySelector('.nav-links');
    if (!toggle || !links) return;

    // Escape solo se ata cuando el menú está abierto → cero coste cuando está cerrado.
    const onKeydown = (e) => { if (e.key === 'Escape') cerrar(); };

    const cerrar = () => {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKeydown);
    };

    const abrir = () => {
      links.classList.add('open');
      toggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', onKeydown);
    };

    toggle.addEventListener('click', () => {
      links.classList.contains('open') ? cerrar() : abrir();
    });

    // Delegación: un solo listener en el contenedor, no uno por link.
    links.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') cerrar();
    });
  }

  // ---------------------------------------------------------------------------
  // Formulario de contacto (placeholder — sin backend)
  // ---------------------------------------------------------------------------
  function initFormulario() {
    const form = document.querySelector('.contacto-form');
    const fb = document.getElementById('formFeedback');
    if (!form || !fb) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      fb.hidden = false;
      fb.textContent = 'Gracias por tu mensaje. Te responderemos lo antes posible.';
      form.reset();
    });
  }

  // ---------------------------------------------------------------------------
  // Año dinámico
  // ---------------------------------------------------------------------------
  function initAnio() {
    const y = document.getElementById('year');
    if (y) y.textContent = new Date().getFullYear();
  }

  // ---------------------------------------------------------------------------
  // Bootstrap
  // ---------------------------------------------------------------------------
  function init() {
    renderFiltros();
    renderCatalogo();
    initFiltros();
    initMenu();
    initFormulario();
    initAnio();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

// Cerámicas Ferreruela — interacciones

// Año dinámico en el footer
document.getElementById('year').textContent = new Date().getFullYear();

// Menú móvil
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
navToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', open);
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Filtros del catálogo
const filters = document.querySelectorAll('.filter');
const cards = document.querySelectorAll('.catalog-grid .card');

filters.forEach(btn => {
  btn.addEventListener('click', () => {
    filters.forEach(f => f.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.filter;
    cards.forEach(card => {
      const match = cat === 'all' || card.dataset.cat === cat;
      card.classList.toggle('hidden', !match);
    });
  });
});

// Formulario de contacto (placeholder — sin backend)
function enviarFormulario(e) {
  e.preventDefault();
  const fb = document.getElementById('formFeedback');
  fb.hidden = false;
  fb.textContent = 'Gracias por tu mensaje. Te responderemos lo antes posible.';
  e.target.reset();
  return false;
}

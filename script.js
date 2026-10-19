const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuButton.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.textContent = open ? '×' : '☰';
});

navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  navLinks.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.textContent = '☰';
}));

document.getElementById('year').textContent = new Date().getFullYear();

// Gentle perspective motion on the portrait and service cards.
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reduced && window.matchMedia('(pointer:fine)').matches) {
  const area = document.getElementById('tilt-area');
  const portrait = area.querySelector('.portrait-card');

  area.addEventListener('pointermove', e => {
    const r = area.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - .5;
    const y = (e.clientY - r.top) / r.height - .5;
    portrait.style.transform = `translateX(-50%) rotateY(${x * 13 - 4}deg) rotateX(${-y * 10}deg) translateZ(10px)`;
  });

  area.addEventListener('pointerleave', () => portrait.style.transform = 'translateX(-50%) rotateY(-9deg) rotateX(2deg)');

  document.querySelectorAll('[data-tilt]').forEach(card => {
    card.addEventListener('pointermove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5;
      const y = (e.clientY - r.top) / r.height - .5;
      card.style.transform = `perspective(800px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg) translateY(-3px)`;
    });
    card.addEventListener('pointerleave', () => card.style.transform = '');
  });
}

// Reveal sections softly as they enter the viewport.
if ('IntersectionObserver' in window && !reduced) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  }), { threshold: .12 });

  document.querySelectorAll('.service-card,.about-copy,.about-visual,.approach-list>div').forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
  });
}
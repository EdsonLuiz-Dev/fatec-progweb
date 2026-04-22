// Navbar toggle
const toggle = document.querySelector('.navbar__toggle');
const nav    = document.querySelector('.navbar__nav');

toggle.addEventListener('click', () => {
  const isOpen = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!isOpen));
  nav.classList.toggle('navbar__nav--open', !isOpen);
});

document.querySelectorAll('.navbar__link').forEach(link => {
  link.addEventListener('click', () => {
    toggle.setAttribute('aria-expanded', 'false');
    nav.classList.remove('navbar__nav--open');
  });
});

// Envolve h2 e h3 que ainda não estão dentro de .clip
document.querySelectorAll('h2, h3').forEach(heading => {
  if (heading.closest('.clip')) return;
  const clip = document.createElement('div');
  clip.className = 'clip';
  heading.parentNode.insertBefore(clip, heading);
  clip.appendChild(heading);
});

// Marca botões para animação, exceto os de cards e formulário
document.querySelectorAll('.btn').forEach(btn => {
  if (btn.closest('.card__links') || btn.closest('.form')) return;
  btn.classList.add('btn--anim');
});

// Intersection Observer — dispara .in-view ao entrar na tela
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('in-view');
    observer.unobserve(entry.target);
  });
}, { threshold: 0.15 });

document.querySelectorAll('.clip, .btn--anim').forEach(el => observer.observe(el));

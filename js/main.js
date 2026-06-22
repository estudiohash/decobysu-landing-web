/**
 * [NOMBRE DE EMPRESA] — [Rubro o Especialidad]
 * main.js — Navigation, Scroll & Interactions
 */

'use strict';

/* ----------------------------------------------------------
   ELEMENTS
   ---------------------------------------------------------- */
const header = document.getElementById('header');
const burger = document.getElementById('burger');
const nav    = document.getElementById('nav');

/* ----------------------------------------------------------
   HEADER: scroll shadow
   ---------------------------------------------------------- */
function handleHeaderScroll() {
  if (window.scrollY > 10) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', handleHeaderScroll, { passive: true });
handleHeaderScroll(); // run on load

/* ----------------------------------------------------------
   BURGER MENU (mobile)
   ---------------------------------------------------------- */
burger.addEventListener('click', () => {
  const isOpen = burger.classList.toggle('open');
  nav.classList.toggle('open', isOpen);
  burger.setAttribute('aria-expanded', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

// Close menu when a nav link is tapped
nav.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => {
    burger.classList.remove('open');
    nav.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});

// Close menu on outside click
document.addEventListener('click', (e) => {
  if (nav.classList.contains('open') && !nav.contains(e.target) && !burger.contains(e.target)) {
    burger.classList.remove('open');
    nav.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
});

/* ----------------------------------------------------------
   ACTIVE NAV LINK — highlight on scroll
   ---------------------------------------------------------- */
const sections   = document.querySelectorAll('main section[id], footer[id]');
const navLinks   = document.querySelectorAll('.nav__link');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const id = entry.target.id;
    navLinks.forEach(link => {
      const isActive = link.getAttribute('href') === `#${id}`;
      link.classList.toggle('nav__link--active', isActive);
    });
  });
}, {
  rootMargin: `-${getComputedStyle(document.documentElement).getPropertyValue('--header-h')} 0px -60% 0px`,
  threshold: 0
});

sections.forEach(sec => observer.observe(sec));

/* ----------------------------------------------------------
   SMOOTH SCROLL for anchor links (fallback for older browsers)
   ---------------------------------------------------------- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const headerH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h'), 10) || 80;
    const top = target.getBoundingClientRect().top + window.scrollY - headerH;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ----------------------------------------------------------
   PLACEHOLDER: replace with real image paths when ready
   ----------------------------------------------------------
   Example usage once images are in /img/:

   document.querySelector('.hero__img-placeholder').style.backgroundImage = "url('../img/hero-bg.jpg')";
   document.querySelector('.hero__img-placeholder').style.backgroundSize  = 'cover';
   document.querySelector('.hero__img-placeholder').style.backgroundPosition = 'center';
   ---------------------------------------------------------- */

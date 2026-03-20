/* =============================================
   CARONI CAPITAL — MAIN JS
   Draft v1.0 | March 2026
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* --- Header scroll effect --- */
  const header = document.getElementById('site-header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* --- Mobile nav toggle --- */
  const navToggle = document.getElementById('nav-toggle');
  const mainNav   = document.getElementById('main-nav');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      mainNav.classList.toggle('open');
      const open = mainNav.classList.contains('open');
      navToggle.setAttribute('aria-expanded', open);
      // Animate hamburger → X
      const spans = navToggle.querySelectorAll('span');
      if (open) {
        spans[0].style.transform = 'translateY(6px) rotate(45deg)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'translateY(-6px) rotate(-45deg)';
      } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      }
    });
  }

  /* --- Reveal on scroll --- */
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(el => observer.observe(el));
  }

  /* --- Projects carousel --- */
  const track   = document.getElementById('projects-track');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');

  if (track && prevBtn && nextBtn) {
    let currentIndex = 0;
    const cards = track.querySelectorAll('.project-card');
    const cardWidth = () => cards[0].offsetWidth + 24; // gap = 24px

    const updateCarousel = () => {
      track.style.transform = `translateX(-${currentIndex * cardWidth()}px)`;
      prevBtn.disabled = currentIndex === 0;
      nextBtn.disabled = currentIndex >= cards.length - 1;
    };

    prevBtn.addEventListener('click', () => {
      if (currentIndex > 0) { currentIndex--; updateCarousel(); }
    });
    nextBtn.addEventListener('click', () => {
      if (currentIndex < cards.length - 1) { currentIndex++; updateCarousel(); }
    });

    updateCarousel();
  }

  /* --- Contact form: normalize fields to English for Odoo --- */
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Collect values (field names are already in English in the HTML)
      const data = {
        Name:        form.querySelector('[name="name"]')?.value?.trim() || '',
        Email:       form.querySelector('[name="email"]')?.value?.trim() || '',
        Phone:       form.querySelector('[name="phone"]')?.value?.trim() || '',
        Country:     form.querySelector('[name="country"]')?.value?.trim() || '',
        Message:     form.querySelector('[name="message"]')?.value?.trim() || '',
        Timestamp:   new Date().toISOString(),
        Source:      'caronicapital.com',
      };

      // In production: send data to Odoo endpoint
      // fetch('/api/contact', { method: 'POST', body: JSON.stringify(data) })
      console.log('Form data (normalized for Odoo):', data);

      // Show success message
      const submitBtn = form.querySelector('[type="submit"]');
      if (submitBtn) {
        submitBtn.textContent = 'Message Sent';
        submitBtn.disabled = true;
        submitBtn.style.background = '#2a6b3a';
      }
    });
  }

  /* --- Active nav link --- */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.main-nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.style.color = 'var(--color-white)';
      link.style.setProperty('--nav-active', '1');
    }
  });

});

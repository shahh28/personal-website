// 1. Fade-in on scroll for sections
const revealElements = document.querySelectorAll('section, .experience-single-card');
const revealOnScroll = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
      observer.unobserve(entry.target);
    }
  });
};
const observer = new IntersectionObserver(revealOnScroll, { threshold: 0.12 });
revealElements.forEach(el => {
  el.classList.add('fade-init');
  observer.observe(el);
});

// 2. Project card hover lift (handled with CSS, but add class for fallback)
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mouseenter', () => card.classList.add('hovered'));
  card.addEventListener('mouseleave', () => card.classList.remove('hovered'));
});

// 3. Button hover scale (handled with CSS, but add class for fallback)
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('mouseenter', () => btn.classList.add('btn-hovered'));
  btn.addEventListener('mouseleave', () => btn.classList.remove('btn-hovered'));
});

// 4. Navbar shadow on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.classList.add('navbar-shadow');
  } else {
    navbar.classList.remove('navbar-shadow');
  }
});

// 5. Hero text fade-in on load
window.addEventListener('DOMContentLoaded', () => {
  const hero = document.querySelector('.hero-content');
  if (hero) hero.classList.add('fade-in');
});

// 6. Social icon hover scale (handled with CSS, but add class for fallback)
document.querySelectorAll('.social-link').forEach(link => {
  link.addEventListener('mouseenter', () => link.classList.add('icon-hovered'));
  link.addEventListener('mouseleave', () => link.classList.remove('icon-hovered'));
}); 
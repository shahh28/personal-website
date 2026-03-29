/* ============================================================
   Shah Rahman Portfolio — script.js
   ============================================================ */

// ── Navbar scroll effect ────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

// ── Hamburger menu ──────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navMenu   = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    const open = navMenu.classList.toggle('open');
    hamburger.classList.toggle('active', open);
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        hamburger.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target)) {
        navMenu.classList.remove('open');
        hamburger.classList.remove('active');
    }
});

// ── Scroll reveal (IntersectionObserver) ────────────────────
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.10 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Stagger delay for grouped children
const staggerParents = [
    '.about-stats',
    '.exp-list',
    '.projects-grid',
    '.skills-layout',
    '.contact-links',
];

staggerParents.forEach(selector => {
    const parent = document.querySelector(selector);
    if (!parent) return;
    parent.querySelectorAll('.reveal').forEach((child, i) => {
        child.style.transitionDelay = `${i * 0.08}s`;
    });
});

// ── Active nav link on scroll ───────────────────────────────
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
            });
        }
    });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => sectionObserver.observe(s));

// ── Contact form submission ─────────────────────────────────
const form        = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');
const submitBtn   = document.getElementById('submitBtn');

if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        submitBtn.innerHTML = 'Sending&hellip;';
        submitBtn.disabled  = true;

        try {
            const res = await fetch(form.action, {
                method:  'POST',
                body:    new FormData(form),
                headers: { 'Accept': 'application/json' },
            });

            if (res.ok) {
                form.reset();
                form.style.display   = 'none';
                formMessage.style.display = 'block';
            } else {
                throw new Error('Server error');
            }
        } catch {
            submitBtn.innerHTML = 'Send Message &nbsp;<i class="fas fa-paper-plane"></i>';
            submitBtn.disabled  = false;
            alert('Something went wrong — please try emailing me directly at shahrahman0628@gmail.com');
        }
    });
}

// ── Smooth skill tag hover animation (CSS handles it, 
//    but we add a tiny random delay so it feels organic) ─────
document.querySelectorAll('.stag').forEach(tag => {
    tag.style.transitionDelay = `${Math.random() * 0.04}s`;
});
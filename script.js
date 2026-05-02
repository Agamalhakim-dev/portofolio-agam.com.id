// ===== NAVBAR =====
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 30);
  updateActiveNav();
  revealElements();
  animateSkills();
});

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  const isOpen = navLinks.classList.contains('open');
  spans[0].style.transform = isOpen ? 'rotate(45deg) translate(5px,5px)' : '';
  spans[1].style.opacity = isOpen ? '0' : '1';
  spans[2].style.transform = isOpen ? 'rotate(-45deg) translate(5px,-5px)' : '';
});

navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.querySelectorAll('span').forEach(s => { s.style.transform=''; s.style.opacity='1'; });
  });
});

function updateActiveNav() {
  const sections = ['home','about','skills','projects','certifications','contact'];
  let current = 'home';
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el && window.scrollY >= el.offsetTop - 200) current = id;
  });
  document.querySelectorAll('.nav-link').forEach(l => {
    l.classList.toggle('active', l.getAttribute('href') === '#' + current);
  });
}

// ===== TYPED TEXT =====
const phrases = ['Web Developer', 'UI/UX Designer', 'Frontend Engineer', 'Creative Coder'];
let phraseIdx = 0, charIdx = 0, deleting = false;
const typedEl = document.getElementById('typedText');

function type() {
  const current = phrases[phraseIdx];
  if (!deleting) {
    typedEl.textContent = current.substring(0, charIdx + 1);
    charIdx++;
    if (charIdx === current.length) { deleting = true; setTimeout(type, 1800); return; }
  } else {
    typedEl.textContent = current.substring(0, charIdx - 1);
    charIdx--;
    if (charIdx === 0) { deleting = false; phraseIdx = (phraseIdx + 1) % phrases.length; }
  }
  setTimeout(type, deleting ? 60 : 100);
}
setTimeout(type, 800);

// ===== PARTICLES =====
const particlesContainer = document.getElementById('particles');
for (let i = 0; i < 25; i++) {
  const p = document.createElement('div');
  p.className = 'particle';
  const size = Math.random() * 4 + 2;
  p.style.cssText = `
    width:${size}px; height:${size}px;
    left:${Math.random()*100}%;
    animation-duration:${Math.random()*15+10}s;
    animation-delay:${Math.random()*10}s;
    background:${Math.random()>0.5?'#7c3aed':'#06b6d4'};
    opacity:${Math.random()*0.4+0.1};
  `;
  particlesContainer.appendChild(p);
}

// ===== REVEAL ON SCROLL =====
function revealElements() {
  document.querySelectorAll('.reveal').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) el.classList.add('visible');
  });
}

// ===== SCROLL REVEAL (IntersectionObserver) =====
const revealClasses = ['reveal', 'reveal-left', 'reveal-right', 'reveal-scale'];

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target); // animate once
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

function registerRevealElements() {
  // About section
  const aboutText = document.querySelector('.about-text');
  if (aboutText) { aboutText.classList.add('reveal-left'); revealObserver.observe(aboutText); }

  const aboutCards = document.querySelector('.about-cards');
  if (aboutCards) { aboutCards.classList.add('reveal-right'); revealObserver.observe(aboutCards); }

  // Stats
  document.querySelectorAll('.stat-item').forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = (i * 0.1) + 's';
    revealObserver.observe(el);
  });

  // Info cards
  document.querySelectorAll('.info-card').forEach((el, i) => {
    el.classList.add('reveal-scale');
    el.style.transitionDelay = (i * 0.1) + 's';
    revealObserver.observe(el);
  });

  // Skill categories
  document.querySelectorAll('.skill-category').forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = (i * 0.12) + 's';
    revealObserver.observe(el);
  });

  // Project cards
  document.querySelectorAll('.project-card').forEach((el, i) => {
    el.classList.add('reveal-scale');
    el.style.transitionDelay = (i * 0.08) + 's';
    revealObserver.observe(el);
  });

  // Contact items
  document.querySelectorAll('.contact-item').forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = (i * 0.1) + 's';
    revealObserver.observe(el);
  });

  const contactForm = document.querySelector('.contact-form');
  if (contactForm) { contactForm.classList.add('reveal-right'); revealObserver.observe(contactForm); }

  const contactInfo = document.querySelector('.contact-info');
  if (contactInfo) { contactInfo.classList.add('reveal-left'); revealObserver.observe(contactInfo); }

  // Section headers
  document.querySelectorAll('.section-header').forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
  });

  // Filter tabs
  const filterTabs = document.querySelector('.filter-tabs');
  if (filterTabs) { filterTabs.classList.add('reveal'); revealObserver.observe(filterTabs); }
}

registerRevealElements();


// ===== PROJECT FILTER =====
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    const filter = this.getAttribute('data-filter');
    document.querySelectorAll('.project-card').forEach(card => {
      const cat = card.getAttribute('data-cat');
      const show = filter === 'all' || cat === filter;
      card.style.opacity = show ? '1' : '0';
      card.style.transform = show ? 'scale(1)' : 'scale(0.9)';
      card.style.pointerEvents = show ? 'all' : 'none';
      card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      card.classList.toggle('hidden', !show);
    });
  });
});

// ===== CONTACT FORM =====
function handleSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById('submit-btn');
  btn.disabled = true;
  btn.innerHTML = '<span>Sending...</span>';
  setTimeout(() => {
    btn.innerHTML = '<span>Send Message</span>';
    btn.disabled = false;
    document.getElementById('formSuccess').classList.add('show');
    e.target.reset();
    setTimeout(() => document.getElementById('formSuccess').classList.remove('show'), 5000);
  }, 1500);
}

// ===== SMOOTH SCROLL HERO =====
document.getElementById('heroScroll')?.addEventListener('click', () => {
  document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
});

// ===== CERTIFICATIONS LIGHTBOX =====
document.querySelectorAll('.cert-card').forEach(card => {
  card.addEventListener('click', () => {
    const img = card.querySelector('.cert-img');
    const placeholder = card.querySelector('.cert-placeholder');
    const lightbox = document.getElementById('certLightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    if (img && img.style.display !== 'none' && img.src) {
      lightboxImg.src = img.src;
      lightboxImg.style.display = 'block';
    } else {
      lightboxImg.style.display = 'none';
    }
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});

function closeLightbox() {
  document.getElementById('certLightbox').classList.remove('open');
  document.body.style.overflow = '';
}
document.getElementById('lightboxClose')?.addEventListener('click', closeLightbox);
document.getElementById('lightboxBackdrop')?.addEventListener('click', closeLightbox);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

// Register cert cards for reveal
document.querySelectorAll('.cert-card').forEach((el, i) => {
  el.classList.add('reveal-scale');
  el.style.transitionDelay = (i * 0.1) + 's';
  revealObserver.observe(el);
});


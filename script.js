document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initScrollEffects();
  initTypingEffect();
  initRevealAnimations();
  initSkillBars();
  initCounterAnimation();
  initProjectFilter();
  initContactForm();
  initCursorGlow();
  initYear();
  initAvatar();
});

/* ---- Navigation ---- */
function initNavigation() {
  const header = document.getElementById('header');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav__link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  });

  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    navToggle.classList.toggle('active');
    navToggle.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      navToggle.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
          });
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );

  sections.forEach(section => observer.observe(section));
}

/* ---- Scroll Effects ---- */
function initScrollEffects() {
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 500);
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ---- Typing Effect ---- */
function initTypingEffect() {
  const element = document.getElementById('typedName');
  const names = ['Shantanu Bhoge', 'a Fresher', 'an Aspiring Developer'];
  let nameIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const current = names[nameIndex];

    if (isDeleting) {
      element.textContent = current.substring(0, charIndex - 1);
      charIndex--;
    } else {
      element.textContent = current.substring(0, charIndex + 1);
      charIndex++;
    }

    let speed = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === current.length) {
      speed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      nameIndex = (nameIndex + 1) % names.length;
      speed = 500;
    }

    setTimeout(type, speed);
  }

  type();
}

/* ---- Reveal on Scroll ---- */
function initRevealAnimations() {
  const reveals = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          const siblings = entry.target.parentElement.querySelectorAll('.reveal');
          const siblingIndex = Array.from(siblings).indexOf(entry.target);
          entry.target.style.transitionDelay = `${siblingIndex * 0.1}s`;
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  reveals.forEach(el => observer.observe(el));
}

/* ---- Skill Progress Bars ---- */
function initSkillBars() {
  const bars = document.querySelectorAll('.skill-card__fill');

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const progress = entry.target.dataset.progress;
          entry.target.style.width = `${progress}%`;
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  bars.forEach(bar => observer.observe(bar));
}

/* ---- Counter Animation ---- */
function initCounterAnimation() {
  const counters = document.querySelectorAll('.stat__number');

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element) {
  const target = parseInt(element.dataset.count, 10);
  const duration = 2000;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    element.textContent = Math.floor(eased * target);

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

/* ---- Project Filter ---- */
function initProjectFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      projectCards.forEach(card => {
        const categories = card.dataset.category.split(' ');
        const show = filter === 'all' || categories.includes(filter);

        card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';

        if (show) {
          card.classList.remove('hidden');
          requestAnimationFrame(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          });
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => card.classList.add('hidden'), 400);
        }
      });
    });
  });
}

/* ---- Contact Form ---- */
function initContactForm() {
  const form = document.getElementById('contactForm');

  const inputs = form.querySelectorAll('input, textarea');

  inputs.forEach(input => {
    input.addEventListener('focus', () => {
      input.parentElement.classList.add('focused');
    });

    input.addEventListener('blur', () => {
      input.parentElement.classList.remove('focused');
    });
  });
}

/* ---- Cursor Glow ---- */
function initCursorGlow() {
  const glow = document.querySelector('.cursor-glow');

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let mouseX = 0;
  let mouseY = 0;
  let glowX = 0;
  let glowY = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animate() {
    glowX += (mouseX - glowX) * 0.08;
    glowY += (mouseY - glowY) * 0.08;
    glow.style.left = `${glowX}px`;
    glow.style.top = `${glowY}px`;
    requestAnimationFrame(animate);
  }

  animate();
}

/* ---- Footer Year ---- */
function initYear() {
  document.getElementById('year').textContent = new Date().getFullYear();
}
/* ---- Creative Avatar ---- */
function initAvatar() {
  const photo = document.getElementById('avatarPhoto');
  const initials = document.getElementById('avatarInitials');
  if (!photo || !initials) return;

  const showPhoto = () => {
    photo.classList.add('loaded');
    initials.classList.add('hidden');
  };

  const showInitials = () => {
    photo.classList.remove('loaded');
    initials.classList.remove('hidden');
  };

  if (photo.complete && photo.naturalWidth > 0) {
    showPhoto();
  } else {
    showInitials();
    photo.addEventListener('load', showPhoto);
    photo.addEventListener('error', showInitials);
  }
}
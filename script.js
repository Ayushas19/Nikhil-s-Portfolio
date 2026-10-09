/* ==========================================================================
   NIKHIL YADAV PORTFOLIO INTERACTIVITY SCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Contact Modal Controls
  const modalBackdrop = document.getElementById('contactModal');
  const openModalBtns = document.querySelectorAll('.open-contact-modal');
  const closeModalBtn = document.getElementById('closeModalBtn');

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modalBackdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
      modalBackdrop.classList.remove('active');
      document.body.style.overflow = 'auto';
    });
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) {
        modalBackdrop.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    });
  }

  // 2. Testimonials Carousel
  const testimonials = document.querySelectorAll('.testimonial-card');
  const dots = document.querySelectorAll('.dot');
  let currentIndex = 0;

  function showTestimonial(index) {
    testimonials.forEach((card, i) => {
      card.classList.toggle('active', i === index);
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
    currentIndex = index;
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      showTestimonial(i);
    });
  });

  // Auto slide every 6 seconds
  setInterval(() => {
    let nextIndex = (currentIndex + 1) % testimonials.length;
    showTestimonial(nextIndex);
  }, 6000);

  // 3. Logo Click Spotlight Animation Feature
  const logoLink = document.querySelector('.logo');
  const spotlightBackdrop = document.getElementById('logoSpotlight');
  const closeSpotlightBtn = document.getElementById('closeSpotlightBtn');
  const spotlightExploreBtn = document.getElementById('spotlightExploreBtn');
  const heroTitle = document.querySelector('.hero-title');
  const heroAvatar = document.querySelector('.avatar-img');

  if (logoLink) {
    logoLink.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Trigger center spotlight animation modal
      if (spotlightBackdrop) {
        spotlightBackdrop.classList.add('active');
        document.body.style.overflow = 'hidden';
      }

      // Also pulse hero title & avatar on page
      if (heroTitle) {
        heroTitle.classList.remove('highlight-pulse');
        void heroTitle.offsetWidth; // Trigger reflow
        heroTitle.classList.add('highlight-pulse');
      }
      if (heroAvatar) {
        heroAvatar.classList.remove('highlight-pulse');
        void heroAvatar.offsetWidth; // Trigger reflow
        heroAvatar.classList.add('highlight-pulse');
      }
    });
  }

  if (closeSpotlightBtn) {
    closeSpotlightBtn.addEventListener('click', () => {
      spotlightBackdrop.classList.remove('active');
      document.body.style.overflow = 'auto';
    });
  }

  if (spotlightExploreBtn) {
    spotlightExploreBtn.addEventListener('click', () => {
      spotlightBackdrop.classList.remove('active');
      document.body.style.overflow = 'auto';
    });
  }

  if (spotlightBackdrop) {
    spotlightBackdrop.addEventListener('click', (e) => {
      if (e.target === spotlightBackdrop) {
        spotlightBackdrop.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    });
  }

  // 4. Smooth Anchor Scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
});


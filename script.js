/* ==========================================================================
   NIKHIL YADAV PORTFOLIO INTERACTIVITY SCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ========================================================
  // 0. BACKGROUND REMOVAL (Canvas API – pixel manipulation)
  //    Removes white/near-white background from nikhil photo
  // ========================================================
  function removeBg(imgEl, canvasEl, threshold = 30, edgeSoftness = 10) {
    const ctx = canvasEl.getContext('2d');
    const w = canvasEl.width;
    const h = canvasEl.height;

    // Draw image scaled to canvas dimensions
    ctx.drawImage(imgEl, 0, 0, w, h);

    const imageData = ctx.getImageData(0, 0, w, h);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      // Distance from white (255,255,255)
      const dist = Math.sqrt(
        Math.pow(r - 255, 2) +
        Math.pow(g - 255, 2) +
        Math.pow(b - 255, 2)
      );

      if (dist < threshold) {
        // Fully transparent
        data[i + 3] = 0;
      } else if (dist < threshold + edgeSoftness) {
        // Soft edge – partial transparency
        const alpha = ((dist - threshold) / edgeSoftness) * 255;
        data[i + 3] = Math.round(alpha);
      }
      // else: keep original pixel
    }

    ctx.putImageData(imageData, 0, 0);
  }

  // Process hero photo
  const heroImg = document.getElementById('heroPhotoSrc');
  const heroCanvas = document.getElementById('heroPhotoCanvas');
  if (heroImg && heroCanvas) {
    const doHero = () => removeBg(heroImg, heroCanvas, 30, 12);
    if (heroImg.complete) doHero();
    else heroImg.addEventListener('load', doHero);
  }

  // Process spotlight photo
  const spotlightImg = document.getElementById('spotlightPhotoSrc');
  const spotlightCanvas = document.getElementById('spotlightPhotoCanvas');
  if (spotlightImg && spotlightCanvas) {
    const doSpotlight = () => removeBg(spotlightImg, spotlightCanvas, 30, 12);
    if (spotlightImg.complete) doSpotlight();
    else spotlightImg.addEventListener('load', doSpotlight);
  }


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


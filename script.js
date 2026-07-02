/**
 * Maha Captures - Premium Photography Portfolio
 * Main JavaScript File
 * Pure Vanilla JS - No Frameworks
 */

(function () {
  'use strict';

  /* ==========================================
     CONFIGURATION
     Update these values for your business
     ========================================== */
  const CONFIG = {
    whatsappNumber: '91978777149',
    email: 'framecodeteam@gmail.com',
    typingWords: ['Moments', 'Memories', 'Magic', 'Stories'],
    heroSlideInterval: 5000,
    testimonialInterval: 5000,
    loaderDuration: 2500
  };

  /* ==========================================
     DOM READY
     ========================================== */
  document.addEventListener('DOMContentLoaded', init);

  function init() {
    initLoader();
    initCustomCursor();
    initNavbar();
    initMobileMenu();
    initScrollProgress();
    initBackToTop();
    initHeroSlider();
    initTypingEffect();
    initScrollReveal();
    initCounterAnimation();
    initPortfolioFilter();
    initGalleryGrid();
    initLightbox();
    initTestimonialsSlider();
    initFAQAccordion();
    initBookingForm();
    initBookingModal();
    initButtonRipple();
    initSmoothScroll();
    initParallax();
    initLazyLoading();
  }

  /* ==========================================
     GALLERY GRID - 54 Placeholder Images
     ========================================== */
  function initGalleryGrid() {
    const grid = document.getElementById('gallery-grid');
    if (!grid) return;

    const categories = ['Wedding', 'Pre Wedding', 'Portrait', 'Fashion', 'Nature', 'Travel', 'Kids', 'Corporate', 'Birthday', 'Couples'];
    const labels = ['Elegant Moment', 'Golden Light', 'Pure Joy', 'Timeless Beauty', 'Natural Grace', 'Urban Style', 'Tender Love', 'Dreamy Scene', 'Soft Glow', 'Classic Portrait', 'Modern Edge', 'Candid Smile', 'Forever Yours', 'Serene View', 'Bold Expression', 'Sweet Memory', 'Radiant Day', 'Quiet Moment'];

    for (let i = 1; i <= 54; i++) {
      const cat = categories[i % categories.length];
      const label = labels[i % labels.length];
      const item = document.createElement('div');
      item.className = 'gallery-item reveal fade-up';
      item.setAttribute('data-title', label);
      item.setAttribute('data-category', cat);
      item.innerHTML =
      '<img src="https://picsum.photos/600/600?random=' + i + '" alt="' + label + ' - ' + cat + '" loading="lazy">' +
      '<div class="gallery-item-overlay">' +
      '<div class="gallery-item-zoom"><i class="fas fa-search-plus"></i></div>' +
      '<span class="gallery-item-label">' + cat + '</span>' +
      '</div>';
      grid.appendChild(item);
    }

    initScrollReveal();
    initLazyLoading();
  }

  /* ==========================================
     LOADING SCREEN
     ========================================== */
  function initLoader() {
    const loader = document.querySelector('.loader');
    if (!loader) return;

    document.body.classList.add('loading');

    window.addEventListener('load', function () {
      setTimeout(function () {
        loader.classList.add('hidden');
        document.body.classList.remove('loading');
      }, CONFIG.loaderDuration);
    });

    setTimeout(function () {
      loader.classList.add('hidden');
      document.body.classList.remove('loading');
    }, CONFIG.loaderDuration + 1000);
  }

  /* ==========================================
     CUSTOM CURSOR
     ========================================== */
  function initCustomCursor() {
    const dot = document.querySelector('.cursor-dot');
    const outline = document.querySelector('.cursor-outline');
    if (!dot || !outline) return;

    let mouseX = 0;
    let mouseY = 0;
    let outlineX = 0;
    let outlineY = 0;

    document.addEventListener('mousemove', function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = mouseX + 'px';
      dot.style.top = mouseY + 'px';
    });

    function animateOutline() {
      outlineX += (mouseX - outlineX) * 0.15;
      outlineY += (mouseY - outlineY) * 0.15;
      outline.style.left = outlineX + 'px';
      outline.style.top = outlineY + 'px';
      requestAnimationFrame(animateOutline);
    }
    animateOutline();

    const hoverElements = document.querySelectorAll('a, button, .portfolio-item, .gallery-item, .service-card, .filter-btn, input, select, textarea');
    hoverElements.forEach(function (el) {
      el.addEventListener('mouseenter', function () {
        outline.classList.add('hover');
      });
      el.addEventListener('mouseleave', function () {
        outline.classList.remove('hover');
      });
    });
  }

  /* ==========================================
     STICKY NAVBAR
     ========================================== */
  function initNavbar() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    document.querySelectorAll('.nav-link').forEach(function (link) {
      const href = link.getAttribute('href');
      if (href === currentPage || (currentPage === '' && href === 'index.html')) {
        link.classList.add('active');
      }
    });

    window.addEventListener('scroll', function () {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  /* ==========================================
     MOBILE MENU
     ========================================== */
  function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const overlay = document.querySelector('.nav-overlay');
    if (!hamburger || !overlay) return;

    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('active');
      overlay.classList.toggle('active');
      document.body.style.overflow = overlay.classList.contains('active') ? 'hidden' : '';
    });

    overlay.querySelectorAll('.nav-link, .nav-book-btn').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  /* ==========================================
     SCROLL PROGRESS BAR
     ========================================== */
  function initScrollProgress() {
    const progressBar = document.querySelector('.scroll-progress');
    if (!progressBar) return;

    window.addEventListener('scroll', function () {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressBar.style.width = progress + '%';
    });
  }

  /* ==========================================
     BACK TO TOP
     ========================================== */
  function initBackToTop() {
    const btn = document.querySelector('.back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', function () {
      if (window.scrollY > 500) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    });

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ==========================================
     HERO SLIDER
     ========================================== */
  function initHeroSlider() {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.hero-dot');
    if (slides.length === 0) return;

    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
      slides.forEach(function (slide, i) {
        slide.classList.toggle('active', i === index);
      });
      dots.forEach(function (dot, i) {
        dot.classList.toggle('active', i === index);
      });
      currentSlide = index;
    }

    function nextSlide() {
      showSlide((currentSlide + 1) % slides.length);
    }

    function startAutoSlide() {
      slideInterval = setInterval(nextSlide, CONFIG.heroSlideInterval);
    }

    dots.forEach(function (dot, index) {
      dot.addEventListener('click', function () {
        clearInterval(slideInterval);
        showSlide(index);
        startAutoSlide();
      });
    });

    showSlide(0);
    startAutoSlide();
  }

  /* ==========================================
     TYPING TEXT EFFECT
     ========================================== */
  function initTypingEffect() {
    const typingEl = document.querySelector('.typing-text');
    if (!typingEl) return;

    const words = CONFIG.typingWords;
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
      const currentWord = words[wordIndex];

      if (isDeleting) {
        typingEl.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typingEl.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
      }

      let typeSpeed = isDeleting ? 80 : 120;

      if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500;
      }

      setTimeout(type, typeSpeed);
    }

    type();
  }

  /* ==========================================
     SCROLL REVEAL ANIMATIONS
     ========================================== */
  function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    if (reveals.length === 0) return;

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );

    reveals.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ==========================================
     ANIMATED COUNTERS
     ========================================== */
  function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    if (counters.length === 0) return;

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach(function (counter) {
      observer.observe(counter);
    });
  }

  function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'), 10);
    const suffix = element.getAttribute('data-suffix') || '';
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    function update() {
      current += increment;
      if (current >= target) {
        element.textContent = target + suffix;
      } else {
        element.textContent = Math.floor(current) + suffix;
        requestAnimationFrame(update);
      }
    }

    update();
  }

  /* ==========================================
     PORTFOLIO FILTER
     ========================================== */
  function initPortfolioFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const items = document.querySelectorAll('.portfolio-item');
    if (filterBtns.length === 0 || items.length === 0) return;

    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const filter = btn.getAttribute('data-filter');

        filterBtns.forEach(function (b) {
          b.classList.remove('active');
        });
        btn.classList.add('active');

        items.forEach(function (item) {
          const category = item.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            item.classList.remove('hidden');
            item.style.display = '';
          } else {
            item.classList.add('hidden');
            setTimeout(function () {
              if (item.classList.contains('hidden')) {
                item.style.display = 'none';
              }
            }, 400);
          }
        });
      });
    });
  }

  /* ==========================================
     LIGHTBOX GALLERY
     ========================================== */
  function initLightbox() {
    const lightbox = document.querySelector('.lightbox');
    if (!lightbox) return;

    const lightboxImg = lightbox.querySelector('img');
    const caption = lightbox.querySelector('.lightbox-caption');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const prevBtn = lightbox.querySelector('.lightbox-prev');
    const nextBtn = lightbox.querySelector('.lightbox-next');

    let currentImages = [];
    let currentIndex = 0;

    function getGalleryItems() {
      return document.querySelectorAll('.portfolio-item:not(.hidden), .gallery-item');
    }

    function openLightbox(index) {
      const items = getGalleryItems();
      currentImages = Array.from(items);
      currentIndex = index;

      if (currentImages.length === 0) return;

      updateLightboxImage();
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }

    function updateLightboxImage() {
      const item = currentImages[currentIndex];
      if (!item) return;

      const img = item.querySelector('img');
      const title = item.getAttribute('data-title') || item.querySelector('h4')?.textContent || '';
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      if (caption) caption.textContent = title;
    }

    function showPrev() {
      currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
      updateLightboxImage();
    }

    function showNext() {
      currentIndex = (currentIndex + 1) % currentImages.length;
      updateLightboxImage();
    }

    document.addEventListener('click', function (e) {
      const item = e.target.closest('.portfolio-item, .gallery-item');
      if (!item) return;
      const visibleItems = getGalleryItems();
      const visibleIndex = Array.from(visibleItems).indexOf(item);
      if (visibleIndex >= 0) openLightbox(visibleIndex);
    });

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (prevBtn) prevBtn.addEventListener('click', showPrev);
    if (nextBtn) nextBtn.addEventListener('click', showNext);

    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', function (e) {
      if (!lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    });
  }

  /* ==========================================
     TESTIMONIALS SLIDER
     ========================================== */
  function initTestimonialsSlider() {
    const track = document.querySelector('.testimonial-track');
    const dots = document.querySelectorAll('.testimonial-dot');
    if (!track) return;

    const slides = track.querySelectorAll('.testimonial-slide');
    let currentSlide = 0;
    let autoInterval;

    function goToSlide(index) {
      currentSlide = index;
      track.style.transform = 'translateX(-' + currentSlide * 100 + '%)';
      dots.forEach(function (dot, i) {
        dot.classList.toggle('active', i === currentSlide);
      });
    }

    function nextSlide() {
      goToSlide((currentSlide + 1) % slides.length);
    }

    dots.forEach(function (dot, index) {
      dot.addEventListener('click', function () {
        clearInterval(autoInterval);
        goToSlide(index);
        autoInterval = setInterval(nextSlide, CONFIG.testimonialInterval);
      });
    });

    if (slides.length > 1) {
      goToSlide(0);
      autoInterval = setInterval(nextSlide, CONFIG.testimonialInterval);
    }
  }

  /* ==========================================
     FAQ ACCORDION
     ========================================== */
  function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length === 0) return;

    faqItems.forEach(function (item) {
      const question = item.querySelector('.faq-question');
      question.addEventListener('click', function () {
        const isActive = item.classList.contains('active');

        faqItems.forEach(function (other) {
          other.classList.remove('active');
        });

        if (!isActive) {
          item.classList.add('active');
        }
      });
    });
  }

  /* ==========================================
     BOOKING FORM - WhatsApp Redirect
     ========================================== */
  function initBookingForm() {
    const forms = document.querySelectorAll('.booking-form-element');
    forms.forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        handleBookingSubmit(form);
      });
    });
  }

  function handleBookingSubmit(form) {
    const name = form.querySelector('[name="name"]')?.value || '';
    const phone = form.querySelector('[name="phone"]')?.value || '';
    const email = form.querySelector('[name="email"]')?.value || '';
    const eventType = form.querySelector('[name="event_type"]')?.value || '';
    const eventDate = form.querySelector('[name="event_date"]')?.value || '';
    const location = form.querySelector('[name="location"]')?.value || '';
    const message = form.querySelector('[name="message"]')?.value || '';

    if (!name || !phone) {
      alert('Please fill in your Name and Phone number.');
      return;
    }

    const whatsappMessage =
      'Hello,\n' +
      'New Booking Request\n\n' +
      'Name: ' + name + '\n' +
      'Phone: ' + phone + '\n' +
      'Email: ' + email + '\n' +
      'Event: ' + eventType + '\n' +
      'Date: ' + eventDate + '\n' +
      'Location: ' + location + '\n' +
      'Message: ' + message;

    const whatsappURL = 'https://wa.me/' + CONFIG.whatsappNumber + '?text=' + encodeURIComponent(whatsappMessage);
    window.open(whatsappURL, '_blank');

    form.reset();
  }

  /* ==========================================
     BOOKING MODAL POPUP
     ========================================== */
  function initBookingModal() {
    const modal = document.querySelector('.modal-overlay');
    if (!modal) return;

    const openTriggers = document.querySelectorAll('[data-open-booking]');
    const closeBtn = modal.querySelector('.modal-close');

    openTriggers.forEach(function (trigger) {
      trigger.addEventListener('click', function (e) {
        e.preventDefault();
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', function () {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      });
    }

    modal.addEventListener('click', function (e) {
      if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  /* ==========================================
     BUTTON RIPPLE EFFECT
     ========================================== */
  function initButtonRipple() {
    document.querySelectorAll('.btn').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        ripple.classList.add('btn-ripple');
        const rect = btn.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = e.clientX - rect.left - size / 2 + 'px';
        ripple.style.top = e.clientY - rect.top - size / 2 + 'px';
        btn.appendChild(ripple);
        setTimeout(function () {
          ripple.remove();
        }, 600);
      });
    });
  }

  /* ==========================================
     SMOOTH SCROLL
     ========================================== */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          const navHeight = document.querySelector('.navbar')?.offsetHeight || 0;
          const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;
          window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        }
      });
    });
  }

  /* ==========================================
     PARALLAX BACKGROUND
     ========================================== */
  function initParallax() {
    const parallaxSections = document.querySelectorAll('.parallax-section');
    if (parallaxSections.length === 0) return;

    window.addEventListener('scroll', function () {
      parallaxSections.forEach(function (section) {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          const speed = 0.3;
          const yPos = (rect.top * speed);
          section.style.backgroundPositionY = yPos + 'px';
        }
      });
    });
  }

  /* ==========================================
     LAZY LOADING IMAGES
     ========================================== */
  function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    if (lazyImages.length === 0) return;

    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              const img = entry.target;
              img.src = img.getAttribute('data-src');
              img.removeAttribute('data-src');
              img.classList.add('loaded');
              imageObserver.unobserve(img);
            }
          });
        },
        { rootMargin: '100px' }
      );

      lazyImages.forEach(function (img) {
        imageObserver.observe(img);
      });
    } else {
      lazyImages.forEach(function (img) {
        img.src = img.getAttribute('data-src');
      });
    }
  }

  /* ==========================================
     SET FLOATING BUTTON LINKS
     ========================================== */
  document.querySelectorAll('.float-whatsapp').forEach(function (btn) {
    btn.href = 'https://wa.me/' + CONFIG.whatsappNumber + '?text=' + encodeURIComponent('Hello, I would like to inquire about your photography services.');
    btn.setAttribute('target', '_blank');
    btn.setAttribute('rel', 'noopener noreferrer');
  });

  document.querySelectorAll('.float-email').forEach(function (btn) {
    btn.href = 'mailto:' + CONFIG.email;
  });

})();

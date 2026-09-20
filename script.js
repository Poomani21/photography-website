/**
 * RJ Photography - Photography Portfolio
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
    whatsappNumber: '918056621821',
    email: 'rjphotographyvideo@gmail.com',
    typingWords: ['Moments', 'Memories', 'Magic', 'Stories'],
    heroSlideInterval: 5000,
    testimonialInterval: 5000,
    loaderDuration: 2500
  };

  window.RJPhotographyContact = {
    whatsappNumber: CONFIG.whatsappNumber
  };

  window.RJPhotographyEmailJS = {
    send: function (templateParams) {
      if (!window.emailjs) {
        return Promise.reject(new Error('EmailJS failed to load.'));
      }

      return window.emailjs.send(
        'service_0s4fxtx',
        'template_ivmzmx6',
        templateParams,
        { publicKey: 'kUJCJ6MbD5EeGeudQ' }
      );
    }
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
    initEventDatePickers();
    initFooterIcons();
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

    const categories = ['Wedding', 'Engagement', 'Pre-Wedding', 'Candid', 'Cinematic'];
    const labels = ['Wedding Moment', 'Engagement Celebration', 'Pre-Wedding Story', 'Candid Moment', 'Cinematic Memory'];
    const galleryImages = ['home1.webp', 'home2.webp', 'home3.webp', 'about.webp', 'cini.webp', 'eng.webp', 'pre.webp', 'can.webp', 'vid.webp', 'alb.webp', 'why.webp', 'pro1.webp', 'enge.webp', 'pro2.webp', 'pro3.webp', 'pro4.webp', 'pro5.webp', 'free.webp'];

    for (let i = 0; i < galleryImages.length; i++) {
      const cat = categories[i % categories.length];
      const label = labels[i % labels.length];
      const item = document.createElement('div');
      item.className = 'gallery-item reveal fade-up';
      item.setAttribute('data-title', label);
      item.setAttribute('data-category', cat);
      item.innerHTML =
      '<img src="images/rj/' + galleryImages[i] + '" alt="RJ Photography ' + label + ' - ' + cat + '" loading="lazy">' +
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
    if (!track) return;

    if (track._testimonialAutoInterval) {
      clearInterval(track._testimonialAutoInterval);
    }

    const previousButton = document.querySelector('.testimonial-prev');
    const nextButton = document.querySelector('.testimonial-next');
    const slides = track.querySelectorAll('.testimonial-slide');
    let currentSlide = 0;
    let autoInterval;

    function goToSlide(index) {
      currentSlide = index;
      track.style.transform = 'translateX(-' + currentSlide * 100 + '%)';
    }

    function nextSlide() {
      if (slides.length === 0) return;
      goToSlide((currentSlide + 1) % slides.length);
    }

    function startAutoSlide() {
      if (slides.length > 1) {
        autoInterval = setInterval(nextSlide, CONFIG.testimonialInterval);
        track._testimonialAutoInterval = autoInterval;
      }
    }

    if (previousButton) {
      previousButton.onclick = function () {
        if (slides.length === 0) return;
        clearInterval(autoInterval);
        goToSlide((currentSlide - 1 + slides.length) % slides.length);
        startAutoSlide();
      };
    }

    if (nextButton) {
      nextButton.onclick = function () {
        if (slides.length === 0) return;
        clearInterval(autoInterval);
        nextSlide();
        startAutoSlide();
      };
    }

    if (slides.length > 1) {
      goToSlide(0);
      startAutoSlide();
    }
  }

  window.refreshTestimonialsSlider = initTestimonialsSlider;

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
    const forms = document.querySelectorAll('.booking-form-element:not([data-emailjs-contact-form])');
    forms.forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        if (form.closest('.modal-overlay')) {
          handleModalBookingSubmit(form);
          return;
        }

        handleBookingSubmit(form);
      });
    });
  }

  function getBookingFormData(form) {
    return {
      name: form.querySelector('[name="name"]')?.value.trim() || '',
      phone: form.querySelector('[name="phone"]')?.value.trim() || '',
      email: form.querySelector('[name="email"]')?.value.trim() || '',
      eventType: form.querySelector('[name="event_type"]')?.value || '',
      eventDate: form.querySelector('[name="event_date"]')?.value || '',
      location: form.querySelector('[name="location"]')?.value.trim() || '',
      message: form.querySelector('[name="message"]')?.value.trim() || ''
    };
  }

  function createBookingWhatsAppMessage(formData) {
    return (
      'Hello,\n' +
      'New Booking Request\n\n' +
      'Name: ' + formData.name + '\n' +
      'Phone: ' + formData.phone + '\n' +
      'Email: ' + formData.email + '\n' +
      'Event: ' + formData.eventType + '\n' +
      'Date: ' + formData.eventDate + '\n' +
      'Location: ' + formData.location + '\n' +
      'Message: ' + formData.message
    );
  }

  function hasRequiredBookingDetails(formData) {
    if (formData.name && formData.phone) return true;

    alert('Please fill in your Name and Phone number.');
    return false;
  }

  function handleBookingSubmit(form) {
    const formData = getBookingFormData(form);

    if (!hasRequiredBookingDetails(formData)) return;

    const whatsappMessage = createBookingWhatsAppMessage(formData);

    const whatsappURL = 'https://wa.me/' + CONFIG.whatsappNumber + '?text=' + encodeURIComponent(whatsappMessage);
    window.open(whatsappURL, '_blank');

    form.reset();
  }

  async function handleModalBookingSubmit(form) {
    const formData = getBookingFormData(form);
    if (!hasRequiredBookingDetails(formData)) return;

    const submitButton = form.querySelector('[type="submit"]');
    const defaultButtonMarkup = submitButton.innerHTML;
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

    try {
      await window.RJPhotographyEmailJS.send({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        event_type: formData.eventType,
        event_date: formData.eventDate,
        location: formData.location,
        message: formData.message
      });

      const whatsappMessage = createBookingWhatsAppMessage(formData);
      const whatsappURL = 'https://wa.me/' + CONFIG.whatsappNumber + '?text=' + encodeURIComponent(whatsappMessage);
      form.reset();
      window.open(whatsappURL, '_blank', 'noopener');
    } catch (error) {
      console.error('EmailJS booking submission error:', error);
      alert('Unable to send your booking enquiry. Please try again or contact us via WhatsApp.');
    } finally {
      submitButton.disabled = false;
      submitButton.innerHTML = defaultButtonMarkup;
    }
  }

  /* ==========================================
     EVENT DATE PICKERS
     ========================================== */
  function initEventDatePickers() {
    const dateInputs = document.querySelectorAll(
      '[data-emailjs-contact-form] input[data-custom-event-date][name="event_date"], ' +
      '.modal-overlay .booking-form-element input[data-custom-event-date][name="event_date"]'
    );
    if (!dateInputs.length) return;

    const monthFormatter = new Intl.DateTimeFormat('en-IN', { month: 'long', year: 'numeric' });
    const weekdayLabels = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    let activeInput = null;
    let displayedDate = new Date();
    let picker = null;

    function parseDate(value) {
      if (!value) return null;

      const parts = value.split('-').map(Number);
      if (parts.length !== 3 || parts.some(Number.isNaN)) return null;

      return new Date(parts[0], parts[1] - 1, parts[2]);
    }

    function formatDate(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return year + '-' + month + '-' + day;
    }

    function isSameDate(firstDate, secondDate) {
      return firstDate && secondDate &&
        firstDate.getFullYear() === secondDate.getFullYear() &&
        firstDate.getMonth() === secondDate.getMonth() &&
        firstDate.getDate() === secondDate.getDate();
    }

    function createControl(label, icon, onClick) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'rj-date-picker-control';
      button.setAttribute('aria-label', label);
      button.innerHTML = icon;
      button.addEventListener('click', onClick);
      return button;
    }

    function renderPicker() {
      if (!picker || !activeInput) return;

      const selectedDate = parseDate(activeInput.value);
      const today = new Date();
      const year = displayedDate.getFullYear();
      const month = displayedDate.getMonth();
      const firstWeekday = new Date(year, month, 1).getDay();
      const daysInMonth = new Date(year, month + 1, 0).getDate();

      picker.replaceChildren();

      const header = document.createElement('div');
      header.className = 'rj-date-picker-header';
      header.append(
        createControl('Previous month', '<i class="fas fa-chevron-left"></i>', function () {
          displayedDate = new Date(year, month - 1, 1);
          renderPicker();
        })
      );

      const title = document.createElement('strong');
      title.className = 'rj-date-picker-title';
      title.textContent = monthFormatter.format(displayedDate);
      header.append(title);
      header.append(
        createControl('Next month', '<i class="fas fa-chevron-right"></i>', function () {
          displayedDate = new Date(year, month + 1, 1);
          renderPicker();
        })
      );
      picker.append(header);

      const weekdays = document.createElement('div');
      weekdays.className = 'rj-date-picker-weekdays';
      weekdayLabels.forEach(function (label) {
        const weekday = document.createElement('span');
        weekday.textContent = label;
        weekdays.append(weekday);
      });
      picker.append(weekdays);

      const days = document.createElement('div');
      days.className = 'rj-date-picker-days';
      for (let index = 0; index < firstWeekday; index += 1) {
        const blank = document.createElement('span');
        blank.setAttribute('aria-hidden', 'true');
        days.append(blank);
      }

      for (let day = 1; day <= daysInMonth; day += 1) {
        const date = new Date(year, month, day);
        const dayButton = document.createElement('button');
        dayButton.type = 'button';
        dayButton.className = 'rj-date-picker-day';
        dayButton.textContent = String(day);
        dayButton.setAttribute('aria-label', date.toLocaleDateString('en-IN', {
          day: 'numeric', month: 'long', year: 'numeric'
        }));

        if (isSameDate(date, selectedDate)) dayButton.classList.add('is-selected');
        if (isSameDate(date, today)) dayButton.classList.add('is-today');

        dayButton.addEventListener('click', function () {
          activeInput.value = formatDate(date);
          activeInput.dispatchEvent(new Event('input', { bubbles: true }));
          activeInput.dispatchEvent(new Event('change', { bubbles: true }));
          closePicker();
        });
        days.append(dayButton);
      }
      picker.append(days);
    }

    function positionPicker() {
      if (!picker || !activeInput) return;

      const inputBounds = activeInput.getBoundingClientRect();
      const padding = 12;
      const pickerWidth = picker.offsetWidth;
      const pickerHeight = picker.offsetHeight;
      const left = Math.min(Math.max(padding, inputBounds.left), window.innerWidth - pickerWidth - padding);
      let top = inputBounds.bottom + 8;

      if (top + pickerHeight > window.innerHeight - padding) {
        top = Math.max(padding, inputBounds.top - pickerHeight - 8);
      }

      picker.style.left = left + 'px';
      picker.style.top = top + 'px';
    }

    function closePicker() {
      if (!picker) return;

      picker.classList.remove('is-visible');
      if (activeInput) activeInput.setAttribute('aria-expanded', 'false');
      activeInput = null;
    }

    function openPicker(input) {
      activeInput = input;
      displayedDate = parseDate(input.value) || new Date();

      if (!picker) {
        picker = document.createElement('div');
        picker.className = 'rj-date-picker';
        picker.setAttribute('role', 'dialog');
        picker.setAttribute('aria-label', 'Choose event date');
        document.body.append(picker);
      }

      input.setAttribute('aria-expanded', 'true');
      renderPicker();
      picker.classList.add('is-visible');
      positionPicker();
    }

    dateInputs.forEach(function (input) {
      input.setAttribute('aria-haspopup', 'dialog');
      input.setAttribute('aria-expanded', 'false');
      input.addEventListener('pointerdown', function (event) {
        event.preventDefault();
        try {
          input.focus({ preventScroll: true });
        } catch (error) {
          input.focus();
        }
        openPicker(input);
      });
      input.addEventListener('keydown', function (event) {
        if (event.key !== 'Enter' && event.key !== ' ' && event.key !== 'ArrowDown') return;

        event.preventDefault();
        openPicker(input);
      });
    });

    document.addEventListener('pointerdown', function (event) {
      if (!picker || !picker.classList.contains('is-visible')) return;
      if (picker.contains(event.target) || (activeInput && activeInput.contains(event.target))) return;
      closePicker();
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') closePicker();
    });

    window.addEventListener('resize', function () {
      if (picker && picker.classList.contains('is-visible')) positionPicker();
    });
  }

  /* ==========================================
     FOOTER ICONS
     ========================================== */
  function initFooterIcons() {
    function getQuickLinkIcon(href) {
      if (href.includes('index.html')) return 'fa-house';
      if (href.includes('about.html')) return 'fa-circle-info';
      if (href.includes('portfolio.html') || href.includes('gallery.html')) return 'fa-images';
      if (href.includes('pricing.html')) return 'fa-tags';
      if (href.includes('reviews.html')) return 'fa-star';
      if (href.includes('contact.html')) return 'fa-address-card';
      return 'fa-link';
    }

    function getServiceIcon(text) {
      if (text.includes('commercial')) return 'fa-box-open';
      if (text.includes('videography')) return 'fa-video';
      if (text.includes('corporate')) return 'fa-briefcase';
      if (text.includes('portrait') || text.includes('fashion') || text.includes('baby')) return 'fa-camera';
      if (text.includes('pre') || text.includes('post')) return 'fa-heart';
      if (text.includes('wedding')) return 'fa-gem';
      return 'fa-camera';
    }

    document.querySelectorAll('footer .footer-links').forEach(function (list) {
      const title = list.parentElement.querySelector('.footer-title');
      const section = title ? title.textContent.trim().toLowerCase() : '';

      list.querySelectorAll('li').forEach(function (item) {
        if (item.querySelector('.footer-link-icon')) return;

        const link = item.querySelector('a');
        const href = link ? link.getAttribute('href') || '' : '';
        const text = (link || item).textContent.trim().toLowerCase();
        let iconName = '';

        if (section.includes('quick')) {
          iconName = getQuickLinkIcon(href);
        } else if (section.includes('service')) {
          iconName = getServiceIcon(text);
        } else if (section.includes('contact')) {
          if (href.startsWith('tel:')) iconName = 'fa-phone';
          else if (href.startsWith('mailto:')) iconName = 'fa-envelope';
          else iconName = 'fa-location-dot';
        }

        if (!iconName) return;

        const icon = document.createElement('i');
        icon.className = 'fas ' + iconName + ' footer-link-icon';
        icon.setAttribute('aria-hidden', 'true');
        (link || item).prepend(icon);
      });
    });
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
    if (CONFIG.email) {
      btn.href = 'mailto:' + CONFIG.email;
    } else {
      btn.style.display = 'none';
    }
  });

})();

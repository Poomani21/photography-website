import { initializeApp, getApps } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js';
import {
  addDoc,
  collection,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp
} from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js';

const firebaseConfig = {
  apiKey: 'AIzaSyArlMLrvKcwCN6wwh1T5BKK6acJqoicDAo',
  authDomain: 'rj-photography-3fc81.firebaseapp.com',
  projectId: 'rj-photography-3fc81',
  storageBucket: 'rj-photography-3fc81.firebasestorage.app',
  messagingSenderId: '808568126520',
  appId: '1:808568126520:web:18f050a33031972206facd',
  measurementId: 'G-P5T1DQHEJW'
};

// Reuse an existing Firebase app if another module has already initialized it.
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
const db = getFirestore(app);
const reviewsQuery = query(collection(db, 'reviews'), orderBy('createdAt', 'desc'));
let allReviews = [];

function stars(rating) {
  const safeRating = Math.min(5, Math.max(0, Number(rating) || 0));
  return '\u2605'.repeat(safeRating) + '\u2606'.repeat(5 - safeRating);
}

function initials(name) {
  const words = (name || '').trim().split(/\s+/).filter(Boolean);
  return words.length ? words.slice(0, 2).map((part) => part.charAt(0)).join('').toUpperCase() : 'R';
}

function eventIcon(functionName) {
  const event = (functionName || '').toLowerCase();
  // Keep Wedding first so a value such as "Wedding Reception" uses the wedding icon.
  if (event.includes('wedding')) return 'fa-gem';
  if (event.includes('reception')) return 'fa-champagne-glasses';
  if (event.includes('engagement')) return 'fa-heart';
  if (event.includes('birthday')) return 'fa-cake-candles';
  if (event.includes('baby')) return 'fa-baby';
  if (event.includes('corporate')) return 'fa-briefcase';
  if (/(photography|photoshoot|photo shoot|photo)/.test(event)) return 'fa-camera';
  return 'fa-wand-magic-sparkles';
}

function metadataLine(className, iconClass, text) {
  const line = document.createElement('p');
  line.className = `testimonial-role ${className}`;
  const icon = document.createElement('i');
  icon.className = `fas ${iconClass}`;
  icon.setAttribute('aria-hidden', 'true');
  const label = document.createElement('span');
  label.textContent = text;
  line.append(icon, label);
  return line;
}

function reviewCard(review, extraClass = '') {
  const card = document.createElement('article');
  card.className = `testimonial-slide ${extraClass}`.trim();
  if (review.id) card.id = `review-${review.id}`;
  const isHomeReview = extraClass.includes('home-review-card');

  const author = document.createElement('p');
  author.className = 'testimonial-author';
  author.textContent = review.name || 'RJ Photography Client';

  const role = metadataLine('review-event', eventIcon(review.functionName), review.functionName || 'Event');
  const place = metadataLine('review-place', 'fa-map-marker-alt', review.place || 'Location not provided');

  const rating = document.createElement('div');
  rating.className = 'testimonial-rating';
  rating.setAttribute('aria-label', `${review.rating} out of 5 stars`);
  rating.textContent = stars(review.rating);

  const feedback = document.createElement('p');
  feedback.className = 'testimonial-text';
  feedback.textContent = `\u201C${review.review || ''}\u201D`;

  if (isHomeReview) {
    const avatar = document.createElement('div');
    avatar.className = 'testimonial-avatar review-avatar';
    avatar.setAttribute('aria-hidden', 'true');
    avatar.textContent = initials(review.name);
    const homeRole = document.createElement('p');
    homeRole.className = 'testimonial-role';
    homeRole.textContent = review.functionName || 'Event';
    card.append(avatar, rating, feedback, author, homeRole);
  } else {
    card.append(author, role, place, rating, feedback);
  }
  return card;
}

function renderReviews(reviews, isFiltered = false) {
  const pageList = document.querySelector('[data-reviews-list]');
  if (pageList) {
    pageList.replaceChildren();
    if (!reviews.length) {
      const empty = document.createElement('p');
      empty.className = 'reviews-state';
      empty.textContent = isFiltered ? 'No reviews found.' : 'No reviews have been shared yet. Be the first to share your experience.';
      pageList.append(empty);
    } else {
      reviews.forEach((review) => pageList.append(reviewCard(review, 'review-card')));
    }
    scrollToRequestedReview();
  }

}

function scrollToRequestedReview() {
  const targetId = window.location.hash.slice(1);
  if (!targetId.startsWith('review-')) return;
  requestAnimationFrame(() => {
    const target = document.getElementById(targetId);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
}

function renderHomeReviews(reviews) {
  const track = document.querySelector('.testimonial-track');
  const dots = document.querySelector('.testimonial-dots');
  if (!track) return;

  track.replaceChildren();
  if (dots) dots.replaceChildren();

  reviews.forEach((review, index) => {
    const slide = document.createElement('div');
    slide.className = 'testimonial-slide';

    const avatar = document.createElement('div');
    avatar.className = 'testimonial-avatar home-initial-avatar';
    avatar.setAttribute('aria-hidden', 'true');
    avatar.textContent = initials(review.name);

    const rating = document.createElement('div');
    rating.className = 'testimonial-rating';
    rating.setAttribute('aria-label', `${review.rating} out of 5 stars`);
    rating.textContent = stars(review.rating);

    const feedback = document.createElement('p');
    feedback.className = 'testimonial-text home-review-preview';
    feedback.textContent = `\u201C${review.review || ''}\u201D`;

    const author = document.createElement('p');
    author.className = 'testimonial-author';
    author.textContent = review.name || 'RJ Photography Client';

    const role = document.createElement('p');
    role.className = 'testimonial-role';
    role.textContent = review.functionName || 'Event';

    slide.append(avatar, rating, feedback, author, role);
    track.append(slide);

    requestAnimationFrame(() => {
      if (feedback.scrollHeight > feedback.clientHeight && review.id) {
        const readMore = document.createElement('a');
        readMore.className = 'home-review-read-more';
        readMore.href = `reviews.html#review-${review.id}`;
        readMore.textContent = 'Read More';
        slide.insertBefore(readMore, author);
      }
    });
  });

  if (typeof window.refreshTestimonialsSlider === 'function') {
    window.refreshTestimonialsSlider();
  }
}

function reviewDate(review) {
  return review.createdAt && typeof review.createdAt.toDate === 'function' ? review.createdAt.toDate() : null;
}

function applyReviewFilters() {
  const pageList = document.querySelector('[data-reviews-list]');
  if (!pageList) return;

  const searchTerm = (document.querySelector('[data-review-search]')?.value || '').trim().toLowerCase();
  const dateFilter = document.querySelector('[data-review-date-filter]')?.value || 'all';
  const ratingFilter = document.querySelector('[data-review-rating-filter]')?.value || 'all';
  const now = new Date();
  const dateThresholds = {
    recent: 7,
    '1-month': 30,
    '6-months': 183,
    '1-year': 365
  };

  const filteredReviews = allReviews.filter((review) => {
    const searchable = [review.name, review.functionName, review.place, review.review]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();
    const matchesSearch = !searchTerm || searchable.includes(searchTerm);
    const matchesRating = ratingFilter === 'all' || Number(review.rating) === Number(ratingFilter);
    const createdAt = reviewDate(review);
    const matchesDate = dateFilter === 'all' || (createdAt && (now - createdAt) <= dateThresholds[dateFilter] * 86400000);
    return matchesSearch && matchesRating && matchesDate;
  });

  const hasActiveFilter = Boolean(searchTerm) || dateFilter !== 'all' || ratingFilter !== 'all';
  renderReviews(filteredReviews, hasActiveFilter);
}

function initReviewFilters() {
  const filters = document.querySelector('[data-review-filters]');
  if (!filters) return;

  filters.querySelectorAll('input, select').forEach((control) => {
    control.addEventListener('input', applyReviewFilters);
    control.addEventListener('change', applyReviewFilters);
  });

  filters.querySelector('[data-clear-review-filters]').addEventListener('click', () => {
    filters.querySelector('[data-review-search]').value = '';
    filters.querySelector('[data-review-date-filter]').value = 'all';
    filters.querySelector('[data-review-rating-filter]').value = 'all';
    applyReviewFilters();
  });
}

function showLoadError() {
  const pageList = document.querySelector('[data-reviews-list]');
  if (pageList) {
    pageList.replaceChildren();
    const error = document.createElement('p');
    error.className = 'reviews-state reviews-error';
    error.textContent = 'Reviews are unavailable right now. Please try again shortly.';
    pageList.append(error);
  }
}

function subscribeToReviews() {
  if (!document.querySelector('[data-reviews-list], .testimonial-track')) return;

  onSnapshot(
    reviewsQuery,
    (snapshot) => {
      allReviews = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      applyReviewFilters();
      renderHomeReviews(allReviews);
    },
    () => showLoadError()
  );
}

function setFormMessage(message, isError = false) {
  const status = document.querySelector('[data-review-status]');
  if (!status) return;
  status.textContent = message;
  status.classList.toggle('reviews-error', isError);
}

function initReviewForm() {
  const form = document.querySelector('[data-review-form]');
  if (!form) return;

  const ratingInput = form.querySelector('[name="rating"]');
  const starButtons = form.querySelectorAll('[data-rating-star]');
  const submitButton = form.querySelector('[type="submit"]');
  let isSubmitting = false;

  function updateStars(rating) {
    starButtons.forEach((button) => {
      const selected = Number(button.dataset.ratingStar) <= rating;
      button.classList.toggle('selected', selected);
      button.setAttribute('aria-pressed', String(selected));
    });
  }

  starButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const rating = Number(button.dataset.ratingStar);
      ratingInput.value = String(rating);
      updateStars(rating);
      setFormMessage('');
    });
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (isSubmitting) return;

    const name = form.elements.name.value.trim();
    const functionName = form.elements.functionName.value;
    const place = form.elements.place.value.trim();
    const rating = Number(ratingInput.value);
    const review = form.elements.review.value.trim();

    if (!name || !functionName || !place || !review || !Number.isInteger(rating) || rating < 1 || rating > 5) {
      setFormMessage('Please complete every field and select a rating from 1 to 5 stars.', true);
      return;
    }

    isSubmitting = true;
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
    setFormMessage('');

    try {
      await addDoc(collection(db, 'reviews'), {
        name,
        functionName,
        place,
        rating,
        review,
        createdAt: serverTimestamp()
      });
      form.reset();
      ratingInput.value = '';
      updateStars(0);
      setFormMessage('Thank you! Your review has been submitted successfully.');
    } catch (error) {
      setFormMessage('We could not submit your review right now. Please try again shortly.', true);
    } finally {
      isSubmitting = false;
      submitButton.disabled = false;
      submitButton.innerHTML = '<i class="fas fa-paper-plane"></i> Submit Review';
    }
  });
}

// Clear the static fallback slides before populating the existing Home carousel from Firestore.
if (document.querySelector('.testimonial-track')) {
  renderHomeReviews([]);
}

subscribeToReviews();
initReviewFilters();
initReviewForm();

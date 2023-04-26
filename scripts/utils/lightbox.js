let currentIndex;
const nextBtn = document.getElementById('next-lightbox');
const previousBtn = document.getElementById('previous-lightbox');
const lightboxModal = document.getElementById('lightbox-modal');
const closeBtn = document.getElementById('close-lightbox');

function openLightbox(index) {
  const main = document.getElementById('main');
  const lightbox = document.getElementById('lightbox-modal');
  const modalWrapper = document.querySelector('.modal-wrapper');
  const media = document.querySelector(`.media[data-index="${index}"]`);
  const mediaTitle = document.querySelector(`.media-title[data-index="${index}"]`);

  currentIndex = index;
  document.body.classList.add('modal-open');
  lightbox.style.display = 'block';
  modalWrapper.style.visibility = 'visible';
  closeBtn.focus();
  main.setAttribute('aria-hidden', 'true');
  lightbox.setAttribute('aria-hidden', 'false');
  media.style.display = 'block';
  mediaTitle.style.display = 'block';
}

function closeLightbox() {
  const main = document.getElementById('main');
  const lightbox = document.getElementById('lightbox-modal');
  const modalWrapper = document.querySelector('.modal-wrapper');
  const media = document.querySelectorAll('.media');
  const mediaTitle = document.querySelectorAll('.media-title');

  document.body.classList.remove('modal-open');
  lightbox.style.display = 'none';
  modalWrapper.style.visibility = 'hidden';
  main.setAttribute('aria-hidden', 'false');
  lightbox.setAttribute('aria-hidden', 'true');
  media.forEach((item) => item.style.display = 'none');
  mediaTitle.forEach((item) => item.style.display = 'none');
}

function goToNext() {
  const allMedia = document.querySelectorAll('.media');
  const allMediaTitles = document.querySelectorAll('.media-title');

  if (currentIndex === allMedia.length - 1) {
    currentIndex = 0;
  } else {
    currentIndex = parseInt(currentIndex) + 1;
  }

  const next = document.querySelector(`.media[data-index="${currentIndex}"]`);
  const nextTitle = document.querySelector(`.media-title[data-index="${currentIndex}"]`);

  allMedia.forEach((item) => item.style.display = 'none');
  allMediaTitles.forEach((item) => item.style.display = 'none');
  next.style.display = 'block';
  nextTitle.style.display = 'block';
}

function goToPrevious() {
  const allMedia = document.querySelectorAll('.media');

  if (currentIndex === 0) {
    currentIndex = allMedia.length - 1;
  } else {
    currentIndex = parseInt(currentIndex) - 1;
  }

  const previous = document.querySelector(`.media[data-index="${currentIndex}"]`);

  allMedia.forEach((item) => item.style.display = 'none');
  previous.style.display = 'block';
}

nextBtn.addEventListener('click', goToNext);
previousBtn.addEventListener('click', goToPrevious);

window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') {
    previousBtn.click();
  } else if (e.key === 'ArrowRight') {
    nextBtn.click();
  } else if (e.key === 'Escape') {
    closeBtn.click();
  }
});

document.body.addEventListener('touchmove', (event) => {
  if (document.body.classList.contains('modal-open')) {
    event.preventDefault();
  }
}, { passive: false });

document.body.addEventListener('wheel', (event) => {
  if (document.body.classList.contains('modal-open')) {
    event.preventDefault();
  }
}, { passive: false });

document.body.addEventListener('keydown', (event) => {
  if (document.body.classList.contains('modal-open')) {
    if (event.key === 'Tab' || event.key === 'ArrowLeft' || event.key === 'ArrowRight' || event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      event.preventDefault();
    }
  }
}, { passive: false });

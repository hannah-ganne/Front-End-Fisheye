// const media = document.getElementsByClassName("card-media");
let currentIndex;
const nextBtn = document.getElementById('next-lightbox');
const previousBtn = document.getElementById('previous-lightbox');

function openLightbox(index) {
    const main = document.getElementById("main");
    const lightbox = document.getElementById("lightbox-modal");
    const closeBtn = document.getElementById("close-lightbox");
    const modalWrapper = document.querySelector(".modal-wrapper");
    const media = document.querySelector(`.media[data-index="${index}"]`);

    currentIndex = index;
    lightbox.style.display = "block";
    modalWrapper.style.visibility = "visible"
    closeBtn.focus();
    main.setAttribute('aria-hidden', 'true');
    lightbox.setAttribute('aria-hidden', 'false');
    media.style.display = "block";
}

function closeLightbox() {
    const main = document.getElementById("main");
    const lightbox = document.getElementById("lightbox-modal");
    const modalWrapper = document.querySelector(".modal-wrapper");
    const media = document.querySelectorAll(".media");

    lightbox.style.display = "none";
    modalWrapper.style.visibility = "hidden"
    main.setAttribute('aria-hidden', 'false');
    lightbox.setAttribute('aria-hidden', 'true');
    media.forEach(item => item.style.display = "none")
}

function goToNext() {
    const allMedia = document.querySelectorAll(".media");

    if (currentIndex == allMedia.length - 1) {
        currentIndex = 0
    } else {
        currentIndex = parseInt(currentIndex) + 1;
    }

    const next = document.querySelector(`.media[data-index="${currentIndex}"]`);

    allMedia.forEach(item => item.style.display = "none")
    next.style.display = "block";
}

function goToPrevious() {
    const allMedia = document.querySelectorAll(".media");

    if (currentIndex == 0) {
        currentIndex = allMedia.length - 1
    } else {
        currentIndex = parseInt(currentIndex) - 1;
    }

    const previous = document.querySelector(`.media[data-index="${currentIndex}"]`);

    allMedia.forEach(item => item.style.display = "none")
    previous.style.display = "block";
}

// media.forEach(item => item.addEventListener('click', (event) => {
//     event.stopPropagation();
//     const index = event.target.getAttribute('data-index');
//     currentIndex = index;
//     openLightbox(index);
// }))

nextBtn.addEventListener('click', goToNext);
previousBtn.addEventListener('click', goToPrevious);
document.addEventListener('keydown', (event) => {
    if (event.code === 'ArrowRight') {
        goToNext()
    }
})
document.addEventListener('keydown', (event) => {
    if (event.code === 'ArrowLeft') {
        goToPrevious()
    }
})
document.addEventListener('keydown', (event) => {
    if (event.code === 'Escape') {
        closeLightbox()
    }
})

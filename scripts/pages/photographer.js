//Mettre le code JavaScript lié à la page photographer.html

function getPhotographerId() {
    let str = window.location.href;
    let url = new URL(str);
    let photographerId = url.searchParams.get('id')

    return photographerId
}

async function getPhotographer(id) {

    let photographer = await fetch('/data/photographers.json')
        .then(res => res.json())
        .then(data => data.photographers.filter(p => p.id === parseInt(id)))
        .catch(error => console.log(error))

    return photographer
}

async function getMedia() {

    const photographerId = getPhotographerId();

    let media = await fetch('/data/photographers.json')
        .then(res => res.json())
        .then(data => data.media.filter(m => m.photographerId === parseInt(photographerId)))
        .catch(error => console.log(error))

    return [...media]
}

async function displayPhotographerCard(photographer) {
    const photographerModel = new photographerFactory(photographer[0]);
    photographerModel.createPhotographerCard();
};

async function displayLightboxMedia(media) {
    const lightboxMedia = document.querySelector(".lightbox-media");
    lightboxMedia.innerHTML = ''
    media.map((item, index) => {
        const mediaModel = new mediaFactory(item);
        const lightbox = mediaModel.createLightbox(index);
        lightboxMedia.appendChild(lightbox);
    })
}

async function displayMediaCards(media) {
    const mediaSection = document.querySelector(".media-section")

    media.map((item, index) => {
        const mediaModel = new mediaFactory(item);
        const mediaCard = mediaModel.createMediaCard(index);
        mediaSection.appendChild(mediaCard);

        const cardMedia = document.querySelector(`.card-media[data-index="${index}"]`);
        cardMedia.addEventListener('click', () => {
            openLightbox(index)
        })
        cardMedia.addEventListener('keydown', (event) => {
            if (event.code === 'Enter') {
                openLightbox(index)
            }
        })
    });

    displayLightboxMedia(media);
}

async function displayPriceBanner(photographer, media) {
    const main = document.getElementById("main");

    const photographerPrice = photographer[0].price;
    const likes = media.map(m => m.likes)
    const totalLikeCount = likes.reduce((a, b) => a + b, 0)

    const priceBanner = `
        <div><span id="total-likes">${totalLikeCount}</span><img src="assets/icons/black-heart.svg" alt="heart icon" class="heart-icon" /></div>
        <span>${photographerPrice}€ / jour</span>
    `
    const div = document.createElement("div");
    div.className = "price-banner";
    div.setAttribute("aria-label", "price banner");

    div.innerHTML = priceBanner;
    main.appendChild(div);
}

async function likeMedia(event, index) {
    const likeCount = document.querySelector(`.like-count[data-index="${index}"]`);
    const media = await getMedia();
    const isLiked = event.target.getAttribute('data-liked');

    if (isLiked == "false") {
        media[index].likes += 1;
        event.target.setAttribute('data-liked', "true");
        likeCount.textContent = media[index].likes;
        event.target.setAttribute('src', 'assets/icons/heart.svg')
        updateTotalLikes()
    }
}

function updateTotalLikes() {
    const totalLikes = document.getElementById('total-likes');
    let like = parseInt(totalLikes.innerHTML) + 1;
    totalLikes.innerHTML = like;
}

async function sortMedia(value) {
    const media = await getMedia();

    media.sort((a, b) => {
        switch (value) {
            case 'Date':
                if (a.date > b.date) {
                    return 1
                } else {
                    return -1
                }
                break;
            case 'Titre':
                if (a.title > b.title) {
                    return 1
                } else {
                    return -1
                }
                break;
            case 'Popularité':
                if (a.likes > b.likes) {
                    return -1
                } else {
                    return 1
                }
                break;
        }
    })
    const mediaSection = document.querySelector(".media-section")
    mediaSection.innerHTML = '';
    displayMediaCards(media)
}

function handleKeyDown(e) {
    const keyboardfocusableElements = document.querySelectorAll(
        'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
    )

    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        e.preventDefault();
        const activeEl = [...keyboardfocusableElements].find(el => el === document.activeElement);
        let indexOfActiveEl = [...keyboardfocusableElements].indexOf(activeEl);

        e.key === 'ArrowRight'
            ? keyboardfocusableElements[indexOfActiveEl + 1].focus()
            : keyboardfocusableElements[indexOfActiveEl - 1].focus()
    }
}

async function init() {
    // Récupère les datas des photographes
    const photographerId = getPhotographerId();
    const photographer = await getPhotographer(photographerId);
    const media = await getMedia();
    displayPhotographerCard(photographer);
    displayMediaCards(media);
    displayPriceBanner(photographer, media);

    const main = document.getElementById('main');
    main.addEventListener('keydown', handleKeyDown);
};

init();


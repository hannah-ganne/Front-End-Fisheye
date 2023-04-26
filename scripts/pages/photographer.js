function getPhotographerId() {
    const str = window.location.href;
    const url = new URL(str);
    const photographerId = url.searchParams.get('id')

    return photographerId
}

async function getPhotographer(id) {
    try {
    const res = await fetch('/data/photographers.json');
    const data = await res.json();
    const photographer = data.photographers.filter(p => p.id === parseInt(id));
    return photographer;
    } catch (error) {
    console.log(error);
    return null;
    }
}

async function getMedia() {
    try {
        const photographerId = getPhotographerId();
        const res = await fetch('/data/photographers.json');
        const data = await res.json();
        const media = data.media.filter(m => m.photographerId === parseInt(photographerId));
        return [...media];
    } catch (error) {
    console.log(error);
    return null;
    }
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

function updateTotalLikes() {
    const totalLikes = document.getElementById('total-likes');
    const like = parseInt(totalLikes.innerHTML) + 1;
    totalLikes.innerHTML = like;
}

async function likeMedia(event, index) {
    const likeCount = document.querySelector(`.like-count[data-index="${index}"]`);
    const isLiked = event.target.getAttribute('data-liked');

    if (isLiked === "false") {
        likeCount.innerText = +likeCount.innerText + 1;
        event.target.setAttribute('data-liked', "true");
        event.target.setAttribute('src', 'assets/icons/heart.svg')
        updateTotalLikes()
    }
}

async function sortMedia(value) {
    const media = await getMedia();

    media.sort((a, b) => {
        switch (value) {
            case 'Date':
                if (a.date > b.date) {
                    return 1
                } 
                    return -1
                
                break;
            case 'Titre':
                if (a.title > b.title) {
                    return 1
                } 
                    return -1
                
                break;
            case 'Popularité':
                if (a.likes > b.likes) {
                    return -1
                } 
                    return 1
                
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

    if (!document.body.classList.contains('modal-open')) {
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
            e.preventDefault();
            const activeEl = [...keyboardfocusableElements].find(el => el === document.activeElement);
            const indexOfActiveEl = [...keyboardfocusableElements].indexOf(activeEl);

            e.key === 'ArrowRight'
                ? keyboardfocusableElements[indexOfActiveEl + 1].focus()
                : keyboardfocusableElements[indexOfActiveEl - 1].focus()
        }
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

const dropdownListItems = document.querySelectorAll('.dropdown-list');
dropdownListItems.forEach(item => {
    item.addEventListener('click', () => {
        sortMedia(item.dataset.value)
    });
})
dropdownListItems.forEach(item => {
    item.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            sortMedia(item.dataset.value);
            setValue(item.dataset.value);
            toggle();
        }
    });
});

init();


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

async function displayMediaCards(media) {
    const mediaSection = document.querySelector(".media-section")

    media.map(item => {
        const mediaModel = new mediaFactory(item);
        const mediaCard = mediaModel.createMediaCard();
        mediaSection.appendChild(mediaCard);
    });
}

async function displayPriceBanner(photographer, media) {
    const main = document.getElementById("main");

    const photographerPrice = photographer[0].price;
    const likes = media.map(m => m.likes)
    const totalLikeCount = likes.reduce((a, b) => a + b, 0)

    const priceBanner = `
        <span>${totalLikeCount} <img src="assets/icons/black-heart.svg" alt="heart icon" class="heart-icon" /></span>
        <span>${photographerPrice}€ / jour</span>
    `
    const div = document.createElement("div");
    div.className = "price-banner";
    div.setAttribute("aria-label", "price banner");

    div.innerHTML = priceBanner;
    main.appendChild(div);

}

async function init() {
    // Récupère les datas des photographes
    const photographerId = getPhotographerId();
    const photographer = await getPhotographer(photographerId);
    const media = await getMedia();
    displayPhotographerCard(photographer);
    displayMediaCards(media);
    displayPriceBanner(photographer, media);
};

init();


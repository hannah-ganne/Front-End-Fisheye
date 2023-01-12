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
    const photographerModel = photographerFactory(photographer[0]);
    const photographerCard = photographerModel.createPhotographerCard();
};

async function displayMediaCards(media) {
    const mediaSection = document.querySelector(".media-section")

    media.map(item => {
        const mediaModel = mediaFactory(item);
        const mediaCard = mediaModel.createMediaCard();
        mediaSection.appendChild(mediaCard);
    });


}

async function init() {
    // Récupère les datas des photographes
    const photographerId = getPhotographerId();
    const photographer = await getPhotographer(photographerId);
    const media = await getMedia();
    displayPhotographerCard(photographer);
    displayMediaCards(media);
};

init();


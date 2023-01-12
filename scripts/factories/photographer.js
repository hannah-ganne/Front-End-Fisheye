function photographerFactory(data) {
    const { name, id, city, country, tagline, price, portrait } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement('article');

        const AllPhotographers = `
            <a href="./photographer.html?id=${id}">
                <img src=${picture} alt='photo of ${name}' />
                <h2>${name}</h2>
            </a>
            <h3>${city}, ${country}</h3>
            <p>${tagline}</p>
            <span>${price}€/jour</span>
        `;

        article.innerHTML = AllPhotographers;

        return (article);
    }

    function createPhotographerCard() {
        const header = document.querySelector('.photograph-header');

        const Photographer = `
            <section class="photograph-info">
                <h1>${name}</h1>
                <h3>${city}, ${country}</h3>
                <p>${tagline}</p>
            </section>
            <button class="contact_button" onclick="displayModal()">Contactez-moi</button>
            <img src=${picture} alt='photo of ${name}' />
        `
        header.innerHTML = Photographer

        return header
    }

    return { name, picture, getUserCardDOM, createPhotographerCard }
}
class photographerFactory {
    constructor(data) {
        this.name = data.name
        this.id = data.id
        this.city = data.city
        this.country = data.country
        this.tagline = data.tagline
        this.price = data.price
        this.portrait = data.portrait

        this.picture = `assets/photographers/${this.portrait}`
    }

    getUserCardDOM() {
        const article = document.createElement('article');

        const AllPhotographers = `
            <a href="./photographer.html?id=${this.id}">
                <img src=${this.picture} alt='photo of ${this.name}' />
                <h2>${this.name}</h2>
            </a>
            <h3>${this.city}, ${this.country}</h3>
            <p>${this.tagline}</p>
            <span>${this.price}€/jour</span>
        `;

        article.innerHTML = AllPhotographers;

        return (article);
    }

    createPhotographerCard() {
        const header = document.querySelector('.photograph-header');

        const Photographer = `
            <section class="photograph-info">
                <h1>${this.name}</h1>
                <h3>${this.city}, ${this.country}</h3>
                <p>${this.tagline}</p>
            </section>
            <button class="contact_button" onclick="displayModal()">Contactez-moi</button>
            <img src=${this.picture} alt='photo of ${this.name}' />
        `
        header.innerHTML = Photographer

        return header
    }

}
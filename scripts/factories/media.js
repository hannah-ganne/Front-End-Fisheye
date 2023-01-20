class mediaFactory {
    constructor(data) {
        this.data = data
        this.id = data.id
        this.photographerId = data.photographerId
        this.title = data.title
        this.image = data.image
        this.video = data.video
        this.likes = data.likes
        this.date = data.date
        this.price = data.price
    }

    createMediaCard() {
        const article = document.createElement('article');

        const MediaWithImage = `
            <a href="#">
                <img src="assets/Sample/${this.photographerId}/${this.image}" alt=${this.title} />
            </a>
            <section class="media-info">
                <span>${this.title}</span>
                <div class="like">
                    <div class="like-count" aria-label="like-count">
                    ${this.likes}
                    <img src="assets/icons/heart.svg" alt="heart icon" class="heart-icon" />
                    </div>
                </div>
            </section>
        `;

        const MediaWithVideo = `
            <a>
                <video controls width="350">
                    <source src="assets/Sample/${this.photographerId}/${this.video}"
                            type="video/mp4">
                </video>            
            </a>
            <section class="media-info">
                <span>${this.title}</span>
                <div class="like">
                    <div class="like-count" aria-label="like-count">
                    ${this.likes}
                    <img src="assets/icons/heart.svg" alt="heart icon" class="heart-icon" />
                    </div>
                </div>
            </section>
        `

        if (this.data.hasOwnProperty('video')) {
            article.innerHTML = MediaWithVideo;
        } else {
            article.innerHTML = MediaWithImage;
        }

        return (article);
    }
}
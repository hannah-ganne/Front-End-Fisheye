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

    createMediaCard(index) {
        const article = document.createElement('article');
        article.className = 'media-article';

        const MediaWithImage = `
            <img
                src="assets/Sample/${this.photographerId}/${this.image}" 
                alt="${this.title}" 
                data-title="${this.title}"
                data-index="${index}"
                tabindex="0"
                class="card-media"
            />
            <section class="media-info" tabindex="0">
                <span>${this.title}</span>
                <div class="like">
                    <div>
                        <span class="like-count" aria-label="like-count" data-index=${index}>
                            ${this.likes}
                        </span>
                        <img 
                            src="assets/icons/heart-line.svg" 
                            alt="empty heart icon" 
                            class="heart-icon" 
                            data-liked="false"
                            onclick="likeMedia(event, ${index})"
                        />
                    </div>
                </div>
            </section>
        `;

        const MediaWithVideo = `
            <video 
                width="350"
                alt="${this.title}" 
                data-title="${this.title}"
                data-index="${index}"
                tabindex="0"

                class="card-media"
            >
                <source src="assets/Sample/${this.photographerId}/${this.video}"
                        type="video/mp4">
            </video>            
            <section class="media-info" tabindex="0">
                <span>${this.title}</span>
                <div class="like">
                    <div class="like-count" aria-label="like-count">
                    <span class="like-count" aria-label="like-count" data-index=${index}>
                        ${this.likes}
                    </span>
                    <img 
                        src="assets/icons/heart-line.svg" 
                        alt="empty heart icon" 
                        class="heart-icon" 
                        data-liked="false"
                        onclick="likeMedia(event, ${index})"
                    />
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

    createLightbox(index) {
        const li = document.createElement('li');

        const lightboxWithImage = `
            <img
                class="media"
                src="assets/Sample/${this.photographerId}/${this.image}" 
                alt="${this.title}" 
                data-index=${index}    
            />
            <p class="media-title" aria-label="media title" data-index=${index}>${this.title}</p>
        `

        const lightboxWithVideo = `
            <video controls class="media" data-index=${index} alt="${this.title}">
                <source src="assets/Sample/${this.photographerId}/${this.video}"
                        type="video/mp4">
            </video>
            <p class="media-title" aria-label="media title" data-index=${index}>${this.title}</p>
        `

        if (this.data.hasOwnProperty('video')) {
            li.innerHTML = lightboxWithVideo;
        } else {
            li.innerHTML = lightboxWithImage;
        }

        return (li);
    }
}
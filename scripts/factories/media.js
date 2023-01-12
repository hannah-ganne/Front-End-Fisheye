function mediaFactory(data) {
    const { id, photographerId, title, image, video, likes, date, price } = data;

    function createMediaCard() {
        const article = document.createElement('article');

        const MediaWithImage = `
            <a href="#">
                <img src="assets/Sample/${photographerId}/${image}" alt=${title} />
            </a>
            <section class="media-info">
                <span>${title}</span>
                <div class="like">
                    <span aria-label="like-count">${likes}</span>
                </div>
            </section>
        `;

        const MediaWithVideo = `
            <a>
                <video controls width="350">
                    <source src="assets/Sample/${photographerId}/${video}"
                            type="video/mp4">
                </video>            
            </a>
            <section class="media-info">
                <span>${title}</span>
                <div class="like">
                    <span aria-label="like-count">${likes}</span>
                </div>
            </section>
        `

        if (data.hasOwnProperty('video')) {
            article.innerHTML = MediaWithVideo;
        } else {
            article.innerHTML = MediaWithImage;
        }

        return (article);
    }

    return { createMediaCard }
}
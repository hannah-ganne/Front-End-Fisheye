async function likeMedia(event, index) {
    const likeCount = document.querySelector(`.like-count[data-index="${index}"]`);
    const media = await getMedia();
    const isLiked = event.target.getAttribute('data-liked');

    if (isLiked == "false") {
        media[index].likes += 1;
        event.target.setAttribute('data-liked', "true");
        likeCount.textContent = media[index].likes;
        event.target.setAttribute('src', 'assets/icons/heart.svg')
    }
    updateTotalLikes(media)
}

function updateTotalLikes(media) {
    const totalLikesEl = document.getElementById('total-likes');

    const likes = media.map(m => m.likes)
    const totalLikeCount = likes.reduce((a, b) => a + b, 0)

    totalLikesEl.textContent = totalLikeCount;
}
export function createPthotsHtml(images) {
  return images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `
        <a href=${largeImageURL} class="gallery_link">
          <img src=${webformatURL} alt=${tags} loading="lazy">
          <div class="info">
            <p class="info-item">
              <b>Likes</b>
              ${likes}
            </p>
            <p class="info-item">
              <b>Views</b>
              ${views}

            </p>
            <p class="info-item">
              <b>comments</b>
              ${comments}

            </p>
            <p class="info-item">
              <b>Downloads</b>
              ${downloads}

            </p>
          </div>
        </a>
        `;
      }
    )
    .join('');
}

export function requestMarkups(data) {
    const { largeImageURL, webformatURL, tags, likes, views, comments, downloads } = data;
    return `<li>
            <div class="card">
              <a class="gallery-link" href="${largeImageURL}">
                  <img
                    class="card-image"
                    src="${webformatURL}"
                    alt="${tags}"
                  />
              </a>
              <div class="card-content">
                <ul>
                  <li><h5>Likes</h5></li>
                  <li><p>${likes}</p></li>
                </ul>
                <ul>
                  <li><h5>Views</h5></li>
                  <li><p>${views}</p></li>
                </ul>
                <ul>
                  <li><h5>Comments</h5></li>
                  <li><p>${comments}</p></li>
                </ul>
                <ul>
                  <li><h5>Downloads</h5></li>
                  <li><p>${downloads}</p></li>
                </ul>
              </div>
            </div>
          </li>`;
};

export function requestsMarkups(arr) {
    return arr.map(requestMarkups).join("");
};



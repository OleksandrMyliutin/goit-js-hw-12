import { createRequest, page, setPage, limit, totalHits } from './js/pixabay-api.js';
import { requestsMarkups } from './js/render-functions.js';
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const refs = {
    cardList: document.querySelector('.card-list'),
    form: document.querySelector('.form-style'),
    loader: document.querySelector('.loader'),
    btnMore: document.querySelector('.btn-more')
};

let lightbox = new SimpleLightbox('.card-list a', {
    captionsData: "alt",
    captionDelay: 250,
});

let searchQuery = ""; // Глобальна змінна для збереження пошукового запиту

refs.form.addEventListener("submit", handleSubmit);
refs.btnMore.addEventListener("click", loadMoreImages);
refs.btnMore.style.display = "none"; // Початково приховуємо кнопку "Load more"

async function handleSubmit(e) {
    e.preventDefault();
    const search = e.currentTarget.elements.query.value.trim();

    if (!search) {
        iziToast.warning({
            title: "Warning",
            message: "⚠️ Please enter a search query!",
            position: "topRight",
        });
        return;
    }

    searchQuery = search; // Оновлюємо глобальний пошуковий запит
    refs.cardList.innerHTML = "";
    refs.loader.style.display = "block";
    refs.btnMore.style.display = "none";

    setPage(1); // Починаємо пошук з першої сторінки

    await fetchImages(true); // Перший пошук

    e.currentTarget.reset();
}

async function fetchImages(isNewSearch = false) {
    refs.loader.style.display = "block";
    const currentPage = page;

    try {
        const data = await createRequest(searchQuery, currentPage);

        if (!data.length) {
            iziToast.info({
                title: "Not found",
                message: "😢 No images found.",
                position: "topRight",
            });
            refs.loader.style.display = "none";
            refs.btnMore.style.display = "none";
            refs.cardList.innerHTML = "";
            return;
        }

        if (isNewSearch) {
            refs.cardList.innerHTML = "";
        }

        refs.cardList.insertAdjacentHTML("beforeend", requestsMarkups(data));

        lightbox.refresh();

        // Прокручування сторінки після додавання нової групи зображень
        const cardHeight = document.querySelector(".card-list .card")?.getBoundingClientRect().height || 0;
        window.scrollBy({
            top: cardHeight * 2,
            behavior: "smooth"
        });

        // Оновлюємо сторінку для наступного запиту
        setPage(page + 1);

        // Логіка кнопки "Load more"
        const totalPages = Math.ceil(totalHits / limit);
        if (page > totalPages) {
            refs.btnMore.style.display = "none";
            iziToast.info({
                title: "End of results",
                message: "We're sorry, but you've reached the end of search results.",
                position: "topRight",
            });
        } else {
            refs.btnMore.style.display = "block";
        }
    }
    catch (error) {
        iziToast.error({
            title: "Error",
            message: "🚨 Something went wrong. Please try again!",
            position: "topRight",
        });
        console.error("❌ API request error:", error);
    }
    finally {
        refs.loader.style.display = "none";
    }
}

// Завантаження наступної сторінки при натисканні "Load more"
function loadMoreImages() {
    fetchImages();
}

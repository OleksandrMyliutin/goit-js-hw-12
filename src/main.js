import { createRequest, page, setPage, limit } from './js/pixabay-api.js';
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
const totalPages = Math.ceil(100 / limit);

refs.form.addEventListener("submit", handleSubmit);


function handleSubmit(e) {
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
    

    refs.cardList.innerHTML = "";

    refs.loader.style.display = "block";
    setPage(1);
    

    async function fetchImages() {
        const currentPage = page;
        const data = await createRequest(search, currentPage);
        if (data.length) {
            setPage(page + 1);
        }
        if (page > totalPages) {
            return iziToast.error({
            position: "topRight",
            message: "We're sorry, but you've reached the end of search results."
            });
        }
        try {
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
            if (page > 1) {
                refs.btnMore.style.display = "block";
                refs.btnMore.addEventListener("click", fetchImages);
            }
            refs.cardList.insertAdjacentHTML("beforeend", requestsMarkups(data));

            const cardHeight = document.querySelector(".card-list .card").getBoundingClientRect().height;
            window.scrollBy({
                top: cardHeight * 2,
                behavior: "smooth"
            });

            lightbox.refresh();
        }
        catch (error) {
            iziToast.error({
                    title: "Error",
                    message: "🚨 Something went wrong. Please try again!",
                    position: "topRight",
                });
                refs.loader.style.display = "none";
                refs.btnMore.style.display = "none";
                console.error("❌ API request error:", error);

                refs.cardList.innerHTML = "";}
        finally{
            refs.loader.style.display = "none";
        };
    }

    fetchImages();

    e.currentTarget.reset();
}

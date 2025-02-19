import { createRequest } from './js/pixabay-api.js';
import { requestsMarkups } from './js/render-functions.js';
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const refs = {
    cardList: document.querySelector('.card-list'),
    form: document.querySelector('.form-style'),
    loader: document.querySelector('.loader')
};

refs.form.addEventListener("submit", handleSubmit);

let lightbox = new SimpleLightbox('.card-list a', {
    captionsData: "alt",
    captionDelay: 250,
});

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

    async function fetchImages() {
        const data = await createRequest(search);
        try{if (!data.length) {
            iziToast.info({
                title: "Not found",
                message: "😢 No images found.",
                position: "topRight",
            });

            refs.cardList.innerHTML = "";

            return;
        }

        refs.cardList.innerHTML = requestsMarkups(data);
        
            lightbox.refresh();
        }
        catch (error) {
            iziToast.error({
                    title: "Error",
                    message: "🚨 Something went wrong. Please try again!",
                    position: "topRight",
                });

                console.error("❌ API request error:", error);

                refs.cardList.innerHTML = "";}
        finally{
            refs.loader.style.display = "none";
        };
    }

    fetchImages();

    e.currentTarget.reset();
}

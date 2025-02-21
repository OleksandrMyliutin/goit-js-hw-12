import axios from "axios";
export let page = 1;
export let limit = 40;
export let totalHits = 0;

const axios2 = axios.create({
    baseURL: "https://pixabay.com/api/",
    params: {
        key: "48847177-927ba4e40b84ac1d7e4adedbb",
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
    }
});

export async function createRequest(q, currentPage) {
    const res = await axios2.get("", {
        params: {
            q,
            per_page: limit,
            page: currentPage
        }
    });
    
    totalHits = res.data.totalHits; // Оновлення загальної кількості
    return res.data.hits;
}

export function setPage(newPage) {
    page = newPage;
}

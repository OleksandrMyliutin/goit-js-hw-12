import axios from "axios";
const axios2 = axios.create({
    baseURL: "https://pixabay.com/api/",
    params: {
        key: "48847177-927ba4e40b84ac1d7e4adedbb",
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true
    }
});

export function createRequest(q) {
    return axios2.get("", {params:{q}}).then((res => res.data.hits));
}
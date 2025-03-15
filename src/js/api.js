
const BASE_URL = "https://pixabay.com/api/";
const API = "28460995-5acfdb805ab0c27f2bf717abb";

export async function loadImages(query) {
    const params = new URLSearchParams({
        key: API,
        q: query,
        image_type: "photo",
        orientation: "horizontal",
        sefesearch: "true"
    });

    const response = await fetch(`${BASE_URL}?${params}`);
    if(!response.ok){
        throw new Error(response.statusText);
    }
    return await response.json();
    
} 
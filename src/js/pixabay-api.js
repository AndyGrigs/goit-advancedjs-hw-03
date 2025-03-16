

import axios from "axios";

const BASE_URL = "https://pixabay.com/api/";
const API_KEY = "28460995-5acfdb805ab0c27f2bf717abb"; 


export async function loadImages(query) {
  const params = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: "photo",
    orientation: "horizontal",
    safesearch: "true",
  });
  
  const response = await axios.get(`${BASE_URL}?${params}`);
  return response.data;
}

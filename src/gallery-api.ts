import axios from "axios";
import FetchedImage from "./types";

axios.defaults.baseURL = 'https://api.unsplash.com/';
const apiKey = import.meta.env.VITE_UNSPLASH_KEY;


interface ResponseData {
    results: FetchedImage[];
    total: number;
    total_pages: number;
}

export const fetchImages = async (query: string, currentPage: number): Promise<ResponseData> => {
    const response = await axios.get <ResponseData>('search/photos', { params: {
    client_id: apiKey,
        query: query,
    page: currentPage,
    per_page: 10,
    content_filter: "high",
}});
    return response.data;
};
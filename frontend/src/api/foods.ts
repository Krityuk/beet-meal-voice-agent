import api from "./api";
import { API_ENDPOINTS } from "../constants/api";

async function getFoodsCollection() {
    const response = await api.get(API_ENDPOINTS.FOODS);
    return response.data;
}

export { getFoodsCollection };
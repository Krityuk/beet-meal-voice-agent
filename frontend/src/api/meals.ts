import { API_ENDPOINTS } from "../constants/api";
import api from "./api";

async function getMeals() {
    const response = await api.get(API_ENDPOINTS.MEALS);
    return response.data;
}

async function getLiveKitToken() {
    const response = await api.get(API_ENDPOINTS.TOKEN);
    return response.data;
}
async function dispatchAgent(room: string) {
    const response = await api.post(API_ENDPOINTS.DISPATCH_AGENT, {
        room,
    });

    return response.data;
}

export {
    getMeals,
    getLiveKitToken,
    dispatchAgent,
};
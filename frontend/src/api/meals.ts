import api from "./api";

async function getMeals() {
    const response = await api.get("/meals");
    return response.data;
}

async function getLiveKitToken() {
    const response = await api.get("/token");
    return response.data;
}

export {
    getMeals,
    getLiveKitToken,
};
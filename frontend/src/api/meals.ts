import api from "./api";

async function getMeals() {
    const response = await api.get("/meals");
    return response.data;
}

async function getLiveKitToken() {
    const response = await api.get("/token");
    return response.data;
}
async function dispatchAgent(room: string) {
    const response = await api.post("/dispatchAgent", {
        room,
    });

    return response.data;
}

export {
    getMeals,
    getLiveKitToken,
    dispatchAgent,
};
import { API_ENDPOINTS } from "./config.ts";

const BASE_URL = API_ENDPOINTS.meals;

async function createMeal(data: { food: string; quantity?: number; mealType?: string; consumedDate?: string, }) {
    const response = await fetch(BASE_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
    }

    return response.json();
}

async function getMeals(params?: { food?: string; startDate?: string; endDate?: string; mealType?: string }) {
    const query = new URLSearchParams();

    if (params?.food) {
        query.append("food", params.food);
    }

    if (params?.startDate) {
        query.append("startDate", params.startDate);
    }

    if (params?.endDate) {
        query.append("endDate", params.endDate);
    }
    if (params?.mealType) {
        query.append("mealType", params.mealType);
    }

    const url = query.toString()
        ? `${BASE_URL}?${query.toString()}`
        : BASE_URL;

    const response = await fetch(url);

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
    }

    return response.json();
}

async function updateMeals(oldFood?: string, newFood?: string, mealType?: string, quantity?: number, startDate?: string, endDate?: string) {
    const data = { food: oldFood, newFood, mealType, quantity, startDate, endDate };
    const response = await fetch(BASE_URL, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
    }

    return response.json();
}

async function deleteMeals(food?: string, mealType?: string, startDate?: string, endDate?: string) {
    const data = { food, mealType, startDate, endDate };
    const response = await fetch(BASE_URL, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }
    );

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
    }

    return response.json();
}



// THE HELPER FUNCTIONS ARE BELOW
async function findMatchingMeals(food?: string, dateRange?: { startDate: string; endDate: string; }) {
    const params: { food?: string; startDate?: string; endDate?: string; } = {};

    if (food) {
        params.food = food;
    }

    if (dateRange) {
        params.startDate = dateRange.startDate;
        params.endDate = dateRange.endDate;
    }

    const response = await getMeals(params);

    return response.data;
}

export {
    createMeal,
    getMeals,
    updateMeals,
    deleteMeals,
    // findMatchingMeals,
};
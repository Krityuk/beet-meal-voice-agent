const BASE_URL = "http://localhost:5000/api/meals";

async function createMeal(data: { food: string; quantity?: number; mealType?: string; consumedDate?: string, }) {
    console.log("============ I am inside createMeal func at mealTools.ts 🫠🫠🫠🫠====================")
    console.log(data, "is data inside createMeal");
    const response = await fetch(BASE_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    console.log(response, "is response 🫠🫠🫠🫠");

    if (!response.ok) {
        const error = await response.json();
        console.log(error.message, "🫠🫠🫠🫠");
        throw new Error(error.message);
    }

    return response.json();
}

async function getMeals(params?: { food?: string; startDate?: string; endDate?: string; }) {
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

async function updateMeal(mealId: string, data: { food?: string; quantity?: number; }) {
    const response = await fetch(`${BASE_URL}/${mealId}`, {
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

async function deleteMeal(mealId: string) {
    const response = await fetch(`${BASE_URL}/${mealId}`, {
        method: "DELETE",
    });

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
    updateMeal,
    deleteMeal,
    findMatchingMeals,
};
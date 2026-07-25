export interface Nutrition {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
}

export interface Meal {
    _id: string;
    foodId: string;
    foodName: string;
    quantity: number;
    unit: string;
    mealType: string;
    nutrition: Nutrition;
    loggedAt: string;
}
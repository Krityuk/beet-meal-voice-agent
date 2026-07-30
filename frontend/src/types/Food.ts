export interface Nutrition {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
}

export interface Food {
    id: string;
    name: string;
    aliases: string[];
    category: string;
    unit: string;
    label: string;
    nutrition: Nutrition;
}

// ASSOCIATED TO FOODS.JSON
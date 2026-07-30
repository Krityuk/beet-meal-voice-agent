export interface Meal {
    _id: string;
    foodId: string;
    quantity: number;
    mealType: string;
    loggedAt: string;
    consumedDate:string
}

// ASSOCIATED TO MEALS COLLECTION OF MONGODB
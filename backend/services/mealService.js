import Meal from "../models/Meal.js";
import { getFoodDetails } from "./foodService.js";

async function logMeal({ food, quantity, mealType }) {
    const mealDetails = getFoodDetails(
        food,
        quantity,
        mealType
    );

    const meal = new Meal(mealDetails);

    await meal.save();

    return meal;
}

async function getMeals({ food, startDate, endDate, limit } = {}) {

    const filter = {};

    if (food) {
        filter.foodName = new RegExp(`^${food}$`, "i"); // Case-insensitive match
    }

    if (startDate || endDate) {
        filter.loggedAt = {};

        if (startDate) {
            filter.loggedAt.$gte = new Date(startDate);
        }

        if (endDate) {
            filter.loggedAt.$lte = new Date(endDate);
        }
    }

    let query = Meal.find(filter)
        .sort({ loggedAt: -1 })
        .lean();

    if (limit) {
        query = query.limit(limit);
    }

    return query;
}

async function updateMeal(mealId, updates) {
    const meal = await Meal.findById(mealId);

    if (!meal) {
        throw new Error("Meal not found");
    }

    const mealDetails = getFoodDetails(
        updates.food ?? meal.foodName,
        updates.quantity ?? meal.quantity,
        updates.mealType ?? meal.mealType
    );

    Object.assign(meal, mealDetails);

    await meal.save();

    return meal;
}

async function deleteMeal(mealId) {
    const meal = await Meal.findByIdAndDelete(mealId);

    if (!meal) {
        throw new Error("Meal not found");
    }

    return meal;
}

export {
    logMeal,
    getMeals,
    updateMeal,
    deleteMeal,
};
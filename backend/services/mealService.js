import Meal from "../models/Meal.js";
import { getFoodDetails } from "./foodService.js";
import { log } from "../utils/logger.js";

async function logMeal({ food, quantity, mealType, consumedDate }) {
    const mealDetails = getFoodDetails(
        food,
        quantity,
        mealType,
        consumedDate,
    );

    const meal = new Meal(mealDetails);

    await meal.save();

    return meal;
}

async function getMeals({ food, startDate, endDate, mealType } = {}) {

    const filter = {};

    if (food) {
        filter.foodName = new RegExp(`^${food}$`, "i"); // Case-insensitive match
    }

    if (startDate || endDate) {
        filter.consumedDate = {};

        if (startDate) {
            filter.consumedDate.$gte = new Date(startDate);
        }

        if (endDate) {
            filter.consumedDate.$lte = new Date(endDate);
        }
    }

    let query = Meal.find(filter)
        .sort({ consumedDate: -1 })
        .lean();


    return query;
}

async function updateMeals({ food, newFood, mealType, quantity, startDate, endDate, }) {
    const filter = {};

    if (food) {
        filter.foodName = {
            $regex: new RegExp(`^${food}$`, "i"),
        };
    }

    if (mealType) {
        filter.mealType = mealType;
    }

    if (startDate && endDate) {
        filter.consumedDate = {
            $gte: new Date(startDate),
            $lte: new Date(endDate),
        };
    }

    const meals = await Meal.find(filter);
    log(meals);

    if (meals.length === 0) {
        throw new Error("No matching meals found.");
    }

    const operations = meals.map(meal => {

        const updatedMeal = getFoodDetails(
            newFood ?? meal.foodName,
            quantity ?? meal.quantity,
            mealType ?? meal.mealType,
            meal.consumedDate
        );

        return {
            updateOne: {
                filter: { _id: meal._id },
                update: {
                    $set: updatedMeal,
                },
            },
        };
    });

    const result = await Meal.bulkWrite(operations);

    return result;
}

async function deleteMeals({ food, mealType, startDate, endDate }) {

    const filter = {};

    if (food) {
        filter.foodName = {
            $regex: new RegExp(`^${food}$`, "i"),
        };
    }

    if (mealType) {
        filter.mealType = mealType;
    }

    if (startDate && endDate) {
        filter.consumedDate = {
            $gte: new Date(startDate),
            $lte: new Date(endDate),
        };
    }

    return await Meal.deleteMany(filter);
}

export {
    logMeal,
    getMeals,
    updateMeals,
    deleteMeals,
};
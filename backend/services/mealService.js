import Meal from "../models/Meal.js";
import { findFoodIdByAlias } from "./foodService.js";
import { log } from "../utils/logger.js";

async function logMeal({ food, quantity, mealType, consumedDate }) {
    const foodId = findFoodIdByAlias(food);

    const meal = new Meal({ foodId, quantity, mealType, consumedDate });

    await meal.save();

    return meal;
}

async function getMeals({ food, startDate, endDate, mealType } = {}) {

    const filter = {};
    if (food) filter.foodId = findFoodIdByAlias(food);
    if (mealType) filter.mealType = mealType;
    if (startDate || endDate) {
        filter.consumedDate = {};
        if (startDate) filter.consumedDate.$gte = new Date(startDate);
        if (endDate) filter.consumedDate.$lte = new Date(endDate);
    }

    let query = Meal.find(filter)
        .sort({ consumedDate: -1 })
        .lean();

    return query;
}

async function updateMeals({ oldFood, newFood, oldMealType, newMealType, oldQuantity, newQuantity, startDate, endDate }) {
    console.log("I am inside updateMeals function 💗💗💗💗")

    let newFoodId;
    if (newFood) newFoodId = findFoodIdByAlias(newFood); //findFoodIdByAlias method would be in top of func, as it contains a throw error

    const filter = {};
    if (oldFood) filter.foodId = findFoodIdByAlias(oldFood);
    if (oldMealType) filter.mealType = oldMealType;
    if (oldQuantity) filter.quantity = oldQuantity;
    if (startDate || endDate) {
        filter.consumedDate = {};
        if (startDate) filter.consumedDate.$gte = new Date(startDate);
        if (endDate) filter.consumedDate.$lte = new Date(endDate);
    }

    if(Object.keys(filter).length===0)
        throw new Error("Please specify which meals to Update.");

    console.log(JSON.stringify(filter, null, 2));
    console.log(await Meal.find().lean());

    const meals = await Meal.find(filter);

    log(meals, "is meals in updateMeals");

    if (meals.length === 0) {
        throw new Error("No matching meals found.");
    }

    const operations = meals.map(meal => {
        const updatedMeal = {
            foodId: newFoodId ?? meal.foodId,
            quantity: newQuantity ?? meal.quantity,
            mealType: newMealType ?? meal.mealType,
            consumedDate: meal.consumedDate,
        };

        return {
            updateOne: {
                filter: { _id: meal._id },
                update: {
                    $set: updatedMeal,
                },
            },
        };
    });
    log("Going to perform Meal.bulk")

    const result = await Meal.bulkWrite(operations);
    log(result, "is result");
    console.dir(result, { depth: null });

    return result;
}

async function deleteMeals({ food, mealType, startDate, endDate }) {

    const filter = {};
    if (food) filter.foodId = findFoodIdByAlias(food);
    if (mealType) filter.mealType = mealType;
    if (startDate || endDate) {
        filter.consumedDate = {};
        if (startDate) filter.consumedDate.$gte = new Date(startDate);
        if (endDate) filter.consumedDate.$lte = new Date(endDate);
    }

    if(Object.keys(filter).length===0)
    throw new Error("Please specify which meals to delete.");

    return await Meal.deleteMany(filter);
}

export {
    logMeal,
    getMeals,
    updateMeals,
    deleteMeals,
};
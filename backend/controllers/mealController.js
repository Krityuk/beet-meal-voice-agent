import { logMeal, getMeals, updateMeal, deleteMeal, } from "../services/mealService.js";

async function logMealController(req, res) {
    console.log("Inside logMealController 🫠🫠🫠🫠");
    console.log(req.body, "is req.body 🫠🫠🫠🫠");
    try {
        const meal = await logMeal(req.body);

        res.status(201).json({
            success: true,
            message: "Meal logged successfully",
            data: meal,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
}

async function getMealsController(req, res) {
    console.log("Inside getMealsController 🫠🫠🫠🫠");
    try {
        const { food, startDate, endDate } = req.query;
        console.log(food, startDate, endDate, "is dateRange in getMealsController 🫠🫠🫠🫠");

        const meals = await getMeals({
            food,
            startDate,
            endDate,
        });

        res.status(200).json({
            success: true,
            data: meals,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

async function updateMealController(req, res) {
    console.log("Inside updateMealController 🫠🫠🫠🫠");
    try {
        const { mealId } = req.params;

        const updatedMeal = await updateMeal(
            mealId,
            req.body
        );

        res.status(200).json({
            success: true,
            message: "Meal updated successfully",
            data: updatedMeal,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
}

async function deleteMealController(req, res) {
    try {
        const { mealId } = req.params;

        const deletedMeal = await deleteMeal(mealId);

        if (!deletedMeal) {
            return {
                success: false,
                message: "No such meal found for this timeline."
            };
        }

        res.status(200).json({
            success: true,
            message: "Meal deleted successfully",
            data: deletedMeal,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
}

export {
    logMealController,
    getMealsController,
    updateMealController,
    deleteMealController,
};
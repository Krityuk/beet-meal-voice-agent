import { logMeal, getMeals, updateMeals, deleteMeals, } from "../services/mealService.js";
import { notifyClients } from "../utils/sse.js";
import { log } from "../utils/logger.js";

async function logMealController(req, res) {
    console.log("Inside logMealController 🫠🫠🫠🫠");
    console.log(req.body, "is req.body 💵💵💵");
    try {
        const meal = await logMeal(req.body);

        notifyClients();

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
    console.log(req.query, "is req.query 💵💵💵");
    try {

        const meals = await getMeals(req.query);

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
    console.log(req.body, "is req.body 💵💵💵");
    try {
        const result = await updateMeals(req.body);

        notifyClients();

        res.status(200).json({
            success: true,
            message: "Meal updated successfully",
            data: result,
        });
    } catch (error) {
        if(error.message === "No matching meals found")
            return res.status(404).json({
                success: false,
                message: error.message,
            });
        if(error.message === "One or more meals were modified by another request. Please try again.")
            return res.status(409).json({ //optimistic locking
                success: false,
                message: error.message,
            });
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
}

async function deleteMealController(req, res) {
    console.log(req.body, "is req.body 💵💵💵");
    try {
        const deletedMeal = await deleteMeals(req.body);

        if (!deletedMeal) {
            return res.status(404).json({
                success: false,
                message: "No such meal found for this timeline."
            });
        }

        notifyClients();

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
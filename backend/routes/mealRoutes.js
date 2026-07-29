import express from "express";
import { logMealController, getMealsController, updateMealController, deleteMealController, } from "../controllers/mealController.js";

const router = express.Router();

router.post("/", logMealController);

router.get("/", getMealsController);

router.put("/", updateMealController);

router.delete("/", deleteMealController);

export default router;

// Method	Endpoint	        Purpose
// POST	    /api/meals	        Log a new meal
// GET	    /api/meals	        Get meal history
// PUT	    /api/meals/:mealId	Update a meal
// DELETE	/api/meals/:mealId	Delete a meal
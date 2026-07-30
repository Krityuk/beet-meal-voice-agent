[1mdiff --git a/backend/controllers/mealController.js b/backend/controllers/mealController.js[m
[1mindex 170b8e1..650ce3f 100644[m
[1m--- a/backend/controllers/mealController.js[m
[1m+++ b/backend/controllers/mealController.js[m
[36m@@ -16,7 +16,7 @@[m [masync function logMealController(req, res) {[m
             data: meal,[m
         });[m
     } catch (error) {[m
[31m-        res.status(400).json({[m
[32m+[m[32m        res.status(error.statusCode || 500).json({[m
             success: false,[m
             message: error.message,[m
         });[m
[36m@@ -35,7 +35,7 @@[m [masync function getMealsController(req, res) {[m
             data: meals,[m
         });[m
     } catch (error) {[m
[31m-        res.status(500).json({[m
[32m+[m[32m        res.status(error.statusCode || 500).json({[m
             success: false,[m
             message: error.message,[m
         });[m
[36m@@ -56,17 +56,7 @@[m [masync function updateMealController(req, res) {[m
             data: result,[m
         });[m
     } catch (error) {[m
[31m-        if(error.message === "No matching meals found")[m
[31m-            return res.status(404).json({[m
[31m-                success: false,[m
[31m-                message: error.message,[m
[31m-            });[m
[31m-        if(error.message === "One or more meals were modified by another request. Please try again.")[m
[31m-            return res.status(409).json({ //optimistic locking[m
[31m-                success: false,[m
[31m-                message: error.message,[m
[31m-            });[m
[31m-        res.status(400).json({[m
[32m+[m[32m        res.status(error.statusCode || 500).json({[m
             success: false,[m
             message: error.message,[m
         });[m
[36m@@ -78,13 +68,6 @@[m [masync function deleteMealController(req, res) {[m
     try {[m
         const deletedMeal = await deleteMeals(req.body);[m
 [m
[31m-        if (!deletedMeal) {[m
[31m-            return res.status(404).json({[m
[31m-                success: false,[m
[31m-                message: "No such meal found for this timeline."[m
[31m-            });[m
[31m-        }[m
[31m-[m
         notifyClients();[m
 [m
         res.status(200).json({[m
[36m@@ -93,7 +76,7 @@[m [masync function deleteMealController(req, res) {[m
             data: deletedMeal,[m
         });[m
     } catch (error) {[m
[31m-        res.status(400).json({[m
[32m+[m[32m        res.status(error.statusCode || 500).json({[m
             success: false,[m
             message: error.message,[m
         });[m
[1mdiff --git a/backend/models/Meal.js b/backend/models/Meal.js[m
[1mindex 393c812..29f5be0 100644[m
[1m--- a/backend/models/Meal.js[m
[1m+++ b/backend/models/Meal.js[m
[36m@@ -43,4 +43,4 @@[m [mmealSchema.index({ foodId: 1, consumedDate: -1 });[m
 [m
 const Meal = mongoose.model("Meal", mealSchema);[m
 [m
[31m-export default Meal;[m
\ No newline at end of file[m
[32m+[m[32mexport {Meal};[m
\ No newline at end of file[m
[1mdiff --git a/backend/services/mealService.js b/backend/services/mealService.js[m
[1mindex 62a7503..5dfbfb7 100644[m
[1m--- a/backend/services/mealService.js[m
[1m+++ b/backend/services/mealService.js[m
[36m@@ -1,4 +1,5 @@[m
[31m-import Meal from "../models/Meal.js";[m
[32m+[m[32mimport { Meal } from "../models/Meal.js";[m
[32m+[m[32mimport { ApiError } from "../utils/ApiError.js";[m
 import { findFoodIdByAlias } from "./foodService.js";[m
 import { log } from "../utils/logger.js";[m
 [m
[36m@@ -47,15 +48,14 @@[m [masync function updateMeals({ oldFood, newFood, oldMealType, newMealType, oldQuan[m
     }[m
 [m
     if (Object.keys(filter).length === 0)[m
[31m-        throw new Error("Please specify which meals to Update.");[m
[32m+[m[32m        throw new ApiError(400, "Please specify which meals to Update.");[m
 [m
     const meals = await Meal.find(filter);[m
 [m
     log(meals, "is meals in updateMeals");[m
 [m
[31m-    if (meals.length === 0) {[m
[31m-        throw new Error("No matching meals found");[m
[31m-    }[m
[32m+[m[32m    if (meals.length === 0)[m
[32m+[m[32m        throw new ApiError(404, "No matching meals found");[m
 [m
     const operations = meals.map(meal => {[m
         const updatedMeal = {[m
[36m@@ -81,7 +81,7 @@[m [masync function updateMeals({ oldFood, newFood, oldMealType, newMealType, oldQuan[m
     log(result, "is result");[m
 [m
     if (result.matchedCount !== meals.length)[m
[31m-        throw new Error("One or more meals were modified by another request. Please try again.");[m
[32m+[m[32m        throw new ApiError(409, "One or more meals were modified by another request. Please try again.");[m
 [m
     return result;[m
 }[m
[36m@@ -98,9 +98,15 @@[m [masync function deleteMeals({ food, mealType, startDate, endDate }) {[m
     }[m
 [m
     if (Object.keys(filter).length === 0)[m
[31m-        throw new Error("Please specify which meals to delete.");[m
[32m+[m[32m        throw new ApiError(400, "Please specify which meals to Update.");[m
[32m+[m
[32m+[m[32m    const result = await Meal.deleteMany(filter);[m
[32m+[m
[32m+[m[32m    if (result.deletedCount === 0)[m
[32m+[m[32m        throw new ApiError(404, "No matching meals found.");[m
[32m+[m
[32m+[m[32m    return result;[m
 [m
[31m-    return await Meal.deleteMany(filter);[m
 }[m
 [m
 export {[m

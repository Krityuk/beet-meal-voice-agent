import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Needed because __dirname doesn't exist in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load foods.json once when the server starts
const foodsPath = path.join(__dirname, "../foods.json");
const foodData = JSON.parse(fs.readFileSync(foodsPath, "utf-8"));
const foods = foodData.foods;



function searchFood(query) {
    if (!query) return null;

    const searchTerm = query.trim().toLowerCase();

    return (
        foods.find((food) => { //foods is static dataset and is not big so scanning all food is fine here, but it wont be fine if all meals fetched from db
            // Match food name
            if (food.name.toLowerCase() === searchTerm) {
                return true;
            }

            // Match aliases
            return food.aliases.some(
                (alias) => alias.toLowerCase() === searchTerm
            );
        }) || null
    );
}


function calculateNutrition(food, quantity) {
    if (!quantity || quantity <= 0) {
        throw new Error("Quantity must be greater than 0");
    }

    const nutrition = food.nutrition;

    return {
        calories: Number((nutrition.calories * quantity).toFixed(2)), // round-off to 2 decimals
        protein: Number((nutrition.protein * quantity).toFixed(2)),
        carbs: Number((nutrition.carbs * quantity).toFixed(2)),
        fat: Number((nutrition.fat * quantity).toFixed(2)),
        fiber: Number((nutrition.fiber * quantity).toFixed(2)),
    };
}

function getFoodDetails(query, quantity, mealType, consumedDate) {
    const food = searchFood(query);

    if (!food) {
        throw new Error("Food not found");
    }

    const nutrition = calculateNutrition(food, quantity);
    if (!nutrition) {
        throw new Error("Unable to calculate nutrition");
    }

    return {
        foodId: food.id,
        foodName: food.name,
        quantity,
        unit : food.unit, // came using foods.json
        mealType,
        nutrition,
        consumedDate : consumedDate
    };
}

export {
    searchFood,
    calculateNutrition,
    getFoodDetails,
};

// function validateUnit(food, unit) {
//     if (!food || !unit) return false;

//     return food.units.some(
//         (allowedUnit) => allowedUnit.unit.toLowerCase() === unit.toLowerCase()
//     );
// } // If the user specifies a unit that doesn't match the food's default unit,
//      ignore the spoken unit and use the food's default unit and give acknowledgement of that to user



// {
//   "id": "dal",
//   "name": "Dal",
//   "aliases": ["dal", "daal", "lentil curry", "yellow dal", "toor dal"],
//   "category": "curry",
//   "units": [
//     {
//       "unit": "katori",
//       "label": "katori",
//       "nutrition": { "calories": 104, "protein": 7.0, "carbs": 16.0, "fat": 2.0, "fiber": 4.5 }
//     },
//     {
//       "unit": "bowl",
//       "label": "bowl",
//       "nutrition": { "calories": 208, "protein": 14.0, "carbs": 32.0, "fat": 4.0, "fiber": 9.0 }
//     }
//   ]
// }
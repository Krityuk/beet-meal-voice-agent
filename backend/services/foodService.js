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



function findFoodIdByAlias(foodAlias) {
    const searchTerm = foodAlias.trim().toLowerCase();

    const food = foods.find(food =>
        food.id.toLowerCase() === searchTerm ||
        food.aliases.some(alias => alias.toLowerCase() === searchTerm)
    );

    if (!food) {
        throw new Error("This food does not exist in Food Database");
    }

    return food.id;
}

function getFoodsCollection() {
    return [...foods]; // Prevent sharing original Foods Array
}

export {
    findFoodIdByAlias,
    getFoodsCollection,// return data inside foods.json
};
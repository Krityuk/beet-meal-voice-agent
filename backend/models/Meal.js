import mongoose from "mongoose";

// Reusable Nutrition Schema
const nutritionSchema = new mongoose.Schema(
    {
        calories: {
            type: Number,
            required: true,
            min: 0,
        },
        protein: {
            type: Number,
            required: true,
            min: 0,
        },
        carbs: {
            type: Number,
            required: true,
            min: 0,
        },
        fat: {
            type: Number,
            required: true,
            min: 0,
        },
        fiber: {
            type: Number,
            required: true,
            min: 0,
        },
    },
    {
        _id: false,
    }
);

const mealSchema = new mongoose.Schema(
    {
        foodId: {
            type: String,
            required: true,
            trim: true,
        },

        foodName: {
            type: String,
            required: true,
            trim: true,
        },

        quantity: {
            type: Number,
            required: true,
            min: 1,
        },

        unit: {
            type: String,
            required: true,
            trim: true,
        },

        mealType: {
            type: String,
            enum: ["breakfast", "lunch", "dinner", "snack"],
            default: null,
        },

        nutrition: {
            type: nutritionSchema,
            required: true,
        },
        consumedDate: {
            type: Date,
            required: true,
        },
        loggedAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        versionKey: false,
    }
);

// INDEXING ON MONGO DATABASE
mealSchema.index({ foodId: 1 }); // indexed at foodId in asc order, because user can ask all banana meals enlist

mealSchema.index({ consumedDate: -1 }); // indexed at consumedDate in desc order because user can ask for recent 5 meals,
// Although modern mongodb can do reverse traverse as well so -1 is only for readability, B-Tree keeps the keys in sorted order

mealSchema.index({ foodId: 1, consumedDate: -1 });

const Meal = mongoose.model("Meal", mealSchema);

export default Meal;
import mongoose from "mongoose";

const mealSchema = new mongoose.Schema(
    {
        foodId: {
            type: String,
            required: true,
            trim: true,
        },

        quantity: {
            type: Number,
            required: true,
            min: 1,
        },

        mealType: {
            type: String,
            enum: ["breakfast", "lunch", "dinner", "snack"],
            default: null,
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
    }
);

// INDEXING ON MONGO DATABASE

mealSchema.index({ consumedDate: -1 }); // indexed at consumedDate in desc order because user can ask for recent 5 meals,
// Although modern mongodb can do reverse traverse as well so -1 is only for readability, B-Tree keeps the keys in sorted order

mealSchema.index({ foodId: 1, consumedDate: -1 });

const Meal = mongoose.model("Meal", mealSchema);

export {Meal};
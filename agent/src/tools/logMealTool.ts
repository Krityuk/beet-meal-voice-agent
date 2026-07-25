import { llm } from "@livekit/agents";
import { z } from 'zod';
import { createMeal } from "../mealTools.ts";

const logMealTool = llm.tool({
    description:
        "Log a meal eaten by the user. Extract the food name, quantity, and meal type from the conversation.",
    parameters: z.object({
        food: z.string().describe("Name of the food eaten"),
        quantity: z.number().positive(),
        mealType: z
            .enum(["breakfast", "lunch", "dinner", "snack"])
            .optional(),
    }),
    execute: async ({ food, quantity, mealType }) => {
        console.log("========== logMealTool CALLED ==========");
        console.log({ food, quantity, mealType });
        try {
            console.log(" Initializing data 🫠🫠🫠🫠")
            const data: { food: string; quantity: number; mealType?: string; } 
            = { food, quantity, };

            console.log(" Adding mealType if exist 🫠🫠🫠🫠")

            if (mealType) {
                data.mealType = mealType;
            }
            console.log(" Going to call createMeal Function 🫠🫠🫠🫠")

            console.log("🫠🫠🫠🫠 typeof createMeal =", typeof createMeal);
            console.log("🫠🫠🫠🫠 createMeal =", createMeal);

            const result = await createMeal(data);

            return result.message;
        } catch (error) {
            return error instanceof Error
                ? error.message
                : "Unable to log meal.";
        }
    }
});

export { logMealTool };
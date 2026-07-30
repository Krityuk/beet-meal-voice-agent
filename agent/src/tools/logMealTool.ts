import { llm } from "@livekit/agents";
import { z } from 'zod';
import { createMeal } from "../mealTools.ts";

const logMealTool = llm.tool({
    description:
        `Log a new meal for the user.

Use this tool whenever the user says they ate or drank something.

Examples:
- I ate 2 bananas.
- I had rice for lunch.
- I drank 1 coffee yesterday breakfast.
- I ate an apple.
- I had 3 rotis for dinner.

Do NOT use this tool if the user is asking to:
- update an existing meal
- delete a meal
- retrieve meals

Extract the food name, quantity, and meal type and date from the conversation.
        `
    ,
    parameters: z.object({
        food: z.string().describe("Name of the food eaten"),
        quantity: z.number().positive().default(1).describe("Quantity of the food."),
        mealType: z
            .enum(["breakfast", "lunch", "dinner", "snack"])
            .optional(),
        consumedDate: z
            .string()
            .default("Today")
            .describe("Date in YYYY-MM-DD format. Resolve natural language dates like today or yesterday before calling."),
    }),
    execute: async ({ food, quantity, mealType, consumedDate }) => {
        try {
            const data: { food: string; quantity: number; mealType?: string; consumedDate: string }
                = { food , quantity, consumedDate};

            if (mealType) data.mealType = mealType;

            const result = await createMeal(data);

            return result;
        } catch (error) {
            return {
                success: false,
                message:
                    error instanceof Error
                        ? error.message
                        : "Unable to log meal.",
            };
        }
    }
});

export { logMealTool };
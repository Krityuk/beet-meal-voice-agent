import { llm } from "@livekit/agents";
import { z } from "zod";
import { findMatchingMeals, updateMeal } from "../mealTools.ts";

const updateMealTool = llm.tool({
    description: `
Update an existing meal.

Use this when the user wants to:
- Replace one food with another.
- Change the quantity of a meal.
- Modify a previously logged meal.

Examples:
- Replace coffee with tea.
- Change banana to apple.
- Make it 3 bananas.
- Replace yesterday's coffee with green tea.

Resolve natural language dates such as "today", "yesterday",
"last week" into YYYY-MM-DD before calling this tool.
`,

    parameters: z.object({
        oldFood: z
            .string()
            .describe("The food currently present in the meal."),

        newFood: z
            .string()
            .optional()
            .describe("The new food to replace the existing food."),

        quantity: z
            .number()
            .positive()
            .optional()
            .describe("The updated quantity."),

        startDate: z
            .string()
            .optional()
            .describe(
                "Start date in YYYY-MM-DD format if the user specifies a time period."
            ),

        endDate: z
            .string()
            .optional()
            .describe(
                "End date in YYYY-MM-DD format if the user specifies a time period. Assume start date if not given"
            ),
    }),

    execute: async ({ oldFood, newFood, quantity, startDate, endDate, }) => {
        console.log(startDate, endDate, "These are dates generated in updateMealTool 💵💵💵💵")
        try {
            let dateRange;

            if (startDate && endDate) {
                dateRange = { startDate, endDate };
            } else if (startDate) {
                dateRange = {
                    startDate,
                    endDate: startDate,
                };
            }
            console.log(dateRange, "These are dates generated in updateMealTool 💵💵💵💵")

            const matches = await findMatchingMeals(oldFood, dateRange);

            if (matches.length === 0) {
                return `I couldn't find any meal containing "${oldFood}".`;
            }

            if (matches.length > 1) {
                return `I found multiple meals containing "${oldFood}". Please specify which one you want to update.`;
            }

            const meal = matches[0];

            const data: { food?: string; quantity?: number; } = {};

            if (newFood) {
                data.food = newFood;
            }

            if (quantity !== undefined) {
                data.quantity = quantity;
            }

            const result = await updateMeal(meal._id, data);

            return result;
        } catch (error) {
            return {
                success: false,
                message:
                    error instanceof Error
                        ? error.message
                        : "Unable to update meal.",
            };
        }
    },
});

export { updateMealTool };
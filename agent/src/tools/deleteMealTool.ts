import { llm } from "@livekit/agents";
import { z } from "zod";
import { deleteMeal, findMatchingMeals } from "../mealTools.ts";

const deleteMealTool = llm.tool({
    description: `
Delete a previously logged meal.

Use this when the user wants to:
- Delete a meal.
- Remove a meal.
- Forget a meal.
- Undo logging a meal.

Examples:
- Delete my banana.
- Remove today's coffee.
- Forget yesterday's lunch.
- Delete the apple I had this morning.

Resolve natural language dates like "today", "yesterday",
"this morning", and "last week" into YYYY-MM-DD before calling this tool.
`,

    parameters: z.object({
        food: z
            .string()
            .describe("The food to delete."),

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
                "End date in YYYY-MM-DD format if the user specifies a time period."
            ),
    }),

    execute: async ({ food, startDate, endDate }) => {
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

            const matches = await findMatchingMeals(food, dateRange);

            if (matches.length === 0) {
                return `I couldn't find any meal containing "${food}".`;
            }

            if (matches.length > 1) {
                return `I found multiple meals containing "${food}". Please specify which one you want to delete.`;
            }

            const meal = matches[0];

            const result = await deleteMeal(meal._id);

            return result;
        } catch (error) {
            return {
                success: false,
                message:
                    error instanceof Error
                        ? error.message
                        : "Unable to delete meal.",
            };
        }
    },
});

export { deleteMealTool };
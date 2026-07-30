import { llm } from "@livekit/agents";
import { z } from "zod";
import { deleteMeals } from "../mealTools.ts";

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
            .optional()
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
        mealType: z
            .enum(["breakfast", "lunch", "dinner", "snack"])
            .optional(),
    }),

    execute: async ({ food, mealType, startDate, endDate }) => {
        try {
            if (!endDate) endDate = startDate;
            const data: {
                food?: string;
                mealType?: string;
                startDate?: string;
                endDate?: string;
            } = {};
            if(food) data.food = food;
            if(mealType) data.mealType=mealType;    
            if(startDate) data.startDate=startDate;
            if(endDate) data.endDate=endDate;

            return await deleteMeals(data);

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
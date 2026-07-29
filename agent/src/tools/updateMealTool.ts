import { llm } from "@livekit/agents";
import { z } from "zod";
import { updateMeals } from "../mealTools.ts";

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

            mealType: z
            .enum(["breakfast", "lunch", "dinner", "snack"])
            .optional(),

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

    execute: async ({ oldFood, newFood, mealType, quantity, startDate, endDate, }) => {
        try {
            if(!endDate)
                endDate = startDate;

            return await updateMeals(
                oldFood,
                newFood,
                mealType,
                quantity,
                startDate,
                endDate,
            );
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
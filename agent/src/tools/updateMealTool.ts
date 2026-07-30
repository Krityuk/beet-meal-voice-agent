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
            .optional()
            .describe("The food currently present in the meal."),

        newFood: z
            .string()
            .optional()
            .describe("The new food to replace the existing food."),

        oldMealType: z
            .enum(["breakfast", "lunch", "dinner", "snack"])
            .describe("The mealType currently present in the meal")
            .optional(),

        newMealType: z
            .enum(["breakfast", "lunch", "dinner", "snack"])
            .describe("The mealType to replace the existing mealType")
            .optional(),

        oldQuantity: z
            .number()
            .positive()
            .optional()
            .describe("The quantity currently present in the meal"),

        newQuantity: z
            .number()
            .positive()
            .optional()
            .describe("The quantity to replace the existing quantity."),

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

    execute: async ({ oldFood, newFood, oldMealType, newMealType, oldQuantity, newQuantity, startDate, endDate }) => {
        try {
            if (!endDate) endDate = startDate;

            const data: {
                oldFood?: string;
                newFood?: string;
                oldMealType?: string;
                newMealType?: string;
                oldQuantity?: number;
                newQuantity?: number;
                startDate?: string;
                endDate?: string;
            } = {};

            if (oldFood) data.oldFood = oldFood;
            if (newFood) data.newFood = newFood;
            if (oldMealType) data.oldMealType = oldMealType;
            if (newMealType) data.newMealType = newMealType;
            if (oldQuantity) data.oldQuantity = oldQuantity;
            if (newQuantity) data.newQuantity = newQuantity;
            if (startDate) data.startDate = startDate;
            if (endDate) data.endDate = endDate;

            return await updateMeals(data);
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
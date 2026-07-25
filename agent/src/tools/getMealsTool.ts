import { llm } from "@livekit/agents";
import { z } from "zod";
import { getMeals } from "../mealTools.ts";

const getMealsTool = llm.tool({
    description:
        `Retrieve meals logged by the user.

        Use this whenever the user asks:
        - What did I eat?
        - Show my meals.
        - Did I eat banana?
        - What did I have for breakfast?
        - What did I eat today/yesterday/last week?

        Resolve natural language dates like "today", "yesterday", "last week" into YYYY-MM-DD dates before calling this tool.`,

    parameters: z.object({
        food: z
            .string()
            .optional()
            .describe("Optional food name to filter meals."),

        startDate: z
            .string()
            .optional()
            .describe(
                "Start date in YYYY-MM-DD format. Convert words like today, yesterday, last week into dates before calling."
            ),

        endDate: z
            .string()
            .optional()
            .describe(
                "End date in YYYY-MM-DD format."
            ),
    }),

    execute: async ({ food, startDate, endDate }) => {
        try {
            const params: {
                food?: string;
                startDate?: string;
                endDate?: string;
            } = {};

            if (food) {
                params.food = food;
            }

            if (startDate) {
                params.startDate = startDate;
            }

            if (endDate) {
                params.endDate = endDate;
            }

            const result = await getMeals(params);

            return result;
        } catch (error) {
            return error instanceof Error
                ? error.message
                : "Unable to retrieve meals.";
        }
    },
});

export { getMealsTool };
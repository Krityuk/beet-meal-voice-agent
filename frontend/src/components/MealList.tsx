import { useEffect, useState } from "react";
import { getMeals } from "../api/meals";
import MealCard from "./MealCard";
import type { Meal } from "../types/Meal";

export default function MealList() {
    const [meals, setMeals] = useState<Meal[]>([]);

    useEffect(() => {
        loadMeals();

        const intervalId = setInterval(() => {
            loadMeals();
        }, 5000); // Refresh frontend every 2 seconds

        return () => clearInterval(intervalId);
    }, []);

    async function loadMeals() {
        const data = await getMeals();
        setMeals(data.data);
    }

    const groupedMeals = meals.reduce((groups, meal) => {
        const date = new Date(meal.consumedDate);

        const today = new Date();
        const yesterday = new Date();
        yesterday.setDate(today.getDate() - 1);

        let key = date.toDateString();

        if (date.toDateString() === today.toDateString()) {
            key = "Today";
        } else if (date.toDateString() === yesterday.toDateString()) {
            key = "Yesterday";
        }

        if (!groups[key]) {
            groups[key] = [];
        }

        groups[key].push(meal);

        return groups;
    }, {} as Record<string, Meal[]>);

    return (
        <div>
            {Object.entries(groupedMeals).map(([date, meals]) => (
                <div key={date}>
                    <h2
                        style={{
                            marginTop: "24px",
                            marginBottom: "12px",
                            color: "#2c3e50",
                            borderBottom: "2px solid #eee",
                            paddingBottom: "6px",
                        }}
                    >
                        {date}
                    </h2>

                    {meals.map((meal) => (
                        <MealCard
                            key={meal._id}
                            meal={meal}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
}
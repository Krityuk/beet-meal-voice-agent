import { useEffect, useState } from "react";
import { getMeals } from "../api/meals";
import MealCard from "./MealCard";
import type { Meal } from "../types/Meal";
import { API_ENDPOINTS } from "../constants/api";

import { getFoodsCollection } from "../api/foods";
import type { Food } from "../types/Food";

export default function MealList() {
    const [meals, setMeals] = useState<Meal[]>([]);
    const [foodsCollection, setFoodsCollection] = useState<Food[]>([]);

    useEffect(() => {
        loadMeals(); // from mongoDB
        loadFoodsCollection(); // from foods.json

        const eventSource = new EventSource(
            API_ENDPOINTS.EVENTS
        ); // For SSE, we dont call fetch(url), instead we call new EventSource(url);

        eventSource.onmessage = () => { // In SSE we dont get response, we get eventSource.onmessage
            loadMeals();
        };

        return () => { // return inside useEffect is for cleanUps
            eventSource.close();
        };
    }, []);

    async function loadMeals() {
        const data = await getMeals();
        setMeals(data.data);
    }

    async function loadFoodsCollection() {
        const response = await getFoodsCollection();
        setFoodsCollection(response.data);
    }

    const foodsMap = new Map(foodsCollection.map(food => [food.id, food]));

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
                            food={foodsMap.get(meal.foodId)}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
}
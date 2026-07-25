import type { Meal } from "../types/Meal";

interface Props {
    meal: Meal;
}

export default function MealCard({ meal }: Props) {
    const loggedTime = new Date(meal.loggedAt).toLocaleTimeString(
        "en-IN",
        {
            hour: "numeric",
            minute: "2-digit",
        }
    );

    return (
        <div
            style={{
                borderRadius: "12px",
                padding: "18px",
                marginBottom: "14px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                background: "#f0fdf4",
                border: "1px solid #bbf7d0"
            }}
        >
            {/* Top Row */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <div>
                    <h3
                        style={{
                            margin: 0,
                            fontSize: "20px",
                        }}
                    >
                        🍽️ {meal.foodName}
                    </h3>

                    <p
                        style={{
                            margin: "6px 0 0",
                            color: "#666",
                        }}
                    >
                        {meal.mealType} • {meal.quantity} {meal.unit}
                    </p>
                </div>

                <span
                    style={{
                        fontSize: "14px",
                        color: "#777",
                    }}
                >
                    🕒 {loggedTime}
                </span>
            </div>

            <hr
                style={{
                    margin: "16px 0",
                    border: "none",
                    borderTop: "1px solid #eee",
                }}
            />

            {/* Nutrition */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: "12px",
                }}
            >
                <div>
                    <strong>🔥 Calories</strong>
                    <br />
                    {meal.nutrition.calories} kcal
                </div>

                <div>
                    <strong>🥩 Protein</strong>
                    <br />
                    {meal.nutrition.protein} g
                </div>

                <div>
                    <strong>🍚 Carbs</strong>
                    <br />
                    {meal.nutrition.carbs} g
                </div>

                <div>
                    <strong>🥑 Fat</strong>
                    <br />
                    {meal.nutrition.fat} g
                </div>
            </div>
        </div>
    );
}
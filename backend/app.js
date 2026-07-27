// app.js is entry point for express-app and server.js is entry point of server
import express from "express";
import cors from "cors";

import mealRoutes from "./routes/mealRoutes.js";
import tokenRoutes from "./routes/tokenRoutes.js";
import dispatchAgentRoutes from "./routes/dispatchAgentRoutes.js";

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/meals", mealRoutes);
app.use("/api/token", tokenRoutes);
app.use("/api/dispatchAgent", dispatchAgentRoutes);

// Test Route
app.get("/", (req, res) => {
    res.send("Backend is running...");
});

// Handle unknown routes
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
    });
});

export default app;
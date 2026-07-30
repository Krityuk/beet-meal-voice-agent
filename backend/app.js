// app.js is entry point for express-app and server.js is entry point of server
import express from "express";
import cors from "cors";

import mealRoutes from "./routes/mealRoutes.js";
import tokenRoutes from "./routes/tokenRoutes.js";
import dispatchAgentRoutes from "./routes/dispatchAgentRoutes.js";
import foodRoutes from "./routes/foodRoutes.js";

import { addClient, removeClient } from "./utils/sse.js";

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// HTTP Routes
app.use("/api/meals", mealRoutes);
app.use("/api/token", tokenRoutes);
app.use("/api/dispatchAgent", dispatchAgentRoutes);
app.use("/api/foods", foodRoutes);

// SSE Routes (whenEver some data changes in mongodb, it would reloadMeals in react app)
app.get("/api/events", (req, res) => {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    res.flushHeaders(); // Headers are sent early, data would be sent later by res.write (in notifyListenersFunction). ✅

    const client = addClient(res);

    // If some browser tab is closed, then remove that particular client
    req.on("close", () => {
        removeClient(client.id);
    });
});

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
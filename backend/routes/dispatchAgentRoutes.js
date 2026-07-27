import express from "express";
import { dispatchAgent } from "../controllers/dispatchAgentController.js";

const router = express.Router();

router.post("/", dispatchAgent);

export default router;
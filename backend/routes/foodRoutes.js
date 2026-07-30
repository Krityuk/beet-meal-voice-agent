import express from "express";
import { getFoodsController } from "../controllers/foodController.js";

const router = express.Router();

router.get("/", getFoodsController);

export default router;
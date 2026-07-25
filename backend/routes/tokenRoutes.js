import { Router } from "express";
import { createToken } from "../controllers/tokenController.js";

const router = Router();

router.get("/", createToken);

export default router;
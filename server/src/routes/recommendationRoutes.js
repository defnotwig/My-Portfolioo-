import { Router } from "express";
import { getRecommendations } from "../controllers/contentController.js";

const router = Router();

router.get("/", getRecommendations);

export default router;


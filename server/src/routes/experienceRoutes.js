import { Router } from "express";
import { getExperience } from "../controllers/contentController.js";

const router = Router();

router.get("/", getExperience);

export default router;


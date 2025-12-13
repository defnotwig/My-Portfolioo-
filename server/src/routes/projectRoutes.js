import { Router } from "express";
import { getProjects } from "../controllers/contentController.js";

const router = Router();

router.get("/", getProjects);

export default router;


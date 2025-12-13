import { Router } from "express";
import { getAbout } from "../controllers/contentController.js";

const router = Router();

router.get("/", getAbout);

export default router;


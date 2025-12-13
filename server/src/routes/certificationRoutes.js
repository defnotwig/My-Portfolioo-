import { Router } from "express";
import { getCertifications } from "../controllers/contentController.js";

const router = Router();

router.get("/", getCertifications);

export default router;


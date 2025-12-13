import express from "express";
import {
  getFaqs,
  replaceFaqs,
  addFaq,
  deleteFaq,
} from "../controllers/kbController.js";

const router = express.Router();

// Minimal token auth middleware. Token is read from KB_ADMIN_TOKEN env.
function requireAdmin(req, res, next) {
  const expected = process.env.KB_ADMIN_TOKEN;
  if (!expected) return res.status(403).json({ error: "KB admin token not configured on server." });

  const headerToken = (req.headers["x-kb-admin-token"] || "") || (req.headers.authorization || "");
  let token = headerToken;
  if (typeof token === "string" && token.toLowerCase().startsWith("bearer ")) {
    token = token.slice(7).trim();
  }

  if (!token || token !== expected) return res.status(401).json({ error: "Invalid or missing admin token." });
  next();
}

// Public: list FAQs
router.get("/faqs", getFaqs);

// Admin: replace entire FAQ set
router.put("/faqs", requireAdmin, replaceFaqs);

// Admin: add a new FAQ
router.post("/faqs", requireAdmin, addFaq);

// Admin: delete FAQ by id
router.delete("/faqs/:id", requireAdmin, deleteFaq);

export default router;

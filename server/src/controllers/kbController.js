import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const faqPath = path.join(__dirname, "../data/kb_faq.json");

function readFaqFile() {
  if (!fs.existsSync(faqPath)) return [];
  try {
    const raw = fs.readFileSync(faqPath, "utf-8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error("[kbController] failed to read kb_faq.json:", err?.message || err);
    return [];
  }
}

function writeFaqFile(list) {
  try {
    fs.writeFileSync(faqPath, JSON.stringify(list, null, 2), "utf-8");
    return true;
  } catch (err) {
    console.error("[kbController] failed to write kb_faq.json:", err?.message || err);
    return false;
  }
}

export const getFaqs = (_req, res) => {
  const list = readFaqFile();
  res.json(list);
};

export const replaceFaqs = (req, res) => {
  const body = req.body;
  if (!Array.isArray(body)) {
    return res.status(400).json({ error: "Body must be an array of FAQ entries." });
  }
  const ok = writeFaqFile(body);
  if (!ok) return res.status(500).json({ error: "Failed to save FAQs." });
  res.json({ status: "ok", count: body.length });
};

export const addFaq = (req, res) => {
  const entry = req.body;
  if (!entry || !entry.id || !Array.isArray(entry.keywords) || !entry.answer) {
    return res.status(400).json({ error: "Entry must include 'id', 'keywords' array and 'answer'." });
  }
  const list = readFaqFile();
  if (list.find((e) => e.id === entry.id)) {
    return res.status(409).json({ error: "Entry with this id already exists." });
  }
  list.push(entry);
  const ok = writeFaqFile(list);
  if (!ok) return res.status(500).json({ error: "Failed to save FAQ." });
  res.status(201).json(entry);
};

export const deleteFaq = (req, res) => {
  const { id } = req.params;
  const list = readFaqFile();
  const idx = list.findIndex((e) => e.id === id);
  if (idx === -1) return res.status(404).json({ error: "FAQ not found." });
  const [removed] = list.splice(idx, 1);
  const ok = writeFaqFile(list);
  if (!ok) return res.status(500).json({ error: "Failed to remove FAQ." });
  res.json({ status: "ok", removed });
};

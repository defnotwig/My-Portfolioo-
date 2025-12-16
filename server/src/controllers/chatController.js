import crypto from "crypto";
import { ChatMessage } from "../models/ChatMessage.js";
import assistantKB from "../utils/assistantKB.js";

const geminiApiKey = process.env.GEMINI_API_KEY;
const geminiModel = process.env.GEMINI_MODEL || "gemini-1.0-pro";

const asyncHandler =
  (fn) =>
    async (req, res, next) => {
      try {
        await fn(req, res, next);
      } catch (error) {
        next(error);
      }
    };

export const chatWithAssistant = asyncHandler(async (req, res) => {
  const { message, sessionId } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required." });
  }

  const session = sessionId ?? crypto.randomUUID();

  await ChatMessage.create({
    sender: "user",
    content: message,
    sessionId: session,
  });

  // Check editable FAQ file first for exact/keyword-based answers.
  try {
    const faqAnswer = assistantKB.findFAQAnswer(message);
    if (faqAnswer) {
      const assistantMessage = await ChatMessage.create({
        sender: "assistant",
        content: faqAnswer,
        sessionId: session,
      });
      return res.json({ sessionId: session, reply: assistantMessage.content, provider: "faq" });
    }
  } catch (err) {
    console.error("[chat] FAQ lookup error:", err?.message || err);
  }

  // Try a fast, local rule-based reply before contacting an LLM provider.
  try {
    const { intent } = assistantKB.classify(message);
    const canned = assistantKB.answerForIntent(intent);
    if (canned) {
      const assistantMessage = await ChatMessage.create({
        sender: "assistant",
        content: canned,
        sessionId: session,
      });

      return res.json({ sessionId: session, reply: assistantMessage.content, provider: "rules" });
    }
  } catch (err) {
    console.error("[chat] assistantKB error:", err?.message || err);
    // fall through to LLM path
  }

  let replyText;
  let provider = "mock";

  if (geminiApiKey) {
    console.log("[chat] Using Gemini provider with model:", geminiModel);
    try {
      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/" +
        encodeURIComponent(geminiModel) +
        ":generateContent?key=" +
        geminiApiKey,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [
                  {
                    text:
                      "You are an AI concierge for the portfolio of Gabriel Ludwig Rivera.\n" +
                      "\n" +
                      "GROUNDING FACTS (do NOT contradict these):\n" +
                      "- Name: Gabriel Ludwig Rivera\n" +
                      "- Location: Calamba City, Philippines\n" +
                      "- Roles: Software Developer, IT Student, Systems Builder\n" +
                      "- Education: BS Information Technology, City College of Calamba (2022–Present)\n" +
                      "- Experience:\n" +
                      "  * Membership & Election Committee Head – CCC Information Technology Society (2024–2025)\n" +
                      "  * Project Lead – K-WISE PC Builder Kiosk (2025), with Ollama DeepSeek R1, 3,200+ compatibility rules, 32,240 checks (~99.87% build pass, ~93.14% rule agreement), sub‑2s AI responses, 3.80/4.0 satisfaction, ~1062% ROI, 9.2‑month payback\n" +
                      "  * Developer – QR Attendance Tracker (2025), C# / WinForms, QR-based logging/export\n" +
                      "  * QA – Failed Deliveries, Shopee Philippines (Apr–Oct 2022)\n" +
                      "  * Freelance Software Developer (2023–Present)\n" +
                      "- Tech stack:\n" +
                      "  * Frontend: JavaScript, React.js, HTML, CSS\n" +
                      "  * Backend & DB: Node.js, Express.js, SQL, MySQL, PostgreSQL, MongoDB\n" +
                      "  * Tools: VSCode, Git, GitHub\n" +
                      "  * AI & Systems: Ollama DeepSeek R1, LLMs, prompt engineering\n" +
                      "- Projects:\n" +
                      "  * K-WISE PC Builder Kiosk (multi-terminal campus kiosk, analytics-ready admin dashboard)\n" +
                      "  * QR Attendance Tracker\n" +
                      "  * PC Build Optimizer (AI-guided PC builder)\n" +
                      "  * E‑Commerce Structure Clone (React + C# API)\n" +
                      "- Recommendations mention that Gabriel delivers production-ready systems, blends leadership with technical rigor, and is reliable and intentional.\n" +
                      "- Certifications: Huawei Developer Expert, Generative AI Leader (Google), Generative AI Professional (Oracle), Software Engineering (TestDome).\n" +
                      "- Social/contact (use ONLY these, do NOT invent email domains or URLs):\n" +
                      "  * GitHub: https://github.com/defnotwig\n" +
                      "  * LinkedIn: https://www.linkedin.com/in/glrrivera/\n" +
                      "  * Facebook: https://www.facebook.com/ludwig.rivera.1/\n" +
                      "  * Email: ludwigrivera13@gmail.com\n" +
                      "  * Phone: 09942372275\n" +
                      "\n" +
                      "BEHAVIOR:\n" +
                      "- Be concise, friendly, and professional.\n" +
                      "- When asked about Gabriel, base your answers strictly on the facts above.\n" +
                      "- When asked about contact info, ALWAYS use the exact contact details above.\n" +
                      "- When asked about projects, reference the specific projects and stats where helpful.\n" +
                      "- If you don't know something from the portfolio, say you don't know instead of guessing.\n" +
                      "\n" +
                      "User message: " +
                      message,
                  },
                ],
              },
            ],
          }),
        }
      );

      const data = await response.json();
      console.log("[chat] Gemini raw response:", JSON.stringify(data));

      const candidateText =
        data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

      if (candidateText) {
        replyText = candidateText;
        provider = "gemini";
        console.log("[chat] Gemini reply:", replyText);
      } else {
        replyText =
          "I received your message, but couldn't generate a detailed answer. Please try rephrasing or asking something else.";
      }
    } catch (error) {
      console.error("[chat] Gemini error:", error.message);
      replyText =
        "The AI concierge ran into an issue talking to Gemini. Please try again in a moment.";
    }
  } else {
    console.log("[chat] No GEMINI_API_KEY set, returning simple echo reply");
    replyText = `You said: \"${message}\". (AI is not configured yet on the server.)`;
  }

  const assistantMessage = await ChatMessage.create({
    sender: "assistant",
    content: replyText,
    sessionId: session,
  });

  res.json({
    sessionId: session,
    reply: assistantMessage.content,
    provider,
  });
});


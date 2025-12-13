import mongoose from "mongoose";

const ChatMessageSchema = new mongoose.Schema(
  {
    sender: { type: String, enum: ["user", "assistant"], required: true },
    content: { type: String, required: true },
    sessionId: { type: String, default: "default" },
  },
  { timestamps: true }
);

export const ChatMessage = mongoose.model("ChatMessage", ChatMessageSchema);


import mongoose from "mongoose";

const RecommendationSchema = new mongoose.Schema(
  {
    quote: { type: String, required: true },
    author: { type: String, required: true },
    role: { type: String, required: true },
  },
  { timestamps: true }
);

export const Recommendation = mongoose.model(
  "Recommendation",
  RecommendationSchema
);


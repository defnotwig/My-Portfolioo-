import mongoose from "mongoose";

const AboutSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    roles: [{ type: String }],
    tagline: { type: String, required: true },
    paragraphs: [{ type: String }],
    highlights: [{ type: String }],
  },
  { timestamps: true }
);

export const About = mongoose.model("About", AboutSchema);


import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    stack: [{ type: String }],
    year: { type: String },
    image: { type: String },
    link: { type: String },
    highlight: { type: String },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Project = mongoose.model("Project", ProjectSchema);


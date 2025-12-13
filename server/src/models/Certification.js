import mongoose from "mongoose";

const CertificationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    issuer: { type: String, required: true },
    year: { type: String },
    badge: { type: String },
  },
  { timestamps: true }
);

export const Certification = mongoose.model(
  "Certification",
  CertificationSchema
);


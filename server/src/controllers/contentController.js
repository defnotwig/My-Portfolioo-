import { About } from "../models/About.js";
import { Experience } from "../models/Experience.js";
import { Project } from "../models/Project.js";
import { Certification } from "../models/Certification.js";
import { Recommendation } from "../models/Recommendation.js";

const asyncHandler =
  (fn) =>
  async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };

export const getAbout = asyncHandler(async (_req, res) => {
  const about = await About.findOne().sort({ updatedAt: -1 }).lean();
  res.json(about);
});

export const getExperience = asyncHandler(async (_req, res) => {
  const experience = await Experience.find().sort({ order: 1 }).lean();
  res.json(experience);
});

export const getProjects = asyncHandler(async (_req, res) => {
  const projects = await Project.find().sort({ order: 1 }).lean();
  res.json(projects);
});

export const getCertifications = asyncHandler(async (_req, res) => {
  const certifications = await Certification.find().sort({ createdAt: -1 });
  res.json(certifications);
});

export const getRecommendations = asyncHandler(async (_req, res) => {
  const recommendations = await Recommendation.find()
    .sort({ createdAt: -1 })
    .lean();
  res.json(recommendations);
});


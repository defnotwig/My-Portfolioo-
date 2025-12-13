import axios from "axios";

const baseURL = `${import.meta.env.VITE_API_URL || "http://localhost:5501"}/api`;

export const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchPortfolio = async () => {
  const [about, experience, projects, certifications, recommendations] =
    await Promise.all([
      api.get("/about"),
      api.get("/experience"),
      api.get("/projects"),
      api.get("/certifications"),
      api.get("/recommendations"),
    ]);

  return {
    about: about.data,
    experience: experience.data,
    projects: projects.data,
    certifications: certifications.data,
    recommendations: recommendations.data,
  };
};


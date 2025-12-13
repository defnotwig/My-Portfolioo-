import { useEffect, useState } from "react";
import { fetchPortfolio } from "@/lib/api";

const initialState = {
  about: null,
  experience: [],
  projects: [],
  certifications: [],
  recommendations: [],
};

export const usePortfolioData = () => {
  const [data, setData] = useState(initialState);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const payload = await fetchPortfolio();
        setData(payload);
      } catch (err) {
        console.error(err);
        setError("Unable to load content right now.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return { ...data, loading, error };
};


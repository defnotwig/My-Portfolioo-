import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles/globals.css";

// Initialize theme based on user preference (default to light for Apple-inspired design)
if (typeof window !== "undefined") {
  const savedTheme = window.localStorage.getItem("glr-theme");
  if (savedTheme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
    window.localStorage.setItem("glr-theme", "light");
  }
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


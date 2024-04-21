import React, { useState, useEffect } from "react";
import prompts from "./data/prompts";
import Favorites from "./components/Favorites";
import { AnimatePresence, motion } from "framer-motion";
import "./App.css";

const JarNote = ({ prompt, onDraw }) => {
  return (
    <motion.div
      className="jar-note"
      initial={{ y: 100, opacity: 0, rotate: 10 }}
      animate={{ y: 0, opacity: 1, rotate: 0 }}
      exit={{ y: -100, opacity: 0, rotate: -10 }}
      transition={{ type: "spring", stiffness: 120, damping: 15 }}
    >
      <p>{prompt}</p>
      <button className="draw-button" onClick={onDraw}>
        Draw Another Note
      </button>
    </motion.div>
  );
};

const App = () => {
  const [page, setPage] = useState("daily");
  const getRandomPrompt = () =>
    prompts[Math.floor(Math.random() * prompts.length)];

  const [prompt, setPrompt] = useState(() => {
    const saved = localStorage.getItem("dailyPrompt");
    const today = new Date().toDateString();
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.date === today) return parsed.prompt;
    }
    const newPrompt = getRandomPrompt();
    localStorage.setItem(
      "dailyPrompt",
      JSON.stringify({ date: today, prompt: newPrompt })
    );
    return newPrompt;
  });

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  const handleDraw = () => {
    const newPrompt = getRandomPrompt();
    setPrompt(newPrompt);
    localStorage.setItem(
      "dailyPrompt",
      JSON.stringify({ date: new Date().toDateString(), prompt: newPrompt })
    );
  };

  const addFavorite = (newFav) => {
    if (favorites.includes(newFav)) return;
    const updated = [...favorites, newFav];
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  const removeFavorite = (toRemove) => {
    const updated = favorites.filter((fav) => fav !== toRemove);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return (
    <div className="app">
      <h1>Creativity Jar 🧠</h1>
      <nav>
        <button
          onClick={() => setPage("daily")}
          disabled={page === "daily"}
          style={{ marginRight: "1rem" }}
        >
          Daily Prompt
        </button>
        <button
          onClick={() => setPage("favorites")}
          disabled={page === "favorites"}
        >
          Favorites ({favorites.length})
        </button>
      </nav>

      <hr />

      {page === "daily" && (
        <div className="jar-container">
          <AnimatePresence mode="wait">
            <JarNote
              key={prompt}
              prompt={prompt}
              onDraw={handleDraw}
              onFavorite={() => addFavorite(prompt)}
            />
          </AnimatePresence>
          <button
            className="favorite-btn"
            onClick={() => addFavorite(prompt)}
            disabled={favorites.includes(prompt)}
            title={
              favorites.includes(prompt)
                ? "Already in favorites"
                : "Save to favorites"
            }
          >
            {favorites.includes(prompt)
              ? "Saved to Favorites"
              : "Save to Favorites"}
          </button>
        </div>
      )}

      {page === "favorites" && (
        <Favorites favorites={favorites} onRemove={removeFavorite} />
      )}
    </div>
  );
};

export default App;

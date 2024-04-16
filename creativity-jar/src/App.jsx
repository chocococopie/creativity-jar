import React, { useState, useEffect } from "react";
import prompts from "./data/prompts";
import PromptCard from "./components/PromptCard";
import Favorites from "./components/Favorites";
import "./App.css";

const App = () => {
  const [page, setPage] = useState("daily"); // 'daily' or 'favorites'

  const getRandomPrompt = () => {
    return prompts[Math.floor(Math.random() * prompts.length)];
  };

  // Daily prompt state and logic (same as before)
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

  const handleNewPrompt = () => {
    const newPrompt = getRandomPrompt();
    setPrompt(newPrompt);
    localStorage.setItem(
      "dailyPrompt",
      JSON.stringify({ date: new Date().toDateString(), prompt: newPrompt })
    );
  };

  const addFavorite = (newFav) => {
    if (favorites.includes(newFav)) return; // avoid duplicates
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
        <PromptCard
          prompt={prompt}
          onNext={handleNewPrompt}
          onFavorite={() => addFavorite(prompt)}
          isFavorited={favorites.includes(prompt)}
        />
      )}

      {page === "favorites" && (
        <Favorites favorites={favorites} onRemove={removeFavorite} />
      )}
    </div>
  );
};

export default App;

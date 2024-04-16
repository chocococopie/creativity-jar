// src/components/PromptCard.jsx
import React from "react";

const PromptCard = ({ prompt, onNext, onFavorite, isFavorited }) => {
  return (
    <div className="prompt-card">
      <h2>✨ Your Prompt</h2>
      <p>{prompt}</p>

      <button onClick={onNext}>New Prompt</button>

      <button
        onClick={onFavorite}
        disabled={isFavorited}
        style={{ marginLeft: "1rem" }}
        title={isFavorited ? "Already in favorites" : "Save to favorites"}
      >
        {isFavorited ? "Saved" : "Save to Favorites"}
      </button>
    </div>
  );
};

export default PromptCard;

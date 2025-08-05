// src/components/Favorites.jsx
import React from "react";

const Favorites = ({ favorites, onRemove }) => {
  if (favorites.length === 0) {
    return <p>You have no favorite prompts saved yet.</p>;
  }

  return (
    <div>
      <h2>⭐ Your Favorite Prompts</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {favorites.map((prompt, i) => (
          <li
            key={i}
            style={{
              marginBottom: "1rem",
              padding: "0.8rem",
              backgroundColor: "#fff3cd",
              borderRadius: "8px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>{prompt}</span>
            <button
              onClick={() => onRemove(prompt)}
              style={{
                backgroundColor: "#ff6b6b",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                padding: "0.4rem 0.8rem",
              }}
              title="Remove from favorites"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favorites;

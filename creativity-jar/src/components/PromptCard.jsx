import React from "react";
import { motion } from "framer-motion";

const PromptCard = ({ prompt, onNext, onFavorite, isFavorited }) => {
  return (
    <div className="prompt-card">
      <h2>✨ Your Prompt</h2>
      <p>{prompt}</p>

      <button onClick={onNext}>New Prompt</button>

      <motion.button
        onClick={onFavorite}
        disabled={isFavorited}
        style={{ marginLeft: "1rem" }}
        title={isFavorited ? "Already in favorites" : "Save to favorites"}
        whileTap={{ scale: 0.9 }}
        animate={isFavorited ? { scale: [1, 1.2, 1] } : {}}
        transition={{ duration: 0.3 }}
      >
        {isFavorited ? "Saved" : "Save to Favorites"}
      </motion.button>
    </div>
  );
};

export default PromptCard;

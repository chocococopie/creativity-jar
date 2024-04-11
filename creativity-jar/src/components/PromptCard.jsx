import React from "react";

const PromptCard = ({ prompt, onNext }) => {
  return (
    <div className="prompt-card">
      <h2>✨ Your Prompt</h2>
      <p>{prompt}</p>
      <button onClick={onNext}>New Prompt</button>
    </div>
  );
};

export default PromptCard;

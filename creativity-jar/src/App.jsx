import React, { useState, useEffect } from "react";
import prompts from "./data/prompts";
import PromptCard from "./components/PromptCard";
import "./App.css";

const App = () => {
  const getRandomPrompt = () => {
    return prompts[Math.floor(Math.random() * prompts.length)];
  };

  const [prompt, setPrompt] = useState(() => {
    // Load from localStorage if exists
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

  const handleNewPrompt = () => {
    const newPrompt = getRandomPrompt();
    setPrompt(newPrompt);
    localStorage.setItem(
      "dailyPrompt",
      JSON.stringify({ date: new Date().toDateString(), prompt: newPrompt })
    );
  };

  return (
    <div className="app">
      <h1>Creativity Jar 🧠</h1>
      <PromptCard prompt={prompt} onNext={handleNewPrompt} />
    </div>
  );
};

export default App;

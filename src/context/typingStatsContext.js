import React, { createContext, useContext, useState, useEffect } from "react";
import { useSelector } from "react-redux";

const TypingStatsContext = createContext();

export const TypingStatsProvider = ({ children }) => {
  const reduxStats = useSelector((state) => state.typing);

  // Default stats (avoiding localStorage on SSR)
  const [stats, setStats] = useState({
    averageWpm: 0,
    averageAccuracy: 0,
    sessions: 0,
    totalWpm: 0,
    totalAccuracy: 0,
  });

  // Load from localStorage after mounting
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedStats = localStorage.getItem("typingStats");
      if (storedStats) {
        setStats(JSON.parse(storedStats));
      }
    }
  }, []);

  // Sync Redux stats (if available)
  useEffect(() => {
    if (reduxStats) {
      setStats((prevStats) => ({
        ...prevStats,
        ...reduxStats,
      }));
    }
  }, [reduxStats]);

  // Save to localStorage whenever stats change
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("typingStats", JSON.stringify(stats));
    }
  }, [stats]);

  // Function to update stats manually
  const updateStats = (newStats) => {
    setStats((prevStats) => ({ ...prevStats, ...newStats }));
  };

  return (
    <TypingStatsContext.Provider value={{ stats, updateStats }}>
      {children}
    </TypingStatsContext.Provider>
  );
};

export const useTypingStats = () => useContext(TypingStatsContext);

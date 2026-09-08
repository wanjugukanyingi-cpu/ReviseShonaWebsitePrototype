import { useState, useEffect, useRef } from "react";

/** Simulates a live-updating numeric metric that occasionally increments. */
export function useLiveMetric(base: number, intervalMs = 8000) {
  const [value, setValue] = useState(base);
  const [lastUpdated, setLastUpdated] = useState(0); // seconds ago

  useEffect(() => {
    // Occasionally tick up
    const dataInterval = setInterval(() => {
      if (Math.random() > 0.55) {
        setValue((v) => v + 1);
        setLastUpdated(0);
      }
    }, intervalMs + Math.random() * 4000);

    // Tick up the "last updated" counter
    const clockInterval = setInterval(() => {
      setLastUpdated((s) => s + 1);
    }, 1000);

    return () => {
      clearInterval(dataInterval);
      clearInterval(clockInterval);
    };
  }, [intervalMs]);

  return { value, lastUpdated };
}

/** Returns a "seconds ago" label. */
export function ageLabel(seconds: number): string {
  if (seconds < 5) return "just now";
  if (seconds < 60) return `${seconds}s ago`;
  return `${Math.floor(seconds / 60)}m ago`;
}

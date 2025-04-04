
import { format } from "date-fns";
import { MoodEntry } from "../types";
import { getMoodColor, getMoodScore, moodOptions } from "../types";

// Get date range based on selected time range
export const getDateRange = (timeRange: "7days" | "30days" | "90days" | "all", entries: MoodEntry[]) => {
  const endDate = new Date();
  const startDate = new Date();
  
  switch (timeRange) {
    case "7days":
      startDate.setDate(endDate.getDate() - 7);
      break;
    case "30days":
      startDate.setDate(endDate.getDate() - 30);
      break;
    case "90days":
      startDate.setDate(endDate.getDate() - 90);
      break;
    case "all":
      if (entries.length > 0) {
        // Find the earliest entry date
        const dates = entries.map(e => new Date(e.date).getTime());
        startDate.setTime(Math.min(...dates));
      } else {
        startDate.setDate(endDate.getDate() - 30); // Default to 30 days if no entries
      }
      break;
  }
  
  return { startDate, endDate };
};

// Generate chart data based on time range
export const generateChartData = (entries: MoodEntry[], timeRange: "7days" | "30days" | "90days" | "all") => {
  const { startDate, endDate } = getDateRange(timeRange, entries);
  const filteredEntries = entries.filter(entry => {
    const entryDate = new Date(entry.date);
    return entryDate >= startDate && entryDate <= endDate;
  });
  
  // Sort entries by date
  filteredEntries.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  return filteredEntries.map(entry => ({
    date: format(new Date(entry.date), "MMM dd"),
    rawDate: new Date(entry.date),
    mood: getMoodScore(entry.mood),
    moodLabel: entry.mood,
    moodColor: getMoodColor(entry.mood),
    energy: entry.energy,
    sleep: entry.sleep,
  }));
};

// Calculate mood distribution data
export const getMoodDistributionData = (entries: MoodEntry[], timeRange: "7days" | "30days" | "90days" | "all") => {
  const { startDate, endDate } = getDateRange(timeRange, entries);
  const filteredEntries = entries.filter(entry => {
    const entryDate = new Date(entry.date);
    return entryDate >= startDate && entryDate <= endDate;
  });
  
  const distribution = moodOptions.map(option => ({
    name: option.label,
    value: filteredEntries.filter(entry => entry.mood === option.value).length,
    color: option.color,
  }));
  
  return distribution.filter(item => item.value > 0);
};

// Calculate health insights
export const calculateAverageSleep = (entries: MoodEntry[]) => {
  if (entries.length === 0) return "N/A";
  const total = entries.reduce((sum, entry) => sum + entry.sleep, 0);
  return (total / entries.length).toFixed(1);
};

export const calculateAverageEnergy = (entries: MoodEntry[]) => {
  if (entries.length === 0) return "N/A";
  const total = entries.reduce((sum, entry) => sum + entry.energy, 0);
  return (total / entries.length).toFixed(1);
};

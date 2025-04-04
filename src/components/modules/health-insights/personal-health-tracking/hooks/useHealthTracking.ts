
import { useState, useEffect } from "react";
import { MoodEntry } from "../types";
import { findEntryForDate, getDefaultEntry } from "../utils/entryUtils";
import { 
  generateChartData, 
  getMoodDistributionData, 
  getDateRange,
  calculateAverageSleep,
  calculateAverageEnergy 
} from "../utils/chartUtils";
import { getMoodColor } from "../types";

export const useHealthTracking = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentEntry, setCurrentEntry] = useState<Omit<MoodEntry, "date">>(getDefaultEntry());
  const [entries, setEntries] = useState<MoodEntry[]>(() => {
    const savedEntries = localStorage.getItem("health-tracking-entries");
    return savedEntries ? JSON.parse(savedEntries) : [];
  });
  const [chartView, setChartView] = useState<"line" | "bar" | "area" | "distribution">("line");
  const [timeRange, setTimeRange] = useState<"7days" | "30days" | "90days" | "all">("30days");

  // Handle saving entry to localStorage
  const handleSaveEntry = () => {
    const newEntry = {
      date: selectedDate,
      ...currentEntry,
    };

    // Check if an entry for this date already exists
    const existingEntryIndex = entries.findIndex(
      (entry) => 
        new Date(entry.date).toDateString() === selectedDate.toDateString()
    );

    let updatedEntries;
    if (existingEntryIndex >= 0) {
      // Update existing entry
      updatedEntries = [...entries];
      updatedEntries[existingEntryIndex] = newEntry;
    } else {
      // Add new entry
      updatedEntries = [...entries, newEntry];
    }

    setEntries(updatedEntries);
    localStorage.setItem("health-tracking-entries", JSON.stringify(updatedEntries));

    return true;
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;
    
    setSelectedDate(date);
    
    // Find if an entry exists for this date
    const existingEntry = findEntryForDate(entries, date);
    
    if (existingEntry) {
      setCurrentEntry({
        mood: existingEntry.mood,
        energy: existingEntry.energy,
        sleep: existingEntry.sleep,
        physicalSymptoms: existingEntry.physicalSymptoms,
        thoughts: existingEntry.thoughts,
      });
    } else {
      // Reset form for a new entry
      setCurrentEntry(getDefaultEntry());
    }
  };

  const chartData = generateChartData(entries, timeRange);
  const distributionData = getMoodDistributionData(entries, timeRange);

  return {
    selectedDate,
    currentEntry,
    entries,
    chartView,
    timeRange,
    chartData,
    distributionData,
    setSelectedDate,
    setCurrentEntry,
    setChartView,
    setTimeRange,
    getDateRange: () => getDateRange(timeRange, entries),
    calculateAverageSleep: () => calculateAverageSleep(entries),
    calculateAverageEnergy: () => calculateAverageEnergy(entries),
    handleSaveEntry,
    handleDateSelect,
    getMoodColor
  };
};

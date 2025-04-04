
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { MoodEntry } from "./types";

export const useHealthTracking = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentEntry, setCurrentEntry] = useState<Omit<MoodEntry, "date">>({
    mood: "okay",
    energy: 5,
    sleep: 7,
    physicalSymptoms: "",
    thoughts: "",
  });
  const [entries, setEntries] = useState<MoodEntry[]>(() => {
    const savedEntries = localStorage.getItem("health-tracking-entries");
    return savedEntries ? JSON.parse(savedEntries) : [];
  });
  const [chartView, setChartView] = useState<"line" | "bar" | "area" | "distribution">("line");
  const [timeRange, setTimeRange] = useState<"7days" | "30days" | "90days" | "all">("30days");

  // Get date range based on selected time range
  const getDateRange = () => {
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
  const generateChartData = () => {
    const { startDate, endDate } = getDateRange();
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
  const getMoodDistributionData = () => {
    const { startDate, endDate } = getDateRange();
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
  const calculateAverageSleep = () => {
    if (entries.length === 0) return "N/A";
    const total = entries.reduce((sum, entry) => sum + entry.sleep, 0);
    return (total / entries.length).toFixed(1);
  };

  const calculateAverageEnergy = () => {
    if (entries.length === 0) return "N/A";
    const total = entries.reduce((sum, entry) => sum + entry.energy, 0);
    return (total / entries.length).toFixed(1);
  };

  const handleSaveEntry = () => {
    const newEntry = {
      date: selectedDate,
      ...currentEntry,
    };

    // Check if an entry for this date already exists
    const existingEntryIndex = entries.findIndex(
      (entry) => format(new Date(entry.date), "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd")
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
    const existingEntry = entries.find(
      (entry) => format(new Date(entry.date), "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
    );
    
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
      setCurrentEntry({
        mood: "okay",
        energy: 5,
        sleep: 7,
        physicalSymptoms: "",
        thoughts: "",
      });
    }
  };

  const chartData = generateChartData();
  const distributionData = getMoodDistributionData();

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
    getDateRange,
    calculateAverageSleep,
    calculateAverageEnergy,
    handleSaveEntry,
    handleDateSelect,
    getMoodColor
  };
};

// Import at the top
import { getMoodColor, getMoodScore, moodOptions } from "./types";

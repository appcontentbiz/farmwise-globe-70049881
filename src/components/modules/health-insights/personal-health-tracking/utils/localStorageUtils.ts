
import { format } from "date-fns";
import { MoodEntry } from "../types";

// Save entry to localStorage
export const saveEntryToLocalStorage = (
  entries: MoodEntry[],
  newEntry: MoodEntry
) => {
  // Check if an entry for this date already exists
  const existingEntryIndex = entries.findIndex(
    (entry) => format(new Date(entry.date), "yyyy-MM-dd") === format(newEntry.date, "yyyy-MM-dd")
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

  // Store in localStorage
  localStorage.setItem("health-tracking-entries", JSON.stringify(updatedEntries));
  
  return updatedEntries;
};

// Load entries from localStorage
export const loadEntriesFromLocalStorage = (): MoodEntry[] => {
  const savedEntries = localStorage.getItem("health-tracking-entries");
  return savedEntries ? JSON.parse(savedEntries) : [];
};

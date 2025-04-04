
import { format } from "date-fns";
import { MoodEntry } from "../types";

// Find existing entry for a date
export const findEntryForDate = (entries: MoodEntry[], date: Date) => {
  return entries.find(
    (entry) => format(new Date(entry.date), "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
  );
};

// Get default entry
export const getDefaultEntry = (): Omit<MoodEntry, "date"> => {
  return {
    mood: "okay",
    energy: 5,
    sleep: 7,
    physicalSymptoms: "",
    thoughts: "",
  };
};


export type MoodEntry = {
  date: Date;
  mood: string;
  energy: number;
  sleep: number;
  physicalSymptoms: string;
  thoughts: string;
};

export const moodOptions = [
  { value: "great", label: "Great", color: "#4CAF50" },
  { value: "good", label: "Good", color: "#8BC34A" },
  { value: "okay", label: "Okay", color: "#FFC107" },
  { value: "low", label: "Low", color: "#FF9800" },
  { value: "bad", label: "Bad", color: "#F44336" },
];

export const getMoodColor = (mood: string): string => {
  return moodOptions.find((option) => option.value === mood)?.color || "#9e9e9e";
};

// Helper to get a score from mood
export const getMoodScore = (mood: string): number => {
  const index = moodOptions.findIndex(m => m.value === mood);
  return (index === -1) ? 2 : (4 - index); // 4 (great) to 0 (bad)
};

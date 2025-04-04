
import { useState } from "react";
import { moodOptions } from "./types";

interface MoodSelectorProps {
  selectedMood: string;
  onChange: (mood: string) => void;
}

export function MoodSelector({ selectedMood, onChange }: MoodSelectorProps) {
  return (
    <div className="flex flex-wrap gap-3 mt-2">
      {moodOptions.map((option) => (
        <button
          key={option.value}
          type="button"
          className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-all ${
            selectedMood === option.value
              ? `border-2 shadow-md`
              : "border-muted bg-background hover:bg-accent/50"
          }`}
          style={{
            borderColor: selectedMood === option.value ? option.color : undefined,
            backgroundColor: selectedMood === option.value ? `${option.color}15` : undefined,
          }}
          onClick={() => onChange(option.value)}
        >
          <div 
            className="w-10 h-10 rounded-full mb-2 flex items-center justify-center"
            style={{ backgroundColor: option.color }}
          >
            {getMoodEmoji(option.value)}
          </div>
          <span className="text-sm font-medium">{option.label}</span>
        </button>
      ))}
    </div>
  );
}

function getMoodEmoji(mood: string): string {
  switch (mood) {
    case "great":
      return "😀";
    case "good":
      return "🙂";
    case "okay":
      return "😐";
    case "low":
      return "😕";
    case "bad":
      return "😢";
    default:
      return "😐";
  }
}

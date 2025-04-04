
export interface TrackingEvent {
  id: string;
  title: string;
  date: string;
  notes: string;
  category: "past" | "present" | "future";
  type?: string;
  progress?: number;
}

export const eventTypeOptions = [
  { value: "activity", label: "Daily Activity" },
  { value: "learning", label: "Educational Progress" },
  { value: "goal", label: "Goal Setting" },
  { value: "note", label: "General Note" },
  { value: "milestone", label: "Achievement" }
];

export const getTypeLabel = (type: string): string => {
  const option = eventTypeOptions.find(opt => opt.value === type);
  return option?.label || type;
};
